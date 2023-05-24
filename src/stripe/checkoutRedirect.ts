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
    price: "price_1N5kQbLYizD2F9cI0mx92m27",
    success_url: `${window.location.origin}/impression`,
    cancel_url: `${window.location.origin}/billing`,
  });
  window.location.assign(session.url);
};
