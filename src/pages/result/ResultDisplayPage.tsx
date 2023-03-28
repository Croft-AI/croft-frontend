import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [scrapeStatus, setScrapeStatus] = useState<ScrapeStatusCode>(2);
  const [table, setTable] = useState<string[][]>();
  useEffect(() => {
    onSnapshot(doc(db, "result", id as string), (doc) => {
      console.log(doc.data());
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
        <div className="flex-grow">{id}</div>
        <div>{statusBadges[scrapeStatus]}</div>
      </div>
      <div className="w-full">
        {table !== undefined ? (
          <ResultTable data={table as string[][]} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default ResultDisplayPage;
