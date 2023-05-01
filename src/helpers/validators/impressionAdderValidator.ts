import {
  HTMLAttributes,
  ImpressionConfigItemType,
} from "../types/ImpressionType";

export const isUrlValid = (url: string) => {
  try {
    new URL(url);
  } catch (err) {
    throw new Error("the URL that you've entered is not valid");
  }
};

export const isAttributeEmpty = (attributes: HTMLAttributes[]) => {
  console.log(attributes);
  if (attributes.length > 0) return;
  throw new Error("There must be at least one attribute selected!");
};

export const isValidSelector = (selector: string) => {
  try {
    document.createDocumentFragment().querySelector(selector);
  } catch (e) {
    throw new Error("The CSS selector that you've entered is not valid!");
  }
};

export const isTitleValid = (
  title: string,
  items: ImpressionConfigItemType[]
) => {
  if (items.every((currItem) => title !== currItem.title)) return;
  throw new Error(
    "You cannot use a repeated title! Please change to a unique title!"
  );
};
