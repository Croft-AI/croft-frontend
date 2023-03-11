import { db } from "../base";

export interface Impression {
  config: object;
  createdBy: string;
  createdOn: Date;
  title: string;
  description: string;
}
