import React, { useEffect, useState } from "react";

import { IoAdd } from "react-icons/io5";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  ImpressionRead,
  getImpressions,
} from "../../firebase/store/impressionHandler";
const frequencies = ["WEEKLY", "DAILY", "HOURLY"];
const ScheduleDisplayPage = () => {
  const auth = useAuth();
  const [impressions, setImpressions] = useState<ImpressionRead[]>();
  useEffect(() => {
    const getUserImpressions = async () => {
      const currImpressions = await getImpressions(auth as string);
      setImpressions(currImpressions);
    };
    getUserImpressions();
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Schedules</p>
          <p className="text-sm text-secondary mt-4">
            Create scheduled scraping tasks.
          </p>
        </div>
        <label htmlFor="my-modal-4" className="btn btn-square m-auto">
          <IoAdd className="w-6 h-6 text-white" />
        </label>
        <input
          type="checkbox"
          id="my-modal-4"
          className="modal-toggle w-full"
        />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Create a Scheduled Task</h3>
            <p className="py-4 text-sm">
              Create scheduled tasks to get updated data
            </p>
            <div className="flex flex-row gap-4">
              <div className="flex-grow">
                <label className="label">
                  <label className="label-text text-sm text-secondary">
                    Schedule Title:
                  </label>
                </label>
                <input
                  className="input w-full input-bordered"
                  placeholder="Schedule Title"
                ></input>
              </div>
              <div>
                <label className="label">
                  <label className="label-text text-sm text-secondary">
                    Select Frequency:
                  </label>
                </label>
                <select className="select w-full select-bordered">
                  {frequencies.map((item) => {
                    return <option>{item}</option>;
                  })}
                </select>
              </div>
            </div>
            <label className="label">
              <label className="label-text text-sm text-secondary">
                Select Impression:
              </label>
            </label>
            <select className="select w-full select-bordered">
              {impressions?.map((item) => {
                return <option value={item.id}>{item.title}</option>;
              })}
            </select>

            <div className="w-full flex flex-row mt-6">
              <div className="flex-grow" />
              <button className="btn btn-primary">create</button>
            </div>
          </label>
        </label>
      </div>
      <div className="divider"></div>
    </>
  );
};
export default ScheduleDisplayPage;
