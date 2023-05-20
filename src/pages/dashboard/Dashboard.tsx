import React, { useEffect } from "react";
import PageTitle from "../../components/universal/labels/PageTitle";
import NavBar from "../../components/universal/nav/NavBar";
import { getCatalogues } from "../../firebase/store/catalogueHandler";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";

const DashboardPage = () => {
  useEffect(() => {
    const getAllCatalogues = async () => {
      try {
        const catalogues = await getCatalogues();
        console.log(catalogues);
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
  return <div></div>;
};

export default DashboardPage;
