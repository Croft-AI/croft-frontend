import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { DocumentData } from "firebase-admin/firestore";
import axios from "axios";
import {
  AccountTypes,
  BasicAccountLimits,
  PremiumAccountLimits,
} from "./types/Accounts";
admin.initializeApp(functions.config().firebase);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export interface ImpressionConfigType {
  url: string;
  items: ImpressionConfigItemType[];
  wait_for_selector?: string;
}
export interface ImpressionConfigItemType {
  title: string;
  css_selector: string;
  get_attributes: HTMLAttributes[];
}

export type HTMLAttributes = "class" | "id" | "href" | "src" | "title" | "text";
export interface Impression {
  config: ImpressionConfigType;
  createdBy: string;
  createdOn: Date;
  title: string;
  description: string;
}
export interface ImpressionConfigType {
  url: string;
  items: ImpressionConfigItemType[];
  wait_for_selector?: string;
}
export interface ImpressionConfigItemType {
  title: string;
  css_selector: string;
  get_attributes: HTMLAttributes[];
}
export interface Impression {
  config: ImpressionConfigType;
  createdBy: string;
  createdOn: Date;
  title: string;
  description: string;
}

const checkIfUserIsPremium = async (uid: string): Promise<boolean> => {
  return (await (
    await admin.auth().getUser(uid)
  ).customClaims?.stripeRole)
    ? true
    : false;
};

exports.onAccountCreation = functions.firestore
  .document("/user/{acc}")
  .onCreate(async (snap, context) => {
    // create as basic account
    const { id } = snap.ref;
    const { firstName, email } = snap.data();
    await admin
      .firestore()
      .collection("user-account-types")
      .doc(id)
      .create({ lastUpdated: new Date(), accountType: AccountTypes.BASIC });
    // send welcome email
    await admin
      .firestore()
      .collection("mail")
      .add({
        to: email,
        message: {
          subject: "Welcome to Croft!",
          html: `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Welcome to Croft - Traverse the Web!</title>
            </head>
            <body>
              <h3>Welcome to Croft - Traverse the Web!</h3>
              <p>Dear ${firstName},</p>
              <p>Thank you for signing up with Croft! We are excited to have you as a member of our community.</p>
              <p>Croft is a platform where you can explore and discover new websites, connect with like-minded individuals, and share your own web journeys. With Croft, you can traverse the web and find inspiration, knowledge, and entertainment.</p>
              <p>As a new member, you have access to all the features and benefits that Croft has to offer.</p>
              <p>If you have any questions or feedback, please don't hesitate to contact us. We are always happy to hear from our members and improve our platform.</p>
              <p>Once again, welcome to Croft! We hope you enjoy your web journey with us.</p>
              <p>Best regards,</p>
              <p>The Croft Team</p>
            </body>
          </html>
          `,
        },
      });
    // const { email } = snap.data();
  });

exports.restrictScheduleCreates = functions.firestore
  .document("/schedule/{sched}")
  .onCreate(async (snap, context) => {
    const { createdBy } = snap.data();
    // const schedulesRef = collection(db, "schedule");
    // const q = query(schedulesRef, where("createdBy", "==", createdBy));
    // const querySnapshot = await getDocs(q);
    let currSchedules: DocumentData[] = [];
    let isPremium = await checkIfUserIsPremium(createdBy);
    const limit = isPremium
      ? PremiumAccountLimits.SCHEDULES
      : BasicAccountLimits.SCHEDULES;
    console.log(isPremium);
    await admin
      .firestore()
      .collection("schedule")
      .where("createdBy", "==", createdBy)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          currSchedules.push(doc.data());
        });
      });
    console.log(createdBy, snap.id, currSchedules);
    if (currSchedules.length > limit) {
      await snap.ref.delete();
    }
  });

exports.restrictImpressionCreates = functions.firestore
  .document("/impression/{imp}")
  .onCreate(async (snap, context) => {
    const { createdBy } = snap.data();
    // const schedulesRef = collection(db, "schedule");
    // const q = query(schedulesRef, where("createdBy", "==", createdBy));
    // const querySnapshot = await getDocs(q);
    let currImpression: DocumentData[] = [];
    let isPremium = await checkIfUserIsPremium(createdBy);
    const limit = isPremium
      ? PremiumAccountLimits.IMPRESSIONS
      : BasicAccountLimits.IMPRESSIONS;
    await admin
      .firestore()
      .collection("impression")
      .where("createdBy", "==", createdBy)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          currImpression.push(doc.data());
        });
      });
    // console.log(createdBy, snap.id, currImpression);
    if (currImpression.length > limit) {
      await snap.ref.delete();
    }
  });

