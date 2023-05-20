import React, { useEffect, useState } from "react";
import {
  getCatalogues,
  Catalogue,
} from "../../firebase/store/catalogueHandler";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";
import CatalogueContainer from "./CatalogueContainer";

const DashboardPage = () => {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  useEffect(() => {
    const getAllCatalogues = async () => {
      try {
        const cats = await getCatalogues();
        setCatalogues(cats);
      } catch (e) {
        console.error(e);
        pushNotification(
          NotificationType.ERROR,
          "Catalogue Error",
          (e as any).message
        );
      }
    };
    getAllCatalogues();
  }, []);
  return (
    <div className="grid grid-cols-3 md:grid-cols-4">
      {catalogues.map((item) => {
        return <CatalogueContainer data={item} hasShadow={true} />;
      })}
    </div>
  );
};

export default DashboardPage;
