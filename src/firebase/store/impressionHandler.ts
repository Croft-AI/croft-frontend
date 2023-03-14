import { collection, addDoc } from "firebase/firestore";
import { db } from "../base";

export interface Impression {
  config: object;
  createdBy: string;
  createdOn: Date;
  title: string;
  description: string;
}
export const createNewImpression = async (
  impressionTemplate: Impression
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, "impression"),
      impressionTemplate
    );
    return docRef.id;
  } catch (e) {
    throw new Error("There was a problem with creating a new impression");
  }
};
