import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/base";
import {
  NotificationType,
  pushNotification,
} from "../notifications/notificationPusher";

export const createPortalLink = async () => {
  const stripePortalFunctionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );
  console.log("getting link...");
  stripePortalFunctionRef({
    returnUrl: window.location.origin,
  })
    .then((data) => {
      const url = (data as any).data.url as string;
      window.location.assign(url);
    })
    .catch((error) => {
      console.error(error);
      pushNotification(NotificationType.ERROR, "Stripe Error", error);
    });
};
