import { notifications } from "@mantine/notifications";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
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
          {/* {userIsPremium ? "premium" : "broke shit"} */}
          <div className="divider"></div>
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
