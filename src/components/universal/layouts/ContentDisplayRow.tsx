import { IoInformation, IoTimer, IoTrashBinOutline } from "react-icons/io5";

export type contentData = {
  title: string;
  lastUpdated: string;
  link: string;
  status: "ONLINE" | "WARNING" | "OFFLINE";
};

interface IContentDisplayRow {
  contentData: contentData;
}

const ContentDisplayRow: React.FC<IContentDisplayRow> = ({ contentData }) => {
  const { title, lastUpdated, link, status } = contentData;
  const statusBadges = {
    ONLINE: <span className="badge badge-success m-auto">ONLINE</span>,
    WARNING: <span className="badge badge-warning m-auto">WARNING</span>,
    OFFLINE: <span className="badge badge-error m-auto">OFFLINE</span>,
  };
  return (
    <div className="w-full h-fit flex flex-row align-middle select-none">
      <div className="grow m-auto">
        <div className="grid grid-cols-4">
          <p className="text-center truncate font-mono px-1">{title}</p>
          <p className="text-center text-secondary truncate font-mono px-1">
            {lastUpdated}
          </p>
          <a
            className="text-center truncate font-mono text-secondary px-1 hover:underline"
            href={link}
          >
            {link}
          </a>
          <div className="m-auto">{statusBadges[status]}</div>
        </div>
      </div>
      <div className="flex flex-row gap-1 p-1">
        <button className="btn btn-ghost">
          <IoTimer />
        </button>
        <button className="btn btn-ghost">
          <IoTrashBinOutline />
        </button>
      </div>
    </div>
  );
};
export default ContentDisplayRow;
