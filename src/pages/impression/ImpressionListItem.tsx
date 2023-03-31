import { IoEllipsisVertical, IoTrashBin } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

interface IImpressionListItem {
  path: string;
  title: string;
  createdOn: Date;
}

const ImpressionListItem: React.FC<IImpressionListItem> = ({
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
        <div className="flex">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost m-auto btn-sm ">
              <IoEllipsisVertical className="text-base-300" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36"
            >
              <li>
                <a className="text-red-400 active:bg-red-200">
                  <IoTrashBin /> Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImpressionListItem;
