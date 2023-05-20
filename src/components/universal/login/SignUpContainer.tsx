import React, { useEffect, useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CroftIcon } from "../../../assets/CroftIcon.svg";
import { useAuth } from "../../../firebase/auth/AuthContextWrapper";
import { signInWithGoogle } from "../../../firebase/auth/signInWithGoogle";
import { createUserWithPass } from "../../../firebase/auth/userHandler";
import {
  isEmailValid,
  isFieldsEmpty,
  isPasswordValid,
} from "../../../helpers/validators/userValidator";
import {
  NotificationType,
  pushNotification,
} from "../../../notifications/notificationPusher";
const SignUpContainer = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cfmPassword, setCfmPassword] = useState<string>("");

  const signUpWithEmailPassword = async () => {
    try {
      isFieldsEmpty([firstName, lastName, email, password, cfmPassword]);
      isEmailValid(email);
      isPasswordValid(password, cfmPassword);
      const userObject = {
        firstName,
        lastName,
        email,
        createdOn: new Date(),
        lastLogin: new Date(),
        impressions: [],
        photoURL: "",
      };
      await createUserWithPass(userObject, password);
      pushNotification(
        NotificationType.SUCCESS,
        "Successful Registration",
        "You have successfully registered! Start traversing the web!"
      );
    } catch (e) {
      console.error(e);
      pushNotification(
        NotificationType.ERROR,
        "Sign Up Error:",
        (e as any).message
      );
    }
  };
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  return (
    <div className="w-96 h-fit p-8 border border-2 shadow shadow-lg rounded-3xl p-8 font-mono select-none bg-white">
      <div className="text-2xl font-black flex flex-row">
        <CroftIcon className="w-8 h-8" />
        <p className="ml-2">Croft.so</p>
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
              onChange={(event) => setFirstName(event.target.value)}
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
              onChange={(event) => setLastName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="Email"
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
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          onChange={(event) => setCfmPassword(event.target.value)}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <br></br>
      <button className="btn w-full mt-6" onClick={signUpWithEmailPassword}>
        Sign Up
      </button>
      <div className="divider text-secondary">OR</div>
      <div className="w-full flex">
        <button
          className="btn btn-circle btn-ghost m-auto"
          onClick={signInWithGoogle}
        >
          <IoLogoGoogle className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default SignUpContainer;
