import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../base";
const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void> => {
  signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = (credential as OAuthCredential).accessToken;
      // console.log(result.user);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
