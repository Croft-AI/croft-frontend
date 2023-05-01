import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { DocumentData } from "firebase-admin/firestore";
import axios from "axios";
import { AccountTypes } from "./types/Accounts";
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

exports.onAccountCreation = functions.firestore
  .document("/user/{acc}")
  .onCreate(async (snap, context) => {
    // create as basic account
    await snap.ref.set({ accountType: AccountTypes.BASIC }, { merge: true });
    // send welcome email
    const { email } = snap.data();
    console.log(email);
  });

exports.restrictScheduleCreates = functions.firestore
  .document("/schedule/{sched}")
  .onCreate(async (snap, context) => {
    const { createdBy } = snap.data();
    // const schedulesRef = collection(db, "schedule");
    // const q = query(schedulesRef, where("createdBy", "==", createdBy));
    // const querySnapshot = await getDocs(q);
    let currSchedules: DocumentData[] = [];
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
    if (currSchedules.length > 3) {
      await snap.ref.delete();
    }
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
