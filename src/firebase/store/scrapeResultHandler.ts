import { db } from "../base";

export interface ScrapeResult {
  impressionId: string;
  result: object | [];
  scrapeDateTime: Date;
}
