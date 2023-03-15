import React, { useEffect, useState } from "react";
import { IoAdd, IoDownload, IoPlay, IoSave } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  getImpressionContent,
  Impression,
  updateImpression,
} from "../../firebase/store/impressionHandler";

const ImpressionBuildPage = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [impression, setImpression] = useState<Impression | undefined>();
  const [savedOnTime, setSavedOnTime] = useState<Date | undefined>();

  const saveOnChange = async () => {
    if (id === undefined && impression === undefined) return;
    setLoading(true);
    console.log("saving...");
    await updateImpression(id as string, impression as Impression);
    setSavedOnTime(new Date());
    setLoading(false);
  };
  useEffect(() => {
    const loadData = async () => {
      const imp = await getImpressionContent(id as string);
      setImpression(imp);
    };
    loadData();
  }, []);

  useEffect(() => {
    const delayedSave = setTimeout(saveOnChange, 2000);
    return () => clearTimeout(delayedSave);
  }, [impression]);
  return (
    <div className="flex-grow">
      <div className="">
        <div className="text-2xs text-base-300 flex flex-row">
          <p className="ml-4 mb-2 flex-grow">id: {id}</p>
          <p className="ml-4 mb-2">
            Last Saved On: {savedOnTime?.getUTCDate()}/
            {savedOnTime?.getUTCMonth()}/{savedOnTime?.getUTCFullYear()}{" "}
            {savedOnTime?.getHours()}:{savedOnTime?.getMinutes()}:
            {savedOnTime?.getSeconds()}
          </p>
        </div>
        {impression !== undefined ? (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <input
                  type="text"
                  placeholder="Impression Title"
                  className="input input-ghost w-full focus:bg-base-200 text-2xl h-16 text-primary hover:bg-slate-200 mr-2"
                  defaultValue={impression.title}
                  onChange={(event) => {
                    setImpression({ ...impression, title: event.target.value });
                  }}
                />
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 m-auto" />
                ) : (
                  <button className="btn btn-circle m-auto">
                    <IoPlay />
                  </button>
                )}
              </div>
              <textarea
                className="textarea textarea-ghost focus:bg-base-200 text-primary hover:bg-slate-200 h-16"
                placeholder="Impression Description"
                defaultValue={impression.description}
                onChange={(event) => {
                  setImpression({
                    ...impression,
                    description: event.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="divider"></div>
            <div className="my-4">
              <label>
                <label className="label text-primary">Site URL:</label>
                <input
                  className="input input-bordered w-full text-primary border border-primary"
                  placeholder="https://www.example.com"
                />
              </label>
            </div>
            <br></br>
            <div className="w-full h-fit shadow ease-in duration-300 shadow-lg rounded-lg border border-2 p-4 flex flex-col gap-2">
              <p className="font-bold">Add Item</p>
              <div className="h-fit flex flex-row gap-2 gap-2 ">
                <div className="border-r-2 w-full pr-4">
                  <label className="label text-sm text-secondary">
                    <span className="label-text">Item Name:</span>
                  </label>
                  <input
                    type="text"
                    className={"input input-bordered w-full mr-2 input-sm"}
                    placeholder="Example: 'product_price'"
                  />
                  <label className="label text-sm text-secondary">
                    <span className="label-text">
                      CSS Selector / Selector Path
                    </span>
                  </label>
                  <input
                    type="text"
                    className={"input input-bordered w-full mr-2 input-sm"}
                    placeholder="Example: div.className"
                  />
                </div>
                <div className="w-full px-4 m-auto">
                  <p className="text-sm font-bold">Attributes to Include</p>
                  <table className="mt-4 w-full ">
                    <tr>
                      <td>href:</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </td>
                      <td>id:</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </td>
                      <td>class:</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>src:</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </td>
                      <td>title:</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex-grow"></div>
                <button className="btn btn-ghost">Clear</button>
                <button className="btn">Confirm</button>
              </div>
            </div>
            <div className="divider">
              <button className="btn btn-ghost hover:text-primary">
                <IoAdd />
              </button>
            </div>
            <br></br>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default ImpressionBuildPage;
