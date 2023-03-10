import NavBar from "../../components/universal/nav/NavBar";
import { logout } from "../../firebase/auth/userHandler";

const HomePage = () => {
  return (
    <>
      <NavBar />
      Home
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default HomePage;
