import { Table } from "@mantine/core";
import { IconArrowRight, IconCreditCard } from "@tabler/icons-react";
import { useState } from "react";
import { IoDownload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Pill from "../../components/universal/labels/Pill";
import { UserInvoice } from "../../firebase/auth/userHandler";
import { createPortalLink } from "../../stripe/createPortalLink";
interface IBillingHistory {
  invoices: UserInvoice[];
}

const BillingHistory: React.FC<IBillingHistory> = ({ invoices }) => {
  const [stripeLoading, setStripeLoading] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Your Billing</p>
          <div className="flex flex-row text-gray-400 mt-2 gap-2">
            <p>Account Type:</p>
            <Pill title="PREMIUM"></Pill>
          </div>
        </div>
        <button
          disabled={stripeLoading}
          className="btn btn-ghost gap-2"
          onClick={() => {
            setStripeLoading(true);
            createPortalLink();
          }}
        >
          Stripe Dashboard
          <IconArrowRight />
        </button>
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
                <td>{`${item.currency}$${item.price}`}</td>
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
    </>
  );
};

export default BillingHistory;
