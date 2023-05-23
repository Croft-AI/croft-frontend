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
  jsonToTable,
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
import {
  downloadCSV,
  exportJSONData,
} from "../../helpers/fileHelpers/downloadFile";
import LoadingPlaceholder from "../../components/placeholder/LoadingPlaceholder";

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
  const [currView, setCurrView] = useState<string[][]>([]);
  const [table, setTable] = useState<string[][]>();
  const [multiHeaders, setMultiHeaders] = useState<string[]>([]);
  const [multiTable, setMultiTable] = useState<string[][][] | undefined>();
  const [multiTableSelect, setMultiTableSelect] = useState<number>(0);
  const [data, setData] = useState<ScrapeResult>();
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    onSnapshot(
      doc(db, "result", id as string),
      (doc) => {
        const scrapeResult = doc.data() as ScrapeResult;
        setData(scrapeResult);
        setScrapeStatus(scrapeResult.status);
        if (scrapeResult.status === 3) {
          setIsError(true);
          return;
        }
        // console.log(scrapeResult);
        // if (isOneTable(scrapeResult.result)) {
        //   console.log("one table");
        //   setTable(convertToTwoDArray((doc.data() as ScrapeResult).result));
        //   setMultiTable(undefined);
        // } else {
        console.log("log", scrapeResult);
        let tempObj = {};
        let tableHeaders = [];
        let tableValues = [];
        if (scrapeResult.result) {
          for (let [tableName, value] of Object.entries(
            scrapeResult.result as object
          )) {
            // console.log(tableName, convertToTwoDArray(value));
            tableHeaders.push(tableName);
            tableValues.push(jsonToTable(value));
          }
          setMultiHeaders(tableHeaders);
          setMultiTable(tableValues);
          setMultiTableSelect(0);
          setCurrView(tableValues[0]);
          setTable(undefined);
        }
      }
      //}
    );
  }, []);
  useEffect(() => {
    if (multiTable === undefined) return;
    setCurrView(multiTable[multiTableSelect]);
  }, [multiTableSelect]);

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

        {currView !== undefined ? (
          isError ? (
            <></>
          ) : (
            <div
              className="tooltip tooltip-top m-auto"
              data-tip="Export as JSON"
            >
              <button
                className="btn btn-ghost m-auto"
                onClick={() =>
                  exportJSONData(
                    `croft-scrape-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}-${
                      data?.impressionId
                    }-${id as string}`,
                    data as ScrapeResult
                  )
                }
              >
                <IoDownload className="w-6 h-6" />
              </button>
            </div>
          )
        ) : (
          <></>
        )}
        <div className="border-l-2 px-2 m-auto">
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
      </div>
      <div>
        <div className="divider"></div>
      </div>
      {multiTable !== undefined ? (
        <div className="tabs">
          {multiHeaders.map((item, idx) => (
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
      <div className="w-full  mt-4 h-full">
        {multiTable !== undefined ? (
          <table className="overflow-x-auto  table-wrp block max-h-2/3">
            <thead className="sticky top-0 bg-white border border-1">
              <tr>
                {currView[0].map((item) => {
                  return <th className="border border-2">{item}</th>;
                })}
              </tr>
            </thead>
            <tbody className="h-1/2 overflow-y-auto overflow-x-hidden">
              {currView.slice(1).map((item, rowIdx) => {
                return (
                  <tr>
                    {item.map((data, colIdx) => (
                      <td className="border border-b-1 h-8 bg-gray-100">
                        <div
                          contentEditable
                          className="w-full h-full truncate rounded-none"
                        >
                          {data}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : isError ? (
          <div className="w-full h-96 bg-slate-800 rounded-lg shadow shadow-inner shadow-slate-400 p-8">
            {data?.error_message?.split("\n").map((item) => (
              <p className="text-red-300">{item}</p>
            ))}
            <span className="animate-blink text-white">{">"}</span>
          </div>
        ) : (
          <LoadingPlaceholder />
        )}
      </div>
    </div>
  );
};
export default ResultDisplayPage;
