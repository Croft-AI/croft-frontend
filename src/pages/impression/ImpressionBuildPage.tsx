import React, { useEffect, useState } from "react";
import {
  IoAdd,
  IoDownload,
  IoPlay,
  IoSave,
  IoRemoveSharp,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  getImpressionContent,
  Impression,
  updateImpression,
} from "../../firebase/store/impressionHandler";
import ImpressionItemAdder from "../impression/ImpressionItemAdder";
import ImpressionConfigListItem from "./ImpressionConfigItemListItem";

const ImpressionBuildPage = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [impression, setImpression] = useState<Impression | undefined>();
  const [savedOnTime, setSavedOnTime] = useState<Date | undefined>();
  const [adderOpen, setAdderOpen] = useState<boolean>(false);

  const saveOnChange = async () => {
    if (id === undefined && impression === undefined) return;
    setLoading(true);
    await updateImpression(id as string, impression as Impression);
    setSavedOnTime(new Date());
    setLoading(false);
  };

  const onAdderConfirm = () => {
    setAdderOpen(false);
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
                  defaultValue={impression.config.url}
                  className="input input-bordered w-full text-primary border border-primary"
                  placeholder="https://www.example.com"
                  onChange={(event) =>
                    setImpression({
                      ...impression,
                      config: { ...impression.config, url: event.target.value },
                    })
                  }
                />
              </label>
            </div>
            <br></br>
            <ImpressionItemAdder
              isVisible={adderOpen}
              onCancel={() => setAdderOpen(false)}
              onConfirm={onAdderConfirm}
              impression={impression}
              setImpression={setImpression}
            />
            <div className={`divider ${adderOpen ? "hidden" : ""}`}>
              <button
                className="btn btn-ghost hover:text-primary"
                onClick={() => setAdderOpen(true)}
              >
                <IoAdd />
              </button>
            </div>
            <br></br>
            <>
              {impression.config.items.map((item) => {
                return (
                  <ImpressionConfigListItem
                    title={item.title}
                    selector={item.selector}
                    getAttributes={item.get_attributes}
                  />
                );
              })}
            </>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default ImpressionBuildPage;
