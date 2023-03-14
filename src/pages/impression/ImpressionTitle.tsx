import React from "react";
import { IoAdd } from "react-icons/io5";

interface IImpressionTitle {
  onButtonClick: () => void;
}

const ImpressionTitle: React.FC<IImpressionTitle> = ({ onButtonClick }) => {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Impressions</p>
          <p className="text-sm text-secondary mt-4">
            Create an impression to start extracting data from websites OR
            checkout some of our presets below.
          </p>
        </div>
        <button className="btn btn-square m-auto">
          <IoAdd className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="divider"></div>
    </>
  );
};
export default ImpressionTitle;
