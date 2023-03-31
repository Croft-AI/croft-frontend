import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/base";
import {
  ScrapeResult,
  ScrapeStatusCode,
} from "../../firebase/store/resultHandler";
import {
  convertFromArrObjToTwoDArray,
  convertToTwoDArray,
  isOneTable,
  makeOneTable,
} from "../../helpers/tableViewChecker.ts/tableViewChecker";
import ResultTable from "./ResultTable";
import { tab } from "@testing-library/user-event/dist/tab";
import { IconChevronLeft } from "@tabler/icons-react";
import {
  IoChevronBack,
  IoDownload,
  IoRefresh,
  IoTerminal,
} from "react-icons/io5";
import { Impression } from "../../firebase/store/impressionHandler";
import { downloadCSV } from "../../helpers/fileHelpers/downloadFile";

const statusBadges = {
  1: (
    <span className="badge badge-success m-auto shadow shadow-inner">
      SUCCESS
    </span>
  ),
  2: (
    <span className="badge badge-warning m-auto shadow shadow-inner animate-pulse">
      SCRAPING
    </span>
  ),
  3: (
    <span className="badge badge-error m-auto shadow shadow-inner">FAILED</span>
  ),
};

const ResultDisplayPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [scrapeStatus, setScrapeStatus] = useState<ScrapeStatusCode>(2);
  const [table, setTable] = useState<string[][]>();
  const [multiTable, setMultiTable] = useState<object | undefined>();
  const [multiTableSelect, setMultiTableSelect] = useState<number>(0);
  const [data, setData] = useState<ScrapeResult>();

  useEffect(() => {
    onSnapshot(doc(db, "result", id as string), (doc) => {
      const scrapeResult = doc.data() as ScrapeResult;
      setData(scrapeResult);
      setScrapeStatus(scrapeResult.status);
      console.log(scrapeResult);
      if (isOneTable(scrapeResult.result)) {
        console.log("one table");
        setTable(convertToTwoDArray((doc.data() as ScrapeResult).result));
        setMultiTable(undefined);
      } else {
        let tempObj = {};
        for (let [tableName, value] of Object.entries(
          scrapeResult.result as object
        )) {
          tempObj = {
            ...tempObj,
            [tableName]: convertFromArrObjToTwoDArray(value),
          };
        }
        setMultiTable(tempObj);
        setMultiTableSelect(0);
        setTable(undefined);
      }
    });
  }, []);
  useEffect(() => {
    console.log(multiTable);
  }, [multiTable]);

  return (
    <div className="flex-grow">
      <div className="flex flex-row gap-4 mb-4">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <IoChevronBack className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-2xl font-bold flex-grow">
          RESULTS{" "}
          <p className="text-secondary text-2xs font-normal">id: {id}</p>
        </p>

        {table !== undefined ? (
          <button
            className="btn btn-ghost m-auto"
            onClick={() =>
              downloadCSV(
                `croft-scrape-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}-${
                  data?.impressionId
                }-${id as string}`,
                table
              )
            }
          >
            <IoDownload className="w-6 h-6" />
          </button>
        ) : (
          <></>
        )}
        <div className="border-x-2 px-2 m-auto">
          <div className="w-fit h-fit bg-primary shadow shadow-inner shadow-slate-400 p-2 rounded-lg">
            <table className="text-right text-slate-100 text-xs ">
              <tr>
                <td>SCRAPE STATUS:</td> <td>{statusBadges[scrapeStatus]}</td>
              </tr>
              <tr>
                <td>DURATION:</td>
                <td className="text-center">
                  {data?.scrapeDuration !== undefined ? (
                    <>{Math.round(data.scrapeDuration * 100) / 100}s</>
                  ) : (
                    <>-</>
                  )}
                </td>
              </tr>
            </table>
            <div></div>
          </div>
        </div>
        <button className="btn btn-ghost m-auto">
          <IoRefresh className="w-6 h-6" />
        </button>
      </div>
      <div>
        <div className="divider"></div>
      </div>
      {multiTable !== undefined ? (
        <div className="tabs">
          {Object.keys(multiTable)
            .sort()
            .map((item, idx) => (
              <a
                className={`tab tab-lifted ${
                  idx === multiTableSelect ? "tab-active" : ""
                }`}
                onClick={() => setMultiTableSelect(idx)}
              >
                {item}
              </a>
            ))}
        </div>
      ) : (
        <></>
      )}
      <div className="w-full  mt-4">
        {table !== undefined ? (
          <ResultTable data={table as string[][]} setTable={setTable} />
        ) : (
          <>
            {multiTable !== undefined ? (
              <ResultTable
                data={
                  Object.values(multiTable).sort()[
                    multiTableSelect
                  ] as string[][]
                }
                setTable={setTable}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default ResultDisplayPage;
