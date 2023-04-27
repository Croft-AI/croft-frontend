import React from "react";
import { useParams } from "react-router-dom";
const ResultListItemPage = () => {
  const { id } = useParams();
  return <>{id}</>;
};
export default ResultListItemPage;
