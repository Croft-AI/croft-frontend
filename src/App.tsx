import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/universal/nav/NavBar";
import ContentDisplayRow from "./components/universal/layouts/ContentDisplayRow";
import ContentDisplayContainer from "./components/universal/layouts/ContentDisplayContainer";
import PageTitle from "./components/universal/labels/PageTitle";

function App() {
  return (
    <>
      <NavBar />

      <div className="w-full flex flex-row">
        <div className="font-mono border-r-2">
          <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-8">
          <PageTitle />
          <ContentDisplayContainer
            contentRows={[
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "OFFLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "WARNING",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
              {
                title: "Shafaq News",
                link: "https://shafaq.com/en/all-news",
                lastUpdated: "14:34 | 14/07/2022",
                status: "ONLINE",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default App;
