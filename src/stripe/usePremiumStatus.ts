import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { isUserPremium } from "./isUserPremium";

const usePremiumStatus = (uid: string) => {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    const checkPremiumStatus = async function () {
      setPremiumStatus(await isUserPremium());
    };
    checkPremiumStatus();
  }, [uid]);
  return premiumStatus;
};
export default usePremiumStatus;
