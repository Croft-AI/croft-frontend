import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  createNewImpression,
  getImpressions,
  ImpressionRead,
} from "../../firebase/store/impressionHandler";
import { randomName } from "../../helpers/randomNameGenerator/randomNameGenerator";
import { ImpressionConfigType } from "../../helpers/types/ImpressionType";
import { AccountIs } from "../../limits/AccountLimits";

interface IImpressionTitle {
  onButtonClick: () => void;
  noOfImpressions: number;
}

const ImpressionTitle: React.FC<IImpressionTitle> = ({
  onButtonClick,
  noOfImpressions,
}) => {
  const [title, setTitle] = useState<string>(randomName().toUpperCase());
  const [loading, setLoading] = useState<boolean>(false);
  const [impressions, setImpressions] = useState<ImpressionRead[]>();
  const navigate = useNavigate();
  const auth = useAuth();
  const createImpressionRedirect = async () => {
    const docId = await createNewImpression({
      createdBy: auth as string,
      createdOn: new Date(),
      config: {
        url: "",
        wait_for_selector: "",
        items: [],
      } as ImpressionConfigType,
      title,
      description: "",
    });
    return navigate(`/impression/${docId}`);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Impressions</p>
          <p className="text-sm text-secondary mt-4">
            Create an impression to start extracting data from websites OR
            checkout some of our presets below.
          </p>
        </div>
        {noOfImpressions >= AccountIs["BASIC"].IMPRESSIONS ? (
          <></>
        ) : (
          <label htmlFor="my-modal-4" className="btn btn-square m-auto">
            <IoAdd className="w-6 h-6 text-white" />
          </label>
        )}
        <input
          type="checkbox"
          id="my-modal-4"
          className="modal-toggle w-full"
        />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Create an Impression</h3>
            <p className="py-4 text-sm">Start traversing the web!</p>
            <label className="label">
              <label className="label-text text-sm text-secondary">
                Rename Your Impression
              </label>
            </label>
            <input
              type="text"
              placeholder="Impression Title"
              className="input input-bordered w-full border-2 border-primary"
              defaultValue={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className="w-full flex flex-row mt-6">
              <div className="flex-grow" />
              <button
                className="btn btn-primary"
                onClick={createImpressionRedirect}
              >
                create
              </button>
            </div>
          </label>
        </label>
      </div>
    </>
  );
};
export default ImpressionTitle;
