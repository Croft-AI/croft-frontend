import React from "react";
import ContentDisplayRow, { contentData } from "./ContentDisplayRow";

interface IContentDisplayContainer {
  contentRows: contentData[];
}

const ContentDisplayContainer: React.FC<IContentDisplayContainer> = ({
  contentRows,
}) => {
  return (
    <div className="m-auto w-3/4 py-1 border border-secondary rounded-lg h-80 overflow-scroll">
      {contentRows.map((row, index) => {
        return (
          <>
            {index === 0 ? <></> : <div className="divider m-0"></div>}
            <ContentDisplayRow contentData={row} />
          </>
        );
      })}
    </div>
  );
};

export default ContentDisplayContainer;
