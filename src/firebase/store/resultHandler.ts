import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../base";

//scrapeStatus 1: successful, 2: in progress, 3: failed
export interface ScrapeResult {
  id: string;
  impressionId: string;
  result: object | [];
  scrapeDatetime: Timestamp;
  scrapeDuration: number;
  status: ScrapeStatusCode;
  error_message?: string;
}

export enum ScrapeStatusCode {
  SUCCESS = 1,
  PROGRESS = 2,
  FAILED = 3,
}

export const createResultDoc = async (
  impressionId: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "result"), {
      status: 2,
      impressionId,
    });
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
    //ordered query set in firebase indexes
    const q = query(
      impressionRef,
      orderBy("scrapeDatetime", "desc"),
      where("impressionId", "==", impressionId),
      limit(noOfPage)
    );
    const querySnapshot = await getDocs(q);
    let scrapeResults: ScrapeResult[] = [];
    querySnapshot.forEach((doc) =>
      scrapeResults.push({ id: doc.id, ...doc.data() } as ScrapeResult)
    );
    return scrapeResults;
  } catch (e) {
    console.error(e);
    throw new Error("There was an error with getting results.");
  }
};
