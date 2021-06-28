const {
  override,
  addPostcssPlugins,
  setWebpackPublicPath,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//生产环境去除console.* functions
const dropConsole = () => {
  return (config) => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === "TerserPlugin") {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    return config;
  };
};
const addCustom = () => (config) => {
  let plugins = [];
  config.devtool =
    process.env.NODE_ENV === "production" ? false : "inline-source-map";
  config.plugins = [...config.plugins, ...plugins];
  config.optimization.splitChunks = {
    cacheGroups: {
      // 其次: 打包业务中公共代码
      common: {
        name: "common",
        chunks: "all",
        minSize: 1,
        priority: 0,
      },
      // 首先: 打包node_modules中的文件
      vender: {
        name: "vendor",
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
        priority: 10,
      },
    },
  };
  if (process.env.NODE_ENV === "production") {
    config.externals = {
      react: "React",
      "react-dom": "ReactDOM",
      axios: "axios",
    };
  }
  /* image图片 */
  config.module.rules[1].oneOf.splice(0, 1, {
    test: /\.(png|jpg|svg|gif|bmp|jpeg)$/,
    use: [
      {
        loader: require.resolve("url-loader"),
        options: {
          limit: 2000,
          outputPath: "static", // 设置打包后图片存放的文件夹名称,
          name: "images/[name].[hash:8].[ext]",
        },
      },
    ],
  });
  return config;
};
module.exports = {
  webpack: override(
    dropConsole(),
    addCustom(),
    addWebpackAlias({
      //路径别名
      "@": path.resolve(__dirname, "src"),
    }),
    process.env.REACT_APP_FROM === "h5"
      ? addPostcssPlugins([
          require("postcss-pxtorem")({
            rootValue: 133.4,
            propList: ["*"],
            selectorBlackList: [".pc-", ".Toastify__"], //（数组）要忽略的选择器并保留为px。
            minPixelValue: 2, // （数字）设置要替换的最小像素值
          }),
        ])
      : "",
      // 修改 publicPath
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_FROM === "pc"
        ? setWebpackPublicPath(
            "线上地址"
          )
        : setWebpackPublicPath(
            ""
          )
      : ""
  ),
};
