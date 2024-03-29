import SideBarItem from "./SideBarItem";
import {
  IoAlbums,
  IoLibrary,
  IoDocumentText,
  IoHourglassOutline,
  IoTimer,
} from "react-icons/io5";
import { useLocation } from "react-router-dom";

const sideBarContent = [
  {
    icon: <IoAlbums className="w-6 h-6" />,
    name: "Catalogue",
    path: "/dashboard",
  },
  {
    icon: <IoLibrary className="w-6 h-6" />,
    name: "Impressions",
    path: "/impression",
  },
  {
    icon: <IoDocumentText className="w-6 h-6" />,
    name: "Results",
    path: "/result",
  },
  {
    icon: <IoTimer className="w-6 h-6" />,
    name: "Schedules",
    path: "/schedules",
  },
];

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="font-mono border-r-2 w-20 relative sticky">
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-2 w-fit bg-base-100 text-base-content gap-2 m-auto">
          {sideBarContent.map((item) => (
            <div className="tooltip tooltip-right" data-tip={item.name}>
              <SideBarItem
                isSelected={pathname.includes(item.path)}
                linkTo={item.path}
              >
                {item.icon}
              </SideBarItem>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
