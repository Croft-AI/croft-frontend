import { db } from "../base";

interface ScrapeResult {
  impressionId: string;
  result: object | [];
  scrapeDateTime: Date;
}
