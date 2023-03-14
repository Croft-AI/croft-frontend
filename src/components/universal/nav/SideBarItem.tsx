import React from "react";
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
    <li>
      <a className={`${selected}`} href={linkTo}>
        {children}
      </a>
    </li>
  );
};
export default SideBarItem;
