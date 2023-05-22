import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ILoadingPlaceholder {
  message?: string;
}

const LoadingPlaceholder: React.FC<ILoadingPlaceholder> = ({
  message = "Loading...",
}) => {
  return (
    <div className="w-full h-2/3 flex">
      <div className="flex m-auto flex-col gap-4">
        <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 m-auto text-gray-400" />
        <p className="text-lg m-auto text-gray-400">{message}</p>
      </div>
    </div>
  );
};
export default LoadingPlaceholder;
