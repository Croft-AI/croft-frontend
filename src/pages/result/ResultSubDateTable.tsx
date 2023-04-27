import { Table } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { ScrapeResult } from "../../firebase/store/resultHandler";
interface IResultSubDateTable {
  data: ScrapeResult[];
}
const ResultSubDateTable: React.FC<IResultSubDateTable> = ({ data }) => {
  return (
    <Table
      highlightOnHover
      className="shadow shadow-md rounded-md bg-slate-100 overflow-hidden border border-1"
    >
      <tbody>
        {data.map((item) => {
          return (
            <tr>
              <Link to={`/result/${item.id}`}>
                <td className="p-4 text-gray-600 w-full">{item.id}</td>
              </Link>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ResultSubDateTable;
