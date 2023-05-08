import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { IoAdd } from "react-icons/io5";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { db } from "../../firebase/base";
import {
  ImpressionRead,
  getImpressions,
} from "../../firebase/store/impressionHandler";
import {
  createNewSchedule,
  ScheduledTaskRead,
  ScheduleFrequency,
} from "../../firebase/store/scheduleHandler";
import { AccountIs } from "../../limits/AccountLimits";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";
import ScheduledTaskContainer from "./ScheduleTaskContainer";

const ScheduleDisplayPage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [schedules, setSchedules] = useState<ScheduledTaskRead[]>();
  const [impressions, setImpressions] = useState<ImpressionRead[]>();

  useEffect(() => {
    const getUserImpressions = async () => {
      try {
        const currImpressions = await getImpressions(auth as string);
        setImpressions(currImpressions);
      } catch (e) {
        pushNotification(
          NotificationType.ERROR,
          "Loading Error:",
          (e as any).message as string
        );
      }
    };

    getUserImpressions();
  }, []);
  useEffect(() => {
    const queryForSchedules = query(
      collection(db, "schedule"),
      where("createdBy", "==", auth)
    );

    onSnapshot(queryForSchedules, (querySnapshot) => {
      let currSchedules: ScheduledTaskRead[] = [];
      querySnapshot.forEach((doc) => {
        currSchedules.push({ id: doc.id, ...doc.data() } as ScheduledTaskRead);
      });
      setSchedules(currSchedules);
    });
  }, []);
  const createSchedule = async (data: any) => {
    const { impressionId, title, frequency } = data;
    try {
      await createNewSchedule({
        createdBy: auth as string,
        frequency: frequency as string,
        title: title as string,
        impressionId: impressionId as string,
      });
    } catch (e) {
      console.error(e);
      pushNotification(
        NotificationType.ERROR,
        "Schedule Error:",
        (e as any).message as string
      );
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Schedules</p>
          <p className="text-sm text-secondary mt-4">
            Create scheduled scraping tasks.
          </p>
        </div>
        {(schedules?.length as number) >= AccountIs["BASIC"].SCHEDULES ? (
          <></>
        ) : (
          <label htmlFor="my-modal-4" className="btn btn-square m-auto">
            <IoAdd className="w-6 h-6 text-white" />
          </label>
        )}
        <input
          type="checkbox"
          id="my-modal-4"
          className="modal-toggle w-full"
        />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <form onSubmit={handleSubmit(createSchedule)}>
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
                    // onChange={(event) => setTitle(event.target.value)}
                    className="input w-full input-bordered"
                    placeholder="Schedule Title"
                    {...register("title")}
                  ></input>
                </div>
                <div>
                  <label className="label">
                    <label className="label-text text-sm text-secondary">
                      Select Frequency:
                    </label>
                  </label>
                  <select
                    className="select w-full select-bordered"
                    // onChange={(event) => setFrequency(event.target.value)}
                    {...register("frequency")}
                  >
                    <option value={ScheduleFrequency.WEEKLY}>WEEKLY</option>
                    <option value={ScheduleFrequency.DAILY}>DAILY</option>
                    <option value={ScheduleFrequency.HOURLY}>HOURLY</option>
                  </select>
                </div>
              </div>
              <label className="label">
                <label className="label-text text-sm text-secondary">
                  Select Impression:
                </label>
              </label>
              <select
                className="select w-full select-bordered"
                // onChange={(event) => setImpressionId(event.target.value)}
                {...register("impressionId")}
              >
                <option disabled value={""}>
                  Pick an Impression
                </option>
                {impressions?.map((item) => {
                  return <option value={item.id}>{item.title}</option>;
                })}
              </select>

              <div className="w-full flex flex-row mt-6">
                <div className="flex-grow" />
                <button type="submit">
                  <label className="btn btn-primary" htmlFor={"my-modal-4"}>
                    create
                  </label>
                </button>
              </div>
            </form>
          </label>
        </label>
      </div>
      <div className="divider text-gray-300">
        {schedules?.length}/{AccountIs["BASIC"].SCHEDULES}
      </div>
      <div className="flex flex-col gap-2">
        {schedules?.map((item) => (
          <ScheduledTaskContainer data={item} />
        ))}
      </div>
    </>
  );
};
export default ScheduleDisplayPage;
