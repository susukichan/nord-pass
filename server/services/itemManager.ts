import { passwords } from "../data";

const items = {};

export const updateItem = (item) => {
  items[item.id] = item;
};

export const getItems = () =>
  passwords.map((passwordItem) => ({
    ...(items[passwordItem.id] ?? passwordItem),
  }));
