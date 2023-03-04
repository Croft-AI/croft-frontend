import React from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { ReactComponent as CroftIcon } from "../../../assets/CroftIcon.svg";
const LoginContainer = () => {
  return (
    <div className="w-80 h-fit p-8 border border-2 shadow shadow-lg rounded-3xl p-8 font-mono select-none bg-white">
      <div className="text-2xl font-black flex flex-row">
        <CroftIcon className="w-8 h-8" />
        <p className="ml-2">Croft.ai</p>
      </div>

      <br></br>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="example@email.com"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text"></span>
          <span className="label-text text-xs text-secondary hover:underline active:text-primary">
            Forgot Password?
          </span>
        </label>
      </div>
      <button className="btn w-full mt-6">Login</button>
      <div className="divider text-secondary">OR</div>
      <div className="w-full flex">
        <button className="btn btn-circle btn-ghost m-auto">
          <IoLogoGoogle className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default LoginContainer;
