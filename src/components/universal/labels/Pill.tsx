import React from "react";

interface IPill {
  title: string;
}

const Pill: React.FC<IPill> = ({ title }) => {
  return (
    <div className=" mb-2 w-fit px-4 py-1 rounded-full bg-gray-800 h-fit text-slate-100 shadow shadow-inner shadow-slate-500 border border-1">
      {title}
    </div>
  );
};

export default Pill;
