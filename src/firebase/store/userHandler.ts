import { doc, getDoc, setDoc } from "firebase/firestore";
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

export const createUser = async (
  uid: string,
  userObject: User
): Promise<void> => {
  try {
    await setDoc(doc(db, "user", uid), userObject);
  } catch (e) {
    throw new Error("There was a problem creating new user.");
  }
};

export const checkUserExists = async (uid: string): Promise<boolean> => {
  const docRef = doc(db, "user", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return true;
  return false;
};

export const googleSignInHandler = async (
  uid: string,
  userObject: User
): Promise<void> => {
  try {
    const isUserExists = await checkUserExists(uid);
    if (isUserExists) return;
    await createUser(uid, userObject);
  } catch (e) {
    throw new Error("There was a problem signing in with Google.");
  }
};