exports.onResultCreation = functions.firestore
  .document("/result/{res}")
  .onCreate(async (snap, context) => {
    const { impressionId } = snap.data();
    const resultId = snap.id;
    console.log(impressionId);
    await admin
      .firestore()
      .collection("impression")
      .doc(impressionId)
      .get()
      .then(async (doc) => {
        console.log(doc.data());
        const { url, items } = (doc.data() as Impression).config;
        const body = {
          configs: [
            {
              url,
              items,
              wait_for_selector: items[0].css_selector,
              result_doc_id: resultId,
              impression_id: impressionId,
            },
          ],
        };

        try {
          await axios.post(
            "https://croft-pub-access-ysekuofdbq-uc.a.run.app",
            body
          );
        } catch (e) {
          console.error(e);
        }
      });
  });

exports.hourlyScheduledTask = functions.pubsub
  .schedule("0 * * * *")
  .onRun(async (context) => {
    await admin
      .firestore()
      .collection("schedule")
      .where("frequency", "==", "HOURLY")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const { impressionId } = doc.data();
          const scheduleId = doc.id;
          await admin
            .firestore()
            .collection("impression")
            .doc(impressionId)
            .get()
            .then(async (impDoc) => {
              const { config } = impDoc.data() as Impression;
              const { url, items } = config as ImpressionConfigType;
              await admin
                .firestore()
                .collection("result")
                .add({ status: 2 })
                .then(async (resultDoc) => {
                  const resultId = resultDoc.id;
                  const body = {
                    configs: [
                      {
                        url,
                        items,
                        wait_for_selector: config.items[0].css_selector,
                        result_doc_id: resultId,
                        impression_id: impressionId,
                      },
                    ],
                  };

                  try {
                    await axios.post(
                      "https://croft-pub-access-ysekuofdbq-uc.a.run.app",
                      body
                    );
                    await admin
                      .firestore()
                      .collection("schedule")
                      .doc(scheduleId)
                      .set({ lastUpdated: new Date() }, { merge: true });
                  } catch (e) {
                    console.error(e);
                  }
                });
            });
        });
      });
  });

exports.dailyScheduledTask = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async (context) => {
    await admin
      .firestore()
      .collection("schedule")
      .where("frequency", "==", "DAILY")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const { impressionId } = doc.data();
          const scheduleId = doc.id;
          await admin
            .firestore()
            .collection("impression")
            .doc(impressionId)
            .get()
            .then(async (impDoc) => {
              const { config } = impDoc.data() as Impression;
              const { url, items } = config as ImpressionConfigType;
              await admin
                .firestore()
                .collection("result")
                .add({ status: 2 })
                .then(async (resultDoc) => {
                  const resultId = resultDoc.id;
                  const body = {
                    configs: [
                      {
                        url,
                        items,
                        wait_for_selector: config.items[0].css_selector,
                        result_doc_id: resultId,
                        impression_id: impressionId,
                      },
                    ],
                  };

                  try {
                    await axios.post(
                      "https://croft-pub-access-ysekuofdbq-uc.a.run.app",
                      body
                    );
                    await admin
                      .firestore()
                      .collection("schedule")
                      .doc(scheduleId)
                      .set({ lastUpdated: new Date() }, { merge: true });
                  } catch (e) {
                    console.error(e);
                  }
                });
            });
        });
      });
  });

exports.dailyScheduledTask = functions.pubsub
  .schedule("0 0 * * 0")
  .onRun(async (context) => {
    await admin
      .firestore()
      .collection("schedule")
      .where("frequency", "==", "WEEKLY")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const { impressionId } = doc.data();
          const scheduleId = doc.id;
          await admin
            .firestore()
            .collection("impression")
            .doc(impressionId)
            .get()
            .then(async (impDoc) => {
              const { config } = impDoc.data() as Impression;
              const { url, items } = config as ImpressionConfigType;
              await admin
                .firestore()
                .collection("result")
                .add({ status: 2 })
                .then(async (resultDoc) => {
                  const resultId = resultDoc.id;
                  const body = {
                    configs: [
                      {
                        url,
                        items,
                        wait_for_selector: config.items[0].css_selector,
                        result_doc_id: resultId,
                        impression_id: impressionId,
                      },
                    ],
                  };

                  try {
                    await axios.post(
                      "https://croft-pub-access-ysekuofdbq-uc.a.run.app",
                      body
                    );
                    await admin
                      .firestore()
                      .collection("schedule")
                      .doc(scheduleId)
                      .set({ lastUpdated: new Date() }, { merge: true });
                  } catch (e) {
                    console.error(e);
                  }
                });
            });
        });
      });
  });
