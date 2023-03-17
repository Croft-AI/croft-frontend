import { Link } from "react-router-dom";

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
  return (
    <Link to={path}>
      <div className="w-full h-16 flex flex-row bg-base-100 p-4 border border-1 hover:bg-base-200 active:bg-base-300">
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
    </Link>
  );
};
export default ImpressionListItem;
