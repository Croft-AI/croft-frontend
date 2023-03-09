import React from "react";
import PageTitle from "../../components/universal/labels/PageTitle";
import SignUpContainer from "../../components/universal/login/SignUpContainer";
import NavBar from "../../components/universal/nav/NavBar";

const DashboardPage = () => {
  return (
    <div>
      <NavBar />

      <div className="w-full flex flex-row">
        <div className="font-mono border-r-2">
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-64 bg-base-100 text-base-content">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-8 w-full">
          <PageTitle />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
