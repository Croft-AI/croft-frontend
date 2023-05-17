import { Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
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
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Plans</p>
          {userIsPremium ? "premium" : "broke"}
          <div className="divider"></div>
          <br></br>
          <div className="w-full flex flex-row h-fit">
            <div className="m-auto flex flex-row h-fit gap-8">
              <PlanContainer
                isPremium={userIsPremium}
                isShadow={false}
                planTitle="Basic Plan"
                planDescription="Traverse the Web"
                pricingPerMonth={0}
                characteristics={[
                  "20 Impressions",
                  "3 Schedules",
                  "Unlimited Results",
                ]}
              />
              <PlanContainer
                isPremium={userIsPremium}
                isShadow={true}
                planTitle="Premium Plan"
                planDescription="Stay Up to Date"
                pricingPerMonth={9.99}
                characteristics={[
                  "50 Impressions",
                  "10 Schedules",
                  "Early Access to New Features",
                ]}
                onSubscribe={() => {
                  pushNotification(
                    NotificationType.INFORMATION,
                    "Payments",
                    "Redirecting to Payments Page..."
                  );
                  redirectToCheckout();
                }}
              />
            </div>
          </div>
          <br></br>
          <p className="text-2xl">Your Billing</p>
          <div className="flex flex-row text-gray-400 mt-2 gap-2">
            <p>Account Type:</p>
            <Pill title="PREMIUM"></Pill>
          </div>
          <div className="divider"></div>
          <Table>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {invoices?.map((item) => {
                return (
                  <tr>
                    <td>{item.planTitle}</td>
                    <td>{`${item.paymentDate.getDate()}/${
                      item.paymentDate.getMonth() + 1
                    }/${item.paymentDate.getFullYear()}`}</td>
                    <td>
                      {item.status ? (
                        <div className="text-sm px-2 text-green-700 bg-green-300 rounded-full w-fit flex flex-row">
                          PAID
                        </div>
                      ) : (
                        <div className="text-sm px-2 text-red-700 bg-red-300 rounded-full w-fit flex flex-row">
                          ERROR
                        </div>
                      )}
                    </td>
                    <td>{`${item.currency}${item.price}`}</td>
                    <td>
                      <a
                        className="btn btn-ghost btn-sm"
                        href={item.invoicePdfDownload}
                      >
                        <IoDownload />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      {/* <button
        className="btn btn-primary"
        onClick={async () => await redirectToCheckout()}
      >
        Upgrade to Premium
      </button> */}
    </>
  );
};
export default BillingPage;
