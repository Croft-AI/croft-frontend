import React from "react";
import { Outlet } from "react-router-dom";
import PageTitle from "../components/universal/labels/PageTitle";
import NavBar from "../components/universal/nav/NavBar";
import SideBar from "../components/universal/nav/SideBar";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="grid grid-cols-9 scroll-none flex-grow overflow-y-auto ">
        <SideBar />
        <div
          className="p-6 col-span-8 flex-grow flex flex-col font-mono"
          id="detail"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
