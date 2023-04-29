import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../base";

export interface ScheduledTask {
  createdBy: string;
  frequency: string;
  title: string;
  impressionId: string;
  lastScrapedAt?: Timestamp;
}
export enum ScheduleFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  HOURLY = "HOURLY",
}
export const createNewSchedule = async (
  config: ScheduledTask
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "schedule"), config);
    return docRef.id;
  } catch (e) {
    console.error(e);
    throw new Error(
      "There was an error creating a scheduled task at this time"
    );
  }
};
