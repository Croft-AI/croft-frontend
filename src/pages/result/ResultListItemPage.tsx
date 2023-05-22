import {
  getPaginateResult,
  ScrapeResult,
} from "../../firebase/store/resultHandler";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/base";
import {
  getImpressionContent,
  Impression,
} from "../../firebase/store/impressionHandler";
import { Timeline } from "@mantine/core";
import { sortResultsByDate } from "../../helpers/result/resultSortHelpers";
import ResultSubDateTable from "./ResultSubDateTable";
const ResultListItemPage = () => {
  const { id } = useParams();
  const [impression, setImpression] = useState<Impression>();
  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [sortedKeys, setSortedKeys] = useState<string[]>();
  const [sortedResults, setSortedResults] = useState<[]>([]);
  useEffect(() => {
    const getResults = async () => {
      const pageResults = await getPaginateResult(id as string, 20);
      setResults(pageResults);
    };

    getResults();
  }, []);
  useEffect(() => {
    const getImpression = async () => {
      const currImpression = await getImpressionContent(id as string);
      setImpression(currImpression);
    };
    getImpression();
  }, []);

  useEffect(() => {
    const [keys, groupResults] = sortResultsByDate(results) as any;
    setSortedKeys(keys);
    setSortedResults(groupResults);
  }, [results]);
  return (
    <>
      <div className="flex-grow select-none">
        <p className="text-2xl">
          Last 20 Results for:{" "}
          <i className="text-xl text-gray-600">{impression?.title}</i>
        </p>
        <p className="text-sm text-secondary mt-4">{impression?.description}</p>
        <div className="divider"></div>
        <Timeline
          active={results.length - 1}
          lineWidth={4}
          color="gray"
          className="w-full"
        >
          {sortedKeys?.map((item) => {
            return (
              <Timeline.Item title={`Scraped on: ${item}`} color="gray">
                <ResultSubDateTable data={sortedResults[item as any]} />
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </>
  );
};
export default ResultListItemPage;
