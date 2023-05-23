import { IoLibrary } from "react-icons/io5";

const ResultEmptyPlaceholder = () => {
  return (
    <div className="w-full h-2/3 rounded-md flex">
      <div className="flex m-auto flex-col gap-4">
        <IoLibrary className="w-24 h-24 text-gray-300 m-auto" />
        <p className="text-lg m-auto text-gray-400">
          Start by creating an Impression{" "}
          <a href="/impression" className="underline">
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResultEmptyPlaceholder;
