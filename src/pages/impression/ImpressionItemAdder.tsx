import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoRemoveSharp } from "react-icons/io5";
import { Impression } from "../../firebase/store/impressionHandler";
import { HTMLAttributes } from "../../helpers/types/ImpressionType";
import {
  isAttributeEmpty,
  isTitleValid,
  isValidSelector,
} from "../../helpers/validators/impressionAdderValidator";
import {
  NotificationType,
  pushNotification,
} from "../../notifications/notificationPusher";

interface IImpressionItemAdder {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  impression: Impression;
  setImpression: React.Dispatch<SetStateAction<Impression | undefined>>;
}

const ImpressionItemAdder: React.FC<IImpressionItemAdder> = ({
  isVisible = false,
  onCancel,
  onConfirm,
  impression,
  setImpression,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data: any) => console.log(data);

  const onSubmit = (data: any) => {
    try {
      const { selector, attributes, title } = data;
      isValidSelector(selector as string);
      isAttributeEmpty(attributes);
      isTitleValid(title as string, impression.config.items);
      setImpression({
        ...impression,
        config: {
          ...impression.config,
          items: [
            ...impression.config.items,
            {
              css_selector: selector as string,
              title: title as string,
              get_attributes: data.attributes,
            },
          ],
        },
      });
      onConfirm();
    } catch (e) {
      pushNotification(
        NotificationType.ERROR,
        "Field Error:",
        (e as any).message
      );
    }
  };

  const visible = isVisible ? "" : "hidden";
  // const onCheck = (name: HTMLAttributes) => {
  //   if (attributes.includes(name)) {
  //     let thisArr = attributes.filter((item) => item !== name);
  //     setAttributes(thisArr);
  //   } else {
  //     setAttributes(attributes.concat([name]));
  //   }
  // };
  // useEffect(() => console.log(attributes), [attributes]);
  return (
    <div
      className={`w-full h-fit shadow ease-in duration-300 shadow-lg rounded-lg border border-2 p-4 flex flex-col gap-2 ${visible}`}
    >
      <div className="flex flex-row">
        <p className="font-bold flex-grow">Add Item</p>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>
          <IoRemoveSharp />
        </button>
      </div>
      <div className="h-fit flex flex-row gap-2 gap-2 ">
        <form
          className="w-full"
          action="none"
          method="none"
          onSubmit={handleSubmit(onSubmit)}
          // onSubmit={(e) => {

          // e.preventDefault();
          // setAttributes([]);
        >
          <div className="flex flex-row">
            <div className="border-r-2 w-full pr-4">
              <label className="label text-sm text-secondary">
                <span className="label-text">Item Title:</span>
              </label>
              <input
                type="text"
                className={"input input-bordered w-full mr-2 input-sm"}
                placeholder="Example: 'product_price'"
                {...register("title")}
              />
              <label className="label text-sm text-secondary">
                <span className="label-text">CSS Selector / Selector Path</span>
              </label>
              <input
                type="text"
                className={"input input-bordered w-full mr-2 input-sm"}
                placeholder="Example: div.className"
                // onChange={(event) => setSelector(event.target.value)}
                {...register("selector")}
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
                      // onChange={(event) =>
                      //   onCheck(event.target.name as HTMLAttributes)
                      // }
                      value={"href"}
                      {...register("attributes")}
                    />
                  </td>
                  <td>id:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      // name="id"
                      // onChange={(event) =>
                      //   onCheck(event.target.name as HTMLAttributes)
                      // }
                      value="id"
                      {...register("attributes")}
                    />
                  </td>
                  <td>class:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      value="class"
                      {...register("attributes")}
                      // onChange={(event) =>
                      //   onCheck(event.target.name as HTMLAttributes)
                      // }
                    />
                  </td>
                </tr>
                <tr>
                  <td>src:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      value="src"
                      {...register("attributes")}
                      // onChange={(event) =>
                      //   onCheck(event.target.name as HTMLAttributes)
                      // }
                    />
                  </td>
                  <td>title:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      value="title"
                      {...register("attributes")}
                      // onChange={(event) =>
                      //   onCheck(event.target.name as HTMLAttributes)
                      // }
                    />
                  </td>
                  <td>text:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      value="text"
                      {...register("attributes")}
                      // onChange={(event) =>
                      //   onCheck(event.target.name as HTMLAttributes)
                      // }
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
            <button className="btn btn-ghost" type="reset">
              Clear
            </button>
            <button className="btn" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ImpressionItemAdder;
