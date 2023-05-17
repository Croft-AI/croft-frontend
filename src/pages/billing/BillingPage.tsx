import { Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { IoCheckmark, IoDownload } from "react-icons/io5";
import Pill from "../../components/universal/labels/Pill";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  getUserPaymentInvoice,
  UserInvoice,
} from "../../firebase/auth/userHandler";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";
import { redirectToCheckout } from "../../stripe/checkoutRedirect";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import BillingHistory from "./BillingHistory";
import BillingPlans from "./BillingPlans";
import PlanContainer from "./PlanContainer";
const BillingPage = () => {
  const uid = useAuth();
  const userIsPremium = usePremiumStatus(uid as string);
  const [invoices, setInvoices] = useState<UserInvoice[]>();
  useEffect(() => {
    const getInvoices = async () => {
      const allInvoices = await getUserPaymentInvoice(uid as string);
      setInvoices(allInvoices);
    };
    getInvoices();
  }, []);
  return (
    <>
      {userIsPremium ? (
        <BillingHistory invoices={invoices as UserInvoice[]} />
      ) : (
        <BillingPlans premium={userIsPremium} />
      )}
    </>
  );
};
export default BillingPage;
