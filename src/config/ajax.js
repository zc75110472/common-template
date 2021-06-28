import axios from "axios";
import qs from "qs";
import Toast from "@/toast";
import { getUrlParam, parseQueryString } from "./util";
const methods = ["patch", "put", "post"];
methods.forEach((val) => {
  axios.defaults.headers[val]["Content-Type"] =
    "application/x-www-form-urlencoded; charset=UTF-8";
});
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "" : "";
axios.defaults.timeout = 1000 * 10;
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status == 500) {
      Toast.error("error", 2000);
    } else if (response.status == 404) {
      Toast.error("404", 2000);
    }
    return Promise.reject(error);
  }
);
export default axios;
