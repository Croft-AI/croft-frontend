import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/base";
import {
  NotificationType,
  pushNotification,
} from "../../../notifications/notificationPusher";
const ForgotPasswordContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const sendForgotPasswordEmail = () => {
    sendPasswordResetEmail(auth, email as string)
      .then(() => {
        // Password reset email sent!
        // ..\
        navigate("/login");
      })
      .catch((error) => {
        pushNotification(NotificationType.ERROR, "Password Error:", error);
        // ..
      });
  };
  return (
    <div className="w-80 h-fit p-8 border border-2 shadow shadow-lg rounded-3xl p-8 font-mono select-none bg-white">
      <p className="text-xl font-bold">Forgot Password?</p>
      <p className="text-sm text-secondary mt-1">
        Check your inbox to reset.
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
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <button className="btn w-full mt-6" onClick={sendForgotPasswordEmail}>
        Confirm
      </button>
    </div>
  );
};

export default ForgotPasswordContainer;
