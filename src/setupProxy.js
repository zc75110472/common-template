const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/goods", "/sku", "/misc", "/m"], {
      target: "http://118.89.54.96:7203/", //配置你要代理请求的服务器地址 这是示例
      changeOrigin: true,
    })
  );
};
