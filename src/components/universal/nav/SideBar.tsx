import SideBarItem from "./SideBarItem";
import {
  IoAlbums,
  IoLibrary,
  IoDocumentText,
  IoHourglassOutline,
} from "react-icons/io5";
import { useLocation } from "react-router-dom";

const sideBarContent = [
  { icon: <IoAlbums />, name: "Dashboard", path: "/dashboard" },
  { icon: <IoLibrary />, name: "Impressions", path: "/impression" },
  { icon: <IoDocumentText />, name: "Results", path: "/result" },
  { icon: <IoHourglassOutline />, name: "Schedules", path: "/schedule" },
];

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="font-mono border-r-2">
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-2 w-full bg-base-100 text-base-content">
          {sideBarContent.map((item) => (
            <SideBarItem
              isSelected={pathname.includes(item.path)}
              linkTo={item.path}
            >
              {item.icon} {item.name}
            </SideBarItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
