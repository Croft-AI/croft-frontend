import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/base";
import {
  ScrapeResult,
  ScrapeStatusCode,
} from "../../firebase/store/resultHandler";
import {
  convertToTwoDArray,
  isOneTable,
  makeOneTable,
} from "../../helpers/tableViewChecker.ts/tableViewChecker";
import ResultTable from "./ResultTable";
import { tab } from "@testing-library/user-event/dist/tab";
import { IconChevronLeft } from "@tabler/icons-react";
import { IoChevronBack } from "react-icons/io5";
import { Impression } from "../../firebase/store/impressionHandler";

const statusBadges = {
  1: (
    <span className="badge badge-success m-auto shadow shadow-inner">
      SUCCESS
    </span>
  ),
  2: (
    <span className="badge badge-warning m-auto shadow shadow-inner animate-pulse">
      IN PROGRESS
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
  const [data, setData] = useState<ScrapeResult>();
  useEffect(() => {
    onSnapshot(doc(db, "result", id as string), (doc) => {
      setData(doc.data() as ScrapeResult);
      setScrapeStatus((doc.data() as ScrapeResult).status);
      console.log(
        "isOneTable",
        isOneTable((doc.data() as ScrapeResult).result)
      );
      setTable(convertToTwoDArray((doc.data() as ScrapeResult).result));
    });
  }, []);

  return (
    <div className="flex-grow">
      <div className="flex flex-row gap-4">
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <IoChevronBack />
        </button>
        <div className="flex-grow text-xs text-secondary border-l-2 pl-4">
          <>
            RESULT ID: {id} <br />
            SCRAPED ON: {data?.scrapeDatetime.toDate().getUTCDate()}/
            {(data?.scrapeDatetime.toDate().getUTCMonth() as number) + 1}/
            {data?.scrapeDatetime.toDate().getUTCFullYear()}{" "}
            {data?.scrapeDatetime.toDate().getHours()}:
            {data?.scrapeDatetime.toDate().getMinutes()}:
            {data?.scrapeDatetime.toDate().getSeconds()}
          </>
        </div>
        <table className="text-right">
          <tr>
            <td>SCRAPE STATUS:</td> <td>{statusBadges[scrapeStatus]}</td>
          </tr>
          <tr className="text-sm">
            <td>DURATION:</td>
            <td>
              {data?.scrapeDuration !== undefined ? (
                <>{Math.round(data.scrapeDuration * 100) / 100}s</>
              ) : (
                <>-</>
              )}
            </td>
          </tr>
        </table>
      </div>
      <div className="divider"></div>
      <div className="w-full">
        {table !== undefined ? (
          <ResultTable data={table as string[][]} setTable={setTable} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default ResultDisplayPage;
