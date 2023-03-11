import { db } from "../base";

export interface User {
  createdOn: Date;
  email: string;
  impressions: string[];
  lastLogin: Date;
  firstName: string;
  lastName: string;
  photoUrl: string;
}

export const createUser = async (): Promise<void> => {};
