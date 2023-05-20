import { useEffect, useState } from "react";
import { IoAdd, IoPlay, IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  getImpressionContent,
  Impression,
  updateImpression,
} from "../../firebase/store/impressionHandler";
import ImpressionItemAdder from "../impression/ImpressionItemAdder";
import ImpressionConfigListItem from "./ImpressionConfigItemListItem";
import { createResultDoc } from "../../firebase/store/resultHandler";
import { postCroftScrapeConfig } from "../../handler/croftSubHandler";
import { isUrlValid } from "../../helpers/validators/impressionAdderValidator";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";

const ImpressionBuildPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const deleteItem = (index: number) => {
    if (impression === undefined) return;
    let tempArr = impression.config.items;
    tempArr.splice(index, 1);
    setImpression({
      ...impression,
      config: {
        ...impression.config,
        items: tempArr,
      },
    });
  };
  const onAdderConfirm = () => {
    setAdderOpen(false);
  };

  const onButtonRun = async () => {
    try {
      isUrlValid(impression?.config.url as string);
      const result_doc_id = await createResultDoc(id as string);
      // await postCroftScrapeConfig({
      //   impression_id: id as string,
      //   result_doc_id,
      //   ...(impression as Impression).config,
      //   wait_for_selector: impression?.config.items[0].css_selector,
      // });

      navigate(`/result/${result_doc_id}`);
    } catch (e) {
      console.error(e);
      pushNotification(
        NotificationType.ERROR,
        "Field Error:",
        (e as any).message
      );
    }
  };
  useEffect(() => {
    const loadData = async () => {
      const imp = await getImpressionContent(id as string);
      setImpression(imp);
    };
    loadData();
  }, []);

  useEffect(() => {
    const delayedSave = setTimeout(saveOnChange, 1000);
    return () => clearTimeout(delayedSave);
  }, [impression]);
  return (
    <div className="grow-0">
      <div className="text-2xs flex flex-row">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <IoChevronBackOutline className="w-6 h-6" />
        </button>
        <p className="grow ml-4 mb-2 text-base-300 m-auto text-right">
          id: {id} <br></br>
          Last Saved On: {savedOnTime?.getUTCDate()}/
          {savedOnTime?.getUTCMonth()}/{savedOnTime?.getUTCFullYear()}{" "}
          {savedOnTime?.getHours()}:{savedOnTime?.getMinutes()}:
          {savedOnTime?.getSeconds()}
        </p>
      </div>
      {impression !== undefined ? (
        <div className="">
          <div className="flex flex-col gap-2 grow">
            <div className="flex flex-row ">
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
                <button className="btn btn-circle m-auto" onClick={onButtonRun}>
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
            {impression.config.items.map((item, key) => {
              return (
                <ImpressionConfigListItem
                  onDeleteClick={() => deleteItem(key)}
                  title={item.title}
                  selector={item.css_selector}
                  getAttributes={item.get_attributes}
                />
              );
            })}
          </>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default ImpressionBuildPage;
