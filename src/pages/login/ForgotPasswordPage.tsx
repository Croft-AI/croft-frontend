import React from "react";
import ForgotPasswordContainer from "../../components/universal/login/ForgotPasswordContainer";
const ForgotPasswordPage = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-white to-slate-600">
      <p className="m-auto text-4xl p-2 md:text-6xl font-bold text-transparent bg-clip-text  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-400">
        It's Alright.
      </p>
      <div className="m-auto -mt-96">
        <ForgotPasswordContainer />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
