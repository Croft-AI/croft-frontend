import { app } from "../firebase/base";

import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "user",
});
export const redirectToCheckout = async (): Promise<void> => {
  const session = await createCheckoutSession(payments, {
    price: "price_1N5kwvLYizD2F9cIgm8dlLEr",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });
  window.location.assign(session.url);
};
