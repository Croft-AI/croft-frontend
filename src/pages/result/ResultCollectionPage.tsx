import React, { useEffect, useState } from "react";
import LoadingPlaceholder from "../../components/placeholder/LoadingPlaceholder";
import ResultEmptyPlaceholder from "../../components/placeholder/ResultEmptyPlaceholder";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  getImpressions,
  ImpressionRead,
} from "../../firebase/store/impressionHandler";
import { getPaginateResult } from "../../firebase/store/resultHandler";
import ImpressionList from "../impression/ImpressionList";
import ResultCollectionItem from "./ResultCollectionItem";

const ResultCollectionPage = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [impressions, setImpressions] = useState<ImpressionRead[]>();
  useEffect(() => {
    const getAllImpressions = async () => {
      const list = await getImpressions(auth as string);
      setLoading(false);
      setImpressions(list);
    };
    getAllImpressions();
  }, []);
  return (
    <>
      <div className="flex-grow">
        <p className="text-2xl">Results</p>
        <p className="text-sm text-secondary mt-4">
          View scraping history for each impression.
        </p>
        <div className="divider"></div>
        {loading ? (
          <LoadingPlaceholder />
        ) : impressions?.length === 0 ? (
          <ResultEmptyPlaceholder />
        ) : (
          <div className="h-96">
            <ImpressionList>
              {impressions !== undefined ? (
                impressions.map((item) => (
                  <ResultCollectionItem
                    impressionId={item.id}
                    path={`./${item.id}/view`}
                    title={item.title}
                    createdOn={item.createdOn.toDate()}
                  />
                ))
              ) : (
                <></>
              )}
            </ImpressionList>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultCollectionPage;
