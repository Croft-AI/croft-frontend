import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/universal/nav/NavBar";
import ContentDisplayRow from "./components/universal/layouts/ContentDisplayRow";
import ContentDisplayContainer from "./components/universal/layouts/ContentDisplayContainer";
import PageTitle from "./components/universal/labels/PageTitle";
import LoginContainer from "./components/universal/login/LoginContainer";
import SignUpContainer from "./components/universal/login/SignUpContainer";
import ForgotPasswordContainer from "./components/universal/login/ForgotPasswordContainer";

function App() {
  return (
    <>
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

          <ForgotPasswordContainer />
          <LoginContainer />
          <SignUpContainer />

          {/* <ContentDisplayContainer
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
          /> */}
        </div>
      </div>
    </>
  );
}

export default App;
