import React from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { ReactComponent as CroftIcon } from "../../../assets/CroftIcon.svg";
const SignUpContainer = () => {
  return (
    <div className="w-96 h-fit p-8 border border-2 shadow shadow-lg rounded-3xl p-8 font-mono select-none bg-white">
      <div className="text-2xl font-black flex flex-row">
        <CroftIcon className="w-8 h-8" />
        <p className="ml-2">Croft.ai</p>
      </div>
      <p className="mt-4 text-sm text-secondary">Traverse the web with us...</p>
      <br></br>
      <div className="form-control w-full max-w-xs">
        <div className="flex flex-row w-full gap-4">
          <div>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Email"
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
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <br></br>
      <button className="btn w-full mt-6">Sign Up</button>
      <div className="divider text-secondary">OR</div>
      <div className="w-full flex">
        <button className="btn btn-circle btn-ghost m-auto">
          <IoLogoGoogle className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default SignUpContainer;
