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
      <div className="w-full h-16 flex flex-row bg-base-100 p-4 border border-1">
        <div className="m-auto">
          <p>{title}</p>
        </div>
        <div className="m-auto">
          <p>
            {/* {createdOn?.getDate()}/{createdOn?.getMonth()}/
            {createdOn?.getFullYear()} */}
          </p>
        </div>
        <div className="flex-grow"></div>
      </div>
    </Link>
  );
};
export default ImpressionListItem;
