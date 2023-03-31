import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../base";

//scrapeStatus 1: successful, 2: in progress, 3: failed
export interface ScrapeResult {
  impressionId: string;
  result: object | [];
  scrapeDatetime: Timestamp;
  scrapeDuration: number;
  status: ScrapeStatusCode;
}

export enum ScrapeStatusCode {
  SUCCESS = 1,
  PROGRESS = 2,
  FAILED = 3,
}

export const createResultDoc = async (): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "result"), { status: 2 });
    return docRef.id;
  } catch (e) {
    console.error(e);
    throw new Error("There was an error creating a results page!");
  }
};

export const getPaginateResult = async (
  impressionId: string,
  noOfPage: number
): Promise<ScrapeResult[]> => {
  try {
    const impressionRef = collection(db, "result");
    const q = query(
      impressionRef,
      where("impressionId", "==", impressionId),
      limit(noOfPage)
    );
    const querySnapshot = await getDocs(q);
    let scrapeResults: ScrapeResult[] = [];
    querySnapshot.forEach((doc) =>
      scrapeResults.push(doc.data() as ScrapeResult)
    );
    return scrapeResults;
  } catch (e) {
    console.error(e);
    throw new Error("There was an error with getting results.");
  }
};
