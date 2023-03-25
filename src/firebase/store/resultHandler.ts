import { addDoc, collection } from "firebase/firestore";
import { db } from "../base";

export interface ScrapeResult {
  impressionId: string;
  result: object | [];
  scrapeDateTime: Date;
}

export const createResultDoc = async (): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "result"), {});
    return docRef.id;
  } catch (e) {
    console.error(e);
    throw new Error("There was an error creating a results page!");
  }
};
