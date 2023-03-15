import React, { useEffect, useState } from "react";
import { IoAdd, IoDownload, IoPlay, IoSave } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  getImpressionContent,
  Impression,
} from "../../firebase/store/impressionHandler";

const ImpressionBuildPage = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [impression, setImpression] = useState<Impression | undefined>();
  useEffect(() => {
    const loadData = async () => {
      const imp = await getImpressionContent(id as string);
      setImpression(imp);
    };
    loadData();
  }, []);

  return (
    <div className="text-2xs text-base-300">
      <p className="ml-4 mb-2">id: {id}</p>
      {impression !== undefined ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="Impression Title"
                className="input input-ghost w-full focus:bg-base-200 text-2xl h-16 text-primary hover:bg-slate-200"
                defaultValue={impression.title}
                onChange={(event) => {
                  setImpression({ ...impression, title: event.target.value });
                }}
              />
              <button className="btn btn-square m-auto w-16 h-16">
                <IoPlay />
              </button>
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
          <label>
            <label className="label text-primary">Impression URL:</label>
            <input
              className="input input-bordered w-full text-primary"
              placeholder="Site URL"
            />
          </label>
          <div className="divider mt-4">
            <button className="btn btn-ghost hover:text-primary">
              <IoAdd />
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default ImpressionBuildPage;
