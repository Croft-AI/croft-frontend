import { auth, db } from "../base";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";

export interface User {
  createdOn: Date;
  email: string;
  impressions: string[];
  lastLogin: Date;
  firstName: string;
  lastName: string;
  photoURL: string;
}

export const createUserWithPass = async (
  userObject: User,
  password: string
): Promise<void> => {
  try {
    createUserWithEmailAndPassword(auth, userObject.email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await createUser(user.uid, userObject);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (e) {
    throw new Error("There was a problem with signing up. Try again later.");
  }
};

export const logout = async (): Promise<void> => {
  try {
    signOut(auth);
  } catch (e) {
    throw new Error("There was a problem logging out.");
  }
};

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

export const userLoginWithEmailPassword = async (
  email: string,
  password: string
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      const user = result.user;
      await updateLastLogin(user.uid);
      pushNotification(
        NotificationType.SUCCESS,
        "Successful Login:",
        "Welcome back! Traverse the web with us!"
      );
    })
    .catch((error) => {
      pushNotification(
        NotificationType.ERROR,
        "Login Error:",
        "There was an error with login. Please try again later!"
      );
      throw new Error(error);
    });
};

export const updateLastLogin = async (uid: string): Promise<void> => {
  const docRef = doc(db, "user", uid);
  await updateDoc(docRef, { lastLogin: new Date() });
};

export const getUserProfile = async (uid: string): Promise<User> => {
  try {
    const docRef = doc(db, "user", uid);
    const profile = await getDoc(docRef);
    return profile.data() as User;
  } catch (e) {
    console.error(e);
    throw new Error(
      "There was an error retrieving User's account at this moment!"
    );
  }
};
