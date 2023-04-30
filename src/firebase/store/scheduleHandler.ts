import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../base";

export interface ScheduledTask {
  createdBy: string;
  frequency: string;
  title: string;
  impressionId: string;
  lastUpdated?: Timestamp;
}

export interface ScheduledTaskRead {
  id: string;
  createdBy: string;
  frequency: string;
  title: string;
  impressionId: string;
  lastUpdated?: Timestamp;
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
export const getSchedules = async (id: string): Promise<ScheduledTask[]> => {
  try {
    let tasks: ScheduledTask[] = [];
    const q = query(collection(db, "schedule"), where("createdBy", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) =>
      tasks.push({ id: item.id, ...item.data() } as ScheduledTaskRead)
    );
    return tasks;
  } catch (e) {
    console.error(e);
    throw new Error(
      "There was an error with getting your scheduled task at this time. Please try again later!"
    );
  }
};

export const deleteSchedule = async (scheduleId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "schedule", scheduleId));
  } catch (e) {
    console.error(e);
    throw new Error("There was an error deleting impression");
  }
};
