import React, { useEffect } from "react";
import SideBarItem from "./SideBarItem";
import {
  IoAlbums,
  IoLibrary,
  IoDocumentText,
  IoHourglassOutline,
} from "react-icons/io5";
import { useLocation } from "react-router-dom";
const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="font-mono border-r-2">
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-2 w-48 bg-base-100 text-base-content">
          <SideBarItem isSelected={pathname === "/"} linkTo="/">
            <IoAlbums />
            Dashboard
          </SideBarItem>
          <SideBarItem
            isSelected={pathname === "/impressions"}
            linkTo="/impressions"
          >
            <IoLibrary />
            Impressions
          </SideBarItem>
          <SideBarItem isSelected={pathname === "/results"} linkTo="/results">
            <IoDocumentText />
            Results
          </SideBarItem>
          <SideBarItem
            isSelected={pathname === "/schedules"}
            linkTo="/schedules"
          >
            <IoHourglassOutline />
            Schedules
          </SideBarItem>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
