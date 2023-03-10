import { auth } from "../base";
import { signOut } from "firebase/auth";

export const logout = async (): Promise<void> => {
  signOut(auth);
};
