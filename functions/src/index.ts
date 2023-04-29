import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { DocumentData } from "firebase-admin/firestore";
admin.initializeApp(functions.config().firebase);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
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
