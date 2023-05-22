import { IoCheckmark } from "react-icons/io5";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { ScheduleFrequency } from "../../firebase/store/scheduleHandler";
import PlanContainer from "../billing/PlanContainer";
import { ReactComponent as CroftIcon } from "../../assets/CroftIcon.svg";
const LandingHome = () => {
  const auth = useAuth();
  return (
    <div className="max-w-full h-full flex flex-col">
      <div className="w-full shadow shadow-lg h-16 border border-2 border-gray-300 bg-white/50 fixed flex flex-row backdrop-blur-xl px-2">
        <button className="btn btn-primary btn-ghost my-auto rounded-md font-mono font-bold text-black text-xl">
          CROFT
        </button>
        <div className="flex-grow"></div>
        {(auth as string) ? (
          <div className="my-auto flex flex-row">
            <div className="px-4 py-2 bg-gray-600 rounded-full text-gray-100 shadow shadow-inner shadow-gray-500">
              <a href={(auth as string) ? "/dashboard" : "/login"}>
                Go to Dashboard
              </a>
            </div>
          </div>
        ) : (
          <div className="my-auto flex flex-row">
            <p className="my-auto px-4">
              <a href="/login">Login</a>
            </p>
            <div className="divider divider-horizontal mx-0"></div>
            <div className="px-4 py-2 bg-gray-600 rounded-full text-gray-100 shadow shadow-inner shadow-gray-500">
              <a href="/signup">Sign Up</a>
            </div>
          </div>
        )}
      </div>
      <div className="h-fit  w-full">
        <div className="w-full h-fit flex py-72 flex flex-col text-center">
          <p className="m-auto text-4xl md:text-8xl font-bold text-transparent bg-clip-text  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-400">
            Traverse The Web
          </p>
          <p className="mt-4 text-md md:text-xl text-slate-700 font-mono">
            Leverage critical data with Croft
          </p>
          <div className="m-auto flex flex-row mt-8 gap-8">
            <a href={(auth as string) ? "/dashboard" : "/login"}>
              <button className="w-fit px-6 py-4 rounded-lg font-mono text-slate-200 bg-slate-900 hover:bg-slate-600 active:bg-slate-700 shadow shadow-inner shadow-slate-500 shadow shadow-md">
                Get Started
              </button>
            </a>
            <a href="#pricing">
              <button className="w-fit px-6 py-4 rounded-lg font-mono text-slate-800 font-bold hover:bg-slate-100 active:bg-slate-100 border border-2 border-slate-800 shadow shadow-inner shadow-slate-500 shadow shadow-md">
                See Pricing
              </button>
            </a>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col">
          <img
            src={require("./macdisplay.png")}
            className="w-2/3 md:w-1/2 m-auto"
          />
          <div className="m-auto text-center">
            <p className="mt-8 text-4xl md:text-8xl font-bold text-transparent bg-clip-text  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-400">
              No-Code
            </p>
            <p className="text-md md:text-xl font-mono mt-8 text-slate-700">
              Don't lose your head with headless browsers 🤯
            </p>
            <p className="text-md md:text-xl font-mono mt-4 text-slate-700">
              Scrape key open-source information using through{" "}
              <u>Impressions</u>
            </p>

            <p className="text-md md:text-xl font-mono mt-4 text-slate-700">
              Export in seconds 🚀
            </p>
            <a href="https://youtu.be/gqikUWwm5W8">
              <button className="w-fit mt-8 px-6 py-4 rounded-lg font-mono text-slate-200 bg-slate-900 hover:bg-slate-600 active:bg-slate-700 shadow shadow-inner shadow-slate-500 shadow shadow-md">
                See Demo
              </button>
            </a>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col md:flex-row mt-72">
          <div className="w-full md:w-1/2 h-fit flex">
            <div className="w-fit rounded-3xl shadow-lg m-auto p-8 border border-2">
              <p className="text-xl font-mono font-black">
                Create a Scheduled Task
              </p>
              <div className="flex flex-row gap-4 mt-2 font-mono">
                <div className="flex-grow ">
                  <label className="label">
                    <label className="label-text text-sm text-secondary">
                      Schedule Title:
                    </label>
                  </label>
                  <input
                    // onChange={(event) => setTitle(event.target.value)}
                    className="input w-full input-bordered "
                    placeholder="Schedule Title"
                  ></input>
                </div>
                <div>
                  <label className="label">
                    <label className="label-text text-sm text-secondary">
                      Select Frequency:
                    </label>
                  </label>
                  <select
                    className="select w-full select-bordered"
                    // onChange={(event) => setFrequency(event.target.value)}
                  >
                    <option value={ScheduleFrequency.WEEKLY}>WEEKLY</option>
                    <option value={ScheduleFrequency.DAILY}>DAILY</option>
                    <option value={ScheduleFrequency.HOURLY}>HOURLY</option>
                  </select>
                </div>
              </div>
              <label className="label">
                <label className="label-text text-sm text-secondary font-mono">
                  Select Impression:
                </label>
              </label>
              <select className="select w-full select-bordered">
                <option disabled value={""} selected></option>
              </select>

              <div className="w-full flex flex-row mt-6 font-mono">
                <div className="flex-grow" />
                <button type="submit">
                  <label
                    className="btn btn-primary animate-pulse"
                    htmlFor={"my-modal-4"}
                  >
                    create
                  </label>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-fit flex flex-col px-12 text-center md:text-left mt-12">
            <p className="my-auto text-4xl md:text-8xl font-bold text-transparent bg-clip-text  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-400">
              Stay Updated.
            </p>
            <p className="text-md md:text-xl font-mono mt-8 text-slate-700 flex flex-row gap-2">
              <IoCheckmark className="text-green-600 w-6 h-6"></IoCheckmark>
              Create scheduled scraping operations
            </p>
            <p className="text-md md:text-xl font-mono mt-4 text-slate-700 flex flex-row gap-2">
              <IoCheckmark className="text-green-600 w-6 h-6"></IoCheckmark>3
              Scheduled tasks for free
            </p>

            <p className="text-md md:text-xl font-mono mt-4 text-slate-700 flex flex-row gap-2">
              <IoCheckmark className="text-green-600 w-6 h-6"></IoCheckmark>
              Weekly, Daily, Hourly operations
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col mt-32">
          <img
            src={require("./macImpressionDisplay.png")}
            className="w-2/3 md:w-1/2 m-auto"
          />
          <div className="m-auto text-center">
            <p className="mt-8 text-4xl p-4 md:text-8xl font-bold text-transparent bg-clip-text  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-400">
              Supercharge
            </p>
            <p className="text-md md:text-xl font-mono mt-8 text-slate-700">
              Get key data from popular sites like Reddit in 2-clicks 🚀
            </p>
            <p className="text-md md:text-xl font-mono mt-8 text-slate-700">
              Browse from a variety of pre-build configurations from{" "}
              <u>Catalogue</u>
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col mt-32 text-center">
          <p className="mt-8 text-4xl p-4 md:text-8xl font-bold text-transparent bg-clip-text  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-400">
            Pricing
          </p>
          <p className="text-md md:text-xl font-mono mt-8 text-slate-700">
            Get started for free,{" "}
            <u className="text-slate-500 hover:text-slate-600">
              <a href={(auth as string) ? "/billing" : "/signup"}>upgrade</a>
            </u>{" "}
            to stay updated!
          </p>
          <div
            id="pricing"
            className="m-auto mt-12 flex md:flex-row flex-col h-fit gap-8 font-mono"
          >
            <PlanContainer
              isPremium={false}
              isShadow={false}
              planTitle="Basic Plan"
              planDescription="Traverse the Web"
              pricingPerMonth={0}
              characteristics={[
                "20 Impressions",
                "3 Schedules",
                "Unlimited Results",
              ]}
            />
            <PlanContainer
              isPremium={false}
              isShadow={true}
              planTitle="Premium Plan"
              planDescription="Stay Up to Date"
              pricingPerMonth={9.99}
              characteristics={[
                "50 Impressions",
                "10 Schedules",
                "Unlimited Results",
              ]}
            />
          </div>
          <div className="w-full mt-72 h-96 p-8 flex flex-col bg-gradient-to-b from-white via-slate-300 to-slate-600">
            <div className="m-auto w-full h-fit bg-white border border-2 shadow shadow-lg flex rounded-lg p-8">
              <div className="m-auto flex flex-col">
                <div className="flex flex-row m-auto gap-2">
                  <CroftIcon className="w-6 h-6" />
                  <p className="text-xl font-bold font-mono">CROFT</p>
                </div>
                <p className="text-md text-gray-600 font-mono">
                  For Equiries: <u>hello@croft.so</u>
                </p>
                <p className="text-md text-gray-300 font-mono">
                  &copy; Copyright 2023, CROFT.SO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-screen bg-white w-full"></div> */}
    </div>
  );
};
export default LandingHome;
