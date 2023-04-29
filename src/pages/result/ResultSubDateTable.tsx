import { Table } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScrapeResult } from "../../firebase/store/resultHandler";
interface IResultSubDateTable {
  data: ScrapeResult[];
}
const ResultSubDateTable: React.FC<IResultSubDateTable> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Table
      highlightOnHover
      withBorder
      className="ml-4 shadow shadow-md rounded-md overflow-hidden font-mono"
    >
      <tbody>
        {data.map((item) => {
          return (
            <tr onClick={() => navigate(`/result/${item.id}`)}>
              <td className="p-4 w-full">{item.id}</td>
              <td className="text-gray-400">
                {Math.round(item.scrapeDuration * 100) / 100}s
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ResultSubDateTable;
