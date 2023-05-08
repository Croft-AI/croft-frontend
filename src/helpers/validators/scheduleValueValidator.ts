import { ScheduledTask } from "../../firebase/store/scheduleHandler";

export const validateScheduleValues = (schedule: ScheduledTask) => {
  if (!schedule.createdBy)
    throw new Error("There was an error with adding schedule!");
  if (!schedule.frequency)
    throw new Error("There was an error with setting a frequency");
  if (schedule.impressionId === "")
    throw new Error("There was an error with setting the impression!");
  if (schedule.title === "") throw new Error("The title field was not filled!");
};
