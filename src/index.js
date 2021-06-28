/*
 * @Author: zhang_chun
 * @Date: 2020-11-17 15:11:32
 * @LastEditTime: 2021-03-15 10:05:55
 * @FilePath: \drawcanvas\src\index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import "@/assets/common/reset.scss";
import $http from "@/config/http";
import App from "./App";
React.$http = $http;
ReactDOM.render(<App />, document.getElementById("root"));
