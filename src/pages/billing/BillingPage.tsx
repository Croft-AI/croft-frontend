import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { redirectToCheckout } from "../../stripe/checkoutRedirect";
import usePremiumStatus from "../../stripe/usePremiumStatus";
const BillingPage = () => {
  const uid = useAuth();
  const userIsPremium = usePremiumStatus(uid as string);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Your Billing</p>
          <p className="text-sm text-secondary mt-4">
            Ugrade your plan to do more!
          </p>
          {userIsPremium ? "premium" : "broke shit"}
          <div className="divider"></div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={async () => await redirectToCheckout()}
      >
        Upgrade to Premium
      </button>
    </>
  );
};
export default BillingPage;
