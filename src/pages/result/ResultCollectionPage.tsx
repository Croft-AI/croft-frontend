import React, { useEffect } from "react";
import { getPaginateResult } from "../../firebase/store/resultHandler";

const ResultCollectionPage = () => {
  useEffect(() => {
    const getResults = async () => {
      const results = getPaginateResult("TBj1RPhwgYaRz2hP8fmS", 10);
      console.log(results);
    };
    getResults();
  }, []);
  return <></>;
};

export default ResultCollectionPage;
