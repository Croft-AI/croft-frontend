import { IconShoppingCart } from "@tabler/icons-react";
import React from "react";
import {
  IoAdd,
  IoCash,
  IoCode,
  IoEye,
  IoNewspaper,
  IoPeople,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  Catalogue,
  CatalogueTags,
} from "../../firebase/store/catalogueHandler";
import { createNewImpression } from "../../firebase/store/impressionHandler";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";

const CatalougeIcons = {
  [CatalogueTags.ECOMMERCE]: <IconShoppingCart className="text-slate-300" />,
  [CatalogueTags.SECURITY]: <IoEye className="text-slate-300" />,
  [CatalogueTags.FORUM]: <IoPeople className="text-slate-300" />,
  [CatalogueTags.FINANCE]: <IoCash className="text-slate-300" />,
  [CatalogueTags.NEWS]: <IoNewspaper className="text-slate-300" />,
  [CatalogueTags.OTHERS]: <IoCode className="text-slate-300" />,
};
interface ICatalogueContainer {
  data: Catalogue;
  hasShadow: boolean;
}

const CatalogueContainer: React.FC<ICatalogueContainer> = ({
  data,
  hasShadow,
}) => {
  const uid = useAuth();
  const navigate = useNavigate();
  const { title, description, tag, createdByUsername } = data;
  const shadowStyle = hasShadow ? "shadow shadow-lg" : "";
  const createImpressionFromCat = async () => {
    try {
      const { title, description, config } = data;
      const impressionId = await createNewImpression({
        title,
        description,
        config,
        createdBy: uid as string,
        createdOn: new Date(),
      });
      pushNotification(
        NotificationType.SUCCESS,
        "Successfully Added!",
        "Catalogue was successfully added! redirecting to Impression shortly!"
      );
      navigate(`/impression/${impressionId}`);
    } catch (e) {
      pushNotification(
        NotificationType.ERROR,
        "Catalogue Error",
        "There was an error trying to add Catalogue into your impressions!"
      );
    }
  };
  return (
    <div
      className={`w-full h-56 border border-2 bg-white rounded-lg p-4 flex flex-col gap-2 select-none ${shadowStyle}`}
    >
      <p className="text-xl text-gray-700">{title}</p>
      <p className="text-xs text-gray-400">Created By: {createdByUsername}</p>
      <p className="text-gray-500 line-clamp-2 hidden lg:block">
        {description}
      </p>
      <div className="divider"></div>
      <div className="flex flex-row">
        <div className="flex flex-row gap-2 bg-slate-600 px-2 rounded-full py-1 h-fit">
          {CatalougeIcons[tag]} <p className="text-xs text-slate-200">{tag}</p>
        </div>
        <div className="flex-grow" />
        <div className="tooltip tooltip-right" data-tip={"Add as Impression"}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => createImpressionFromCat()}
          >
            <IoAdd className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogueContainer;
