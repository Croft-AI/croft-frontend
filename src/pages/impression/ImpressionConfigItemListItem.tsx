import React from "react";
import { IoPencil, IoTrashBin } from "react-icons/io5";
import { HTMLAttributes } from "../../helpers/types/ImpressionType";

interface IImpressionConfigListItem {
  title: string;
  selector: string;
  getAttributes: HTMLAttributes[];
  onDeleteClick: () => void;
}

const ImpressionConfigListItem: React.FC<IImpressionConfigListItem> = ({
  title,
  selector,
  onDeleteClick,
  getAttributes,
}) => {
  return (
    <div className="w-full flex flex-row border-b-2 px-2">
      <div className="flex-grow m-auto">
        <p>{title}</p>
      </div>
      <p className="w-1/3 truncate m-auto text-secondary">{selector}</p>
      <p className="w-1/3 truncate m-auto text-secondary">
        {getAttributes.join(", ")}
      </p>

      <button className="btn btn-ghost m-auto" onClick={onDeleteClick}>
        <IoTrashBin></IoTrashBin>
      </button>
    </div>
  );
};

export default ImpressionConfigListItem;
