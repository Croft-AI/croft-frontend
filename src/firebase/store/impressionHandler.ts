import { db } from "../base";

interface Impression {
  config: object;
  createdBy: string;
  createdOn: Date;
  title: string;
  description: string;
}
