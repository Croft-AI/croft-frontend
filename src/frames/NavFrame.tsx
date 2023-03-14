import React from "react";
import { Outlet } from "react-router-dom";
import PageTitle from "../components/universal/labels/PageTitle";
import NavBar from "../components/universal/nav/NavBar";
import SideBar from "../components/universal/nav/SideBar";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="w-full flex flex-row scroll-none flex-grow">
        <SideBar />
        <div
          className="w-full p-8 flex-grow flex flex-col font-mono"
          id="detail"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
