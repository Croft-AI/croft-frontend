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
    <div className="overflow-x-auto  table-wrp block max-h-96">
      {/* <table className="table-auto text-xs"> */}
      <Table
        className="font-mono select-none w-full"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thead className="sticky top-0 bg-white border border-1">
          {data[0].map((item) => (
            <th className="p-2 hover:bg-slate-200">{item}</th>
          ))}
        </thead>
        <tbody className="h-96 overflow-y-auto overflow-x-hidden">
          {data.slice(1).map((item, colNo) => {
            return (
              <tr>
                {item.map((dataItem, rowNo) => {
                  return (
                    <td>
                      <input
                        onChange={(event) =>
                          onEditRow(colNo + 1, rowNo, event.target.value)
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
