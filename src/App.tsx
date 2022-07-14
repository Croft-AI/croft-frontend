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
      <div className="w-3/4 m-auto">
        <PageTitle />
      </div>
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
    </>
  );
}

export default App;
