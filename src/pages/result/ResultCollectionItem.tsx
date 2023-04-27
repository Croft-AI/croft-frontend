import { IoEllipsisVertical, IoTrashBin } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { deleteImpression } from "../../firebase/store/impressionHandler";

interface IImpressionListItem {
  impressionId: string;
  path: string;
  title: string;
  createdOn: Date;
}

const ResultCollectionItem: React.FC<IImpressionListItem> = ({
  impressionId,
  path,
  title,
  createdOn,
}) => {
  const navigate = useNavigate();
  return (
    <div onDoubleClick={() => navigate(path)}>
      <div className="w-full h-14 flex flex-row gap-2 bg-base-100 p-4 border border-1 hover:bg-base-200 active:bg-base-300">
        <div className="flex-grow">
          <p>{title}</p>
        </div>
        <div className="m-auto">
          <p className="text-sm text-secondary">
            {createdOn?.getDate()}/{createdOn?.getMonth()}/
            {createdOn?.getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ResultCollectionItem;
