import { auth } from "../firebase/base";

export const isUserPremium = async (): Promise<boolean> => {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  return decodedToken?.claims?.stripeRole ? true : false;
};
