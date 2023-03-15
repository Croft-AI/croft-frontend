import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ImpressionConfigType } from "../../helpers/types/ImpressionType";
import { db } from "../base";

export interface Impression {
  config: ImpressionConfigType;
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
    return impressionDoc.data() as unknown as Impression;
  } catch (e) {
    console.error(e);
    throw new Error("Unable to get impression data at this time!");
  }
};
