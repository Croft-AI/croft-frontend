import React, { SetStateAction, useEffect, useState } from "react";
import { IoRemoveSharp } from "react-icons/io5";
import { Impression } from "../../firebase/store/impressionHandler";
import { HTMLAttributes } from "../../helpers/types/ImpressionType";

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
  const [selector, setSelector] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [attributes, setAttributes] = useState<HTMLAttributes[]>([]);
  const onImpressionConfirm = () => {
    setImpression({
      ...impression,
      config: {
        ...impression.config,
        items: [
          ...impression.config.items,
          {
            css_selector: selector as string,
            title: title as string,
            get_attributes: attributes as HTMLAttributes[],
          },
        ],
      },
    });
    setAttributes([]);
    onConfirm();
  };

  const visible = isVisible ? "" : "hidden";
  const onCheck = (name: HTMLAttributes) => {
    if (attributes.includes(name)) {
      let thisArr = attributes.filter((item) => item !== name);
      setAttributes(thisArr);
    } else {
      setAttributes(attributes.concat([name]));
    }
  };
  useEffect(() => console.log(attributes), [attributes]);
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
          onSubmit={(e) => {
            e.preventDefault();
            setAttributes([]);
          }}
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
                onChange={(event) => setTitle(event.target.value)}
              />
              <label className="label text-sm text-secondary">
                <span className="label-text">CSS Selector / Selector Path</span>
              </label>
              <input
                type="text"
                className={"input input-bordered w-full mr-2 input-sm"}
                placeholder="Example: div.className"
                onChange={(event) => setSelector(event.target.value)}
              />
            </div>
            <div className="w-full px-4 m-auto">
              <p className="text-sm font-bold">Attributes to Include</p>
              <table className="mt-4 w-full ">
                <tr>
                  <td>href:</td>
                  <td>
                    <input
                      name="href"
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      onChange={(event) =>
                        onCheck(event.target.name as HTMLAttributes)
                      }
                    />
                  </td>
                  <td>id:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="id"
                      onChange={(event) =>
                        onCheck(event.target.name as HTMLAttributes)
                      }
                    />
                  </td>
                  <td>class:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="class"
                      onChange={(event) =>
                        onCheck(event.target.name as HTMLAttributes)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>src:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="src"
                      onChange={(event) =>
                        onCheck(event.target.name as HTMLAttributes)
                      }
                    />
                  </td>
                  <td>title:</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="title"
                      onChange={(event) =>
                        onCheck(event.target.name as HTMLAttributes)
                      }
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
            <button className="btn" onClick={onImpressionConfirm} type="reset">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ImpressionItemAdder;
