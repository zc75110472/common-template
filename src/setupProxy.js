/*
 * @Author: zhang_chun
 * @Date: 2020-11-17 15:45:01
 * @LastEditTime: 2021-03-29 14:11:59
 * @FilePath: \drawcanvas\src\setupProxy.js
 */
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/goods", "/sku", "/misc", "/m"], {
      target: "", //配置你要代理请求的服务器地址
      changeOrigin: true,
    })
  );
};
