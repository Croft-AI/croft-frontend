import React, { SetStateAction } from "react";
import { Table } from "@mantine/core";
interface IResultTable {
  data: string[][];
  setTable: React.Dispatch<SetStateAction<string[][] | undefined>>;
}

const ResultTable: React.FC<IResultTable> = ({ data, setTable }) => {
  const onEditRow = (colNo: number, rowNo: number, newValue: string) => {
    let newTable = data;
    newTable[colNo][rowNo] = newValue;
    setTable(newTable);
  };
  return (
    <div className="overflow-x-auto">
      {/* <table className="table-auto text-xs"> */}
      <Table
        className="font-mono select-none"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thead>
          {data[0].map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody>
          {data.slice(1).map((item, rowNo) => {
            return (
              <tr>
                {item.map((dataItem, colNo) => {
                  return (
                    <td>
                      <input
                        onChange={(event) =>
                          onEditRow(colNo, rowNo, event.target.value)
                        }
                        defaultValue={dataItem}
                        className="w-full h-full input input-ghost truncate rounded-none"
                      ></input>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* </table> */}
    </div>
  );
};

export default ResultTable;
