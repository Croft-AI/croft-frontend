import React from "react";
import { IoCheckmark } from "react-icons/io5";

interface IPlanContainer {
  isPremium: boolean;
  isShadow: boolean;
  planTitle: string;
  planDescription: string;
  pricingPerMonth: number;
  characteristics: string[];
  onSubscribe?: () => void;
}

const PlanContainer: React.FC<IPlanContainer> = ({
  isPremium,
  isShadow,
  planTitle,
  planDescription,
  pricingPerMonth,
  characteristics,
  onSubscribe,
}) => {
  const shadowStyle = isShadow ? "shadow shadow-2xl" : "";
  return (
    <div
      className={`w-72 h-fit rounded-lg border border-2 p-6 flex flex-col ${shadowStyle}`}
    >
      <div className="mx-auto text-center">
        <p className="text-2xl text-gray-600 ">{planTitle}</p>

        <p className="text-sm text-gray-400">{planDescription}</p>
        <br></br>
        <p className="text-sm text-gray-400">
          <p className="text-4xl text-gray-800">${pricingPerMonth}</p>
          /month
        </p>
      </div>
      <div className="w-full h-fit">
        <br></br>
        <table cellPadding={8}>
          {characteristics.map((item) => {
            return (
              <tr>
                <td>
                  <IoCheckmark className="w-8 h-8 text-green-400" />
                </td>
                <td className="text-gray-500">{item}</td>
              </tr>
            );
          })}
        </table>
        <br />
        {onSubscribe ? (
          <button
            className="btn btn-primary w-full"
            onClick={onSubscribe}
            disabled={isPremium}
          >
            Subscribe
          </button>
        ) : (
          <div className="h-12"></div>
        )}
      </div>
    </div>
  );
};

export default PlanContainer;
