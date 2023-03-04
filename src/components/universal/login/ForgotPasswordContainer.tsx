import React from "react";
import { IoLogoGoogle } from "react-icons/io5";
const ForgotPasswordContainer = () => {
  return (
    <div className="w-80 h-fit p-8 border border-2 shadow shadow-lg rounded-3xl p-8 font-mono select-none bg-white">
      <p className="text-xl font-bold">Forgot Password?</p>
      <p className="text-sm text-secondary mt-1">
        Type your Email, we'll fix it.
      </p>
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
      </div>
      <button className="btn w-full mt-6">Confirm</button>
    </div>
  );
};

export default ForgotPasswordContainer;
