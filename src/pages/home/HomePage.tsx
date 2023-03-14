import PageTitle from "../../components/universal/labels/PageTitle";
import NavBar from "../../components/universal/nav/NavBar";
import SideBar from "../../components/universal/nav/SideBar";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="w-full flex flex-row scroll-none flex-grow">
        <SideBar />
        <div className="w-full p-8 flex-grow flex flex-col">
          <PageTitle />
          <div className="flex-grow w-full bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
