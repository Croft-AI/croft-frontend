import { IoTimer } from "react-icons/io5";

const ScheduleEmptyPlaceholder = () => {
  return (
    <div className="w-full h-2/3 rounded-md flex">
      <div className="flex m-auto flex-col gap-4">
        <IoTimer className="w-24 h-24 text-gray-300 m-auto" />
        <p className="text-lg m-auto text-gray-400">
          Create a Schedule by clicking '+'
        </p>
      </div>
    </div>
  );
};
export default ScheduleEmptyPlaceholder;
