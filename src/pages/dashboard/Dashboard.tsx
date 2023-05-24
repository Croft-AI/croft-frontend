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
    <>
      <p className="text-2xl">Catalogue 📚</p>
      <p className="text-sm text-secondary mt-4">
        Scrape from popular sites with no tinkering needed. Add from catalogues
        to start!
      </p>
      <div className="divider"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {catalogues.map((item) => {
          return <CatalogueContainer data={item} hasShadow={true} />;
        })}
      </div>
    </>
  );
};

export default DashboardPage;
