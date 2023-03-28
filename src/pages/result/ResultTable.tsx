import React from "react";
interface IResultTable {
  data: string[][];
}

const ResultTable: React.FC<IResultTable> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto text-xs">
        <thead>
          {data[0].map((item) => (
            <th className="bg-base-200">{item}</th>
          ))}
        </thead>
        <tbody>
          {data.slice(1).map((item, rowNo) => {
            return (
              <tr>
                {item.map((dataItem) => {
                  return <td className="text-secondary">{dataItem}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
