import React from "react";
import SignUpContainer from "../../components/universal/login/SignUpContainer";
const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-0 lg:w-2/3 h-screen hidden lg:flex ">
        <div className="m-auto">
          <p className="m-auto text-4xl md:text-8xl font-bold text-transparent bg-clip-text  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-400">
            Traverse The Web
          </p>
          <p className="mt-4 text-md md:text-xl text-slate-700 font-mono">
            Get started with Croft
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/3 h-screen flex ">
        <div className="m-auto">
          <p className="m-auto text-5xl mb-12 text-center font-mono text-primary">
            Sign Up
          </p>
          <SignUpContainer />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
