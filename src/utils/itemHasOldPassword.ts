import { IItem } from "~/services/getUserItems";

const itemHasOldPassword = (item: IItem): boolean => {
  let thirtyDays = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return Date.parse(item.createdAt) < thirtyDays;
};

export default itemHasOldPassword;
