import React from "react";
import { useParams } from "react-router-dom";

const ImpressionBuildPage = () => {
  const { id } = useParams();
  return <>{id}</>;
};
export default ImpressionBuildPage;
