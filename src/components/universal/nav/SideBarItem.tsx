import React from "react";
import { Link } from "react-router-dom";
interface ISideBarItem {
  isSelected: boolean;
  linkTo: string;
  children: React.ReactNode | React.ReactNode[];
}
const SideBarItem: React.FC<ISideBarItem> = ({
  isSelected = true,
  linkTo,
  children,
}) => {
  const selected = isSelected
    ? "bg-slate-200 hover:bg-base-300 active:bg-primary"
    : "";
  return (
    <Link to={linkTo}>
      <li>
        <a className={`btn btn-ghost truncate ${selected}`}>{children}</a>
      </li>
    </Link>
  );
};
export default SideBarItem;
