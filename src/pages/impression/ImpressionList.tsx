import React from "react";

interface IImpressionList {
  children: React.ReactNode | React.ReactNode[];
}

const ImpressionList: React.FC<IImpressionList> = ({ children }) => {
  return (
    <div className="w-full max-h-full h-full overflow-y-scroll overscroll-contain">
      {children}
    </div>
  );
};
export default ImpressionList;
