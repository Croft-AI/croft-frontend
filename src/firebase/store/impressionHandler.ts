import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ImpressionConfigType } from "../../helpers/types/ImpressionType";
import { db } from "../base";

export interface Impression {
  config: ImpressionConfigType;
  createdBy: string;
  createdOn: Date;
  title: string;
  description: string;
}

export interface ImpressionRead {
  id: string;
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

export const updateImpression = async (
  id: string,
  newImpression: Impression
): Promise<void> => {
  try {
    const docRef = doc(db, "impression", id);
    await updateDoc(docRef, { ...newImpression });
  } catch {
    throw new Error("There was a problem trying to save this impression");
  }
};

export const getImpressions = async (
  uid: string
): Promise<ImpressionRead[]> => {
  try {
    const impressionRef = collection(db, "impression");
    const q = query(impressionRef, where("createdBy", "==", uid));
    const querySnapshot = await getDocs(q);
    let impressions: ImpressionRead[] = [];
    querySnapshot.forEach((doc) =>
      impressions.push({ id: doc.id, ...doc.data() } as ImpressionRead)
    );
    return impressions;
  } catch {
    throw new Error(
      "There was a problem with gettimg impressions at this moment!"
    );
  }
};
