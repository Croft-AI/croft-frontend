import {
  IoCloudy,
  IoCloudyOutline,
  IoLayersOutline,
  IoPerson,
} from "react-icons/io5";
const NavBar = () => {
  return (
    <>
      <div className="p-1 bg-base-100">
        <div className="flex flex-row">
          <div className="grow">
            <a className="btn btn-ghost normal-case text-xl font-mono">CROFT</a>
          </div>
          <div className="flex flex-row">
            <button className="btn btn-ghost">
              <IoLayersOutline />
            </button>
            <button className="btn btn-ghost">
              <IoCloudyOutline />
            </button>
            <button className="btn btn-ghost">
              <IoPerson />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
