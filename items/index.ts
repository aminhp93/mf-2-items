// get list all items in folder ./items useing require.context
// https://webpack.js.org/guides/dependency-management/#requirecontext
import { cacheItems, getItems, getItem } from "@/utils/cacheItems";
import { createAssetsStructure } from "@/utils/createAssetsStructure";

cacheItems(require.context("../items", true, /^(?!.*.test.tsx$).*\.tsx$/));
const items = getItems();
console.log("items", items);

export default {
  cacheItems,
  getItems,
  getItem,
  createAssetsStructure,
};
