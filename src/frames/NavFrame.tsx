import React from "react";
import { IoLaptop, IoLaptopOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import PageTitle from "../components/universal/labels/PageTitle";
import NavBar from "../components/universal/nav/NavBar";
import SideBar from "../components/universal/nav/SideBar";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-screen absolute z-10 bg-white/90 block sm:hidden flex flex-col">
        <div className="m-auto w-64 flex flex-col">
          <IoLaptopOutline className="w-32 h-32 text-gray-400 m-auto" />
          <p className="text-center font-mono text-gray-500">
            Hello! You might have a better experience using Croft on a larger
            screen 📺
          </p>
        </div>
      </div>
      <NavBar />
      <div className="grid grid-cols-10 scroll-none flex-grow overflow-y-auto ">
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
