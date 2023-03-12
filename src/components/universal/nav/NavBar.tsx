import {
  IoCloudy,
  IoPersonCircle,
  IoCloudyOutline,
  IoLayersOutline,
  IoPerson,
  IoLogOut,
} from "react-icons/io5";
import { logout } from "../../../firebase/auth/userHandler";
const NavBar = () => {
  return (
    <>
      <div className="p-2 bg-base-100 border-b-2">
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
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <IoPerson />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 font-mono border border-1 "
              >
                <li>
                  <a>
                    <IoPersonCircle />
                    Profile
                  </a>
                </li>
                <li>
                  <a onClick={logout}>
                    <IoLogOut />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
