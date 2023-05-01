import React from "react";
import { IoEllipsisVertical, IoTrashBin } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  deleteSchedule,
  ScheduledTaskRead,
} from "../../firebase/store/scheduleHandler";
interface IScheduledTaskContainer {
  data: ScheduledTaskRead;
}
const ScheduledTaskContainer: React.FC<IScheduledTaskContainer> = ({
  data,
}) => {
  const navigate = useNavigate();
  const getTimeDifference = (): object => {
    let prevTime: any = data.lastUpdated?.toDate();
    let currTime: any = new Date();
    let diffMs = currTime - prevTime;
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffDays = Math.floor(diffMs / 86400000); // days
    let toNextHrs = 24 - diffHrs;
    let toNextDays = 7 - diffDays;
    let toNextMin = 60 - diffMins;

    return {
      HOURLY: `${toNextMin}m`,
      DAILY: `${toNextHrs}H`,
      WEEKLY: `${toNextDays}d`,
    };
  };
  return (
    <div className="w-full h-fit rounded rounded-lg border border-2 shadow shadow-md hover:shadow-lg flex p-4 gap-2">
      <div>
        <p className="text-xl text-gray-600">{data.title}</p>
        <p className="text-sm text-gray-300">{data.frequency}</p>
      </div>
      <div className="flex-grow"></div>
      <div className="w-32 border-r-2 flex">
        <span className="m-auto w-fit h-6 rounded rounded-full bg-slate-500 text-slate-200 px-2">
          {data.lastUpdated !== undefined
            ? (getTimeDifference() as any)[data.frequency]
            : "-"}
        </span>
      </div>
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost m-auto">
          <IoEllipsisVertical className="text-base-300" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
        >
          <li>
            <a onClick={() => navigate(`/result/${data.impressionId}/view`)}>
              See Results
            </a>
            <a
              className="text-red-400 active:bg-red-200"
              onClick={() => deleteSchedule(data.id)}
            >
              <IoTrashBin /> Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ScheduledTaskContainer;
