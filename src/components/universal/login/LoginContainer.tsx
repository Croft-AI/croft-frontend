import React, { useEffect, useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CroftIcon } from "../../../assets/CroftIcon.svg";
import { useAuth } from "../../../firebase/auth/AuthContextWrapper";
import { signInWithGoogle } from "../../../firebase/auth/signInWithGoogle";
import { userLoginWithEmailPassword } from "../../../firebase/auth/userHandler";
const LoginContainer = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  return (
    <div className="w-80 h-fit p-8 border border-2 shadow shadow-lg rounded-3xl p-8 font-mono select-none bg-white">
      <div className="text-2xl font-black flex flex-row">
        <CroftIcon className="w-8 h-8" />
        <p className="ml-2">Croft.so</p>
      </div>

      <br></br>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="example@email.com"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text"></span>
          <span
            className="label-text text-xs text-secondary hover:underline active:text-primary"
            onClick={() => navigate("/forgot")}
          >
            Forgot Password?
          </span>
        </label>
      </div>
      <button
        className="btn w-full mt-6"
        onClick={() => userLoginWithEmailPassword(email, password)}
      >
        Login
      </button>
      <div className="divider text-secondary">OR</div>
      <div className="w-full flex flex-col">
        <button
          className="btn btn-circle btn-ghost m-auto"
          onClick={signInWithGoogle}
        >
          <IoLogoGoogle className="w-10 h-10" />
        </button>
        <br></br>
        <p className="text-2xs text-secondary m-auto">
          Sign up{" "}
          <a href="/signup" className="underline hover:text-primary">
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginContainer;
