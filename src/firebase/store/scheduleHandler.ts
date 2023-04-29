import { Timestamp } from "firebase/firestore";

export interface ScheduledTask {
  createdBy: string;
  frequency: "DAILY" | "WEEKLY" | "HOURLY";
  title: string;
  impressionId: string;
  lastScrapedAt?: Timestamp;
}
