import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";
import { redirectToCheckout } from "../../stripe/checkoutRedirect";
import PlanContainer from "./PlanContainer";

interface IBillingPlans {
  premium: boolean;
}

const BillingPlans: React.FC<IBillingPlans> = ({ premium }) => {
  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <p className="text-2xl">Plans</p>
        <div className="divider"></div>
        <br></br>
        <div className="w-full flex flex-row h-fit">
          <div className="m-auto flex flex-row h-fit gap-8">
            <PlanContainer
              isPremium={premium}
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
              isPremium={premium}
              isShadow={true}
              planTitle="Premium Plan"
              planDescription="Stay Up to Date"
              pricingPerMonth={9.99}
              characteristics={[
                "50 Impressions",
                "10 Schedules",
                "Proxy Rotations",
                "By-pass Bot Detection",
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
      </div>
    </div>
  );
};

export default BillingPlans;
