export const uploadUrl =
  process.env.NODE_ENV === "production"
    ? "//image-upload2.mini1.cn/api/image/uploadWeb"
    : "//image-test.mini1.cn/api/image/uploadWeb";
// 获取url传参的值
export const getUrlParam = (url, parm) => {
  let reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)");
  let r = url.substr(url.indexOf("?") + 1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};
// 将url ? 键值对转为json对象
export const parseQueryString = (url) => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1],
      result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
};

/* 打点接口 */
let ress = parseQueryString(window.location.href);
let { uin, apiid, ver, country, lang } = ress;
/* 打点接口 */
export const reportLog = (options) => {
  // let url =
  //   process.env.NODE_ENV === "production"
  //     ? lang == 0
  //       ? "https://tj2.mini1.cn"
  //       : "https://tj_hk.mini1.cn"
  //     : "http://120.24.64.132:8080";
  let url =
    process.env.NODE_ENV === "production"
      ? "https://tj2.mini1.cn"
      : "http://120.24.64.132:8080";
  // let url = "http://120.24.64.132:8080";
  let opt = Object.assign(options, {
    v1: uin,
    v2: apiid,
    v3: ver || "",
    v4: country,
    v5: lang,
  });
  console.log(opt);
  let logImg = new Image();
  logImg.onload = logImg.onerror = function () {
    logImg = null;
  };
  // 格式化数据
  let str = "";
  for (var key in opt) {
    if (opt.hasOwnProperty(key)) {
      var element = opt[key];
      str += "&" + key + "=" + element;
    }
  }

  let logParams = str.substring(1);

  logImg.src = url + "/miniworld?" + logParams;
};
// 判断是否在游戏浏览器
export const isMiniWorldGame = /miniworldgame/gi.test(navigator.userAgent);
