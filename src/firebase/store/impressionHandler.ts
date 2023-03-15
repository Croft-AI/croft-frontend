import { collection, addDoc, doc, getDoc } from "firebase/firestore";
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
    console.error(e);
    throw new Error("There was a problem with creating a new impression");
  }
};

export const getImpressionContent = async (id: string): Promise<Impression> => {
  try {
    const docRef = doc(db, "impression", id);
    const impressionDoc = await getDoc(docRef);
    return impressionDoc as unknown as Impression;
  } catch (e) {
    throw new Error(e);
  }
};
