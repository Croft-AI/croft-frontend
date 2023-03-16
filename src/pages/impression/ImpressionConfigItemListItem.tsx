import React from "react";
import { IoTrashBin } from "react-icons/io5";
import { HTMLAttributes } from "../../helpers/types/ImpressionType";

interface IImpressionConfigListItem {
  title: string;
  selector: string;
  getAttributes: HTMLAttributes[];
}

const ImpressionConfigListItem: React.FC<IImpressionConfigListItem> = ({
  title,
  selector,
  getAttributes,
}) => {
  return (
    <div className="w-full flex flex-row border-b-2 px-2">
      <div className="flex-grow m-auto">
        <p>{title}</p>
      </div>
      <p className="w-1/6 truncate m-auto text-secondary">{selector}</p>
      <p className="w-1/6 truncate m-auto text-secondary">
        {getAttributes.join(", ")}
      </p>
      <button className="btn btn-ghost m-auto">
        <IoTrashBin></IoTrashBin>
      </button>
    </div>
  );
};

export default ImpressionConfigListItem;
