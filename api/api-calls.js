import { apiRequester } from "./api";
import { GET_ITEMS_PATH } from "./constants";

export const getItems = () => {
  return apiRequester.request(GET_ITEMS_PATH);
};
