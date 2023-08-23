(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"尾巴翘","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 10:
/*!*******************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/api/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _es6Promise = _interopRequireDefault(__webpack_require__(/*! ../promise/es6-promise */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var http = __webpack_require__(/*! ../service.js */ 25);

module.exports = {
  /** -----------------------用户信息start--------------------- */
  // 微信login接口做注册和登录
  login: function login() {
    return http.get.apply(http, ["/user/login"].concat(Array.prototype.slice.call(arguments)));
  },
  // 获取当前用户信息
  getUserInfo: function getUserInfo() {
    return http.get('/user/getUserBasicInfo');
  },

  /**
      * 更新微信用户信息，包括用户的头像、昵称等,wx.getUserProfile 用户确认调用此接口
      * @param "imageIds": [],
               "phone": "",
               "wxNumber": ""
      * @returns
      */
  updateUserBasicInfo: function updateUserBasicInfo(params) {
    return http.post('/user/updateUserBasicInfo', params);
  },
  /* 获取关注列表
      * userId
      */
  getUserFocus: function getUserFocus(params) {
    return http.get('/user/focus', params);
  },
  /**
      * 获取用户主页信息，当userId不传时就为当前用户信息
      * userId
      */
  getUserHomeInfo: function getUserHomeInfo(params) {
    return http.get('/user/getUserHomeInfo', params);
  },
  /**
      * 更新微信用户信息，包括用户的头像、昵称等,wx.getUserProfile 用户确认调用此接口
      * @param encryptedData	加密数据		false	 string
               iv	加密向量		false	 string
               rawData	原始数据		false	 string
               signature	签名		false	 string
      * @returns 
      */
  updateProfile: function updateProfile(params) {
    return http.post('/user/updateProfile', params);
  },

  // 关注用户
  userFocus: function userFocus() {
    return http.get.apply(http, ['/user/focus'].concat(Array.prototype.slice.call(arguments)));
  },
  /** -----------------------用户信息end--------------------- */

  /** -----------------------其他start--------------------- */
  // 获取视频
  getHomeVideo: function getHomeVideo() {
    return http.get.apply(http, ['/home/next'].concat(Array.prototype.slice.call(arguments)));
  },
  /** -----------------------其他end--------------------- */

  /** -----------------------其他start 关于领养--------------------- */
  // 领养申请
  applyAdopt: function applyAdopt() {
    return http.post.apply(http, ['/adoptApply/apply'].concat(Array.prototype.slice.call(arguments)));
  },

  // 通过领养申请号，获取领养单详情
  applyAdoptDetail: function applyAdoptDetail() {
    return http.get.apply(http, ['/adoptApply/get'].concat(Array.prototype.slice.call(arguments)));
  },

  // 
  getAdoptListOnBase: function getAdoptListOnBase() {
    return http.post.apply(http, ['/adoptApply/getBaseApplies'].concat(Array.prototype.slice.call(arguments)));
  },
  // 
  /** -----------------------其他end--------------------- */




  testPost: function testPost() {
    return http.post.apply(http, ['/post/url'].concat(Array.prototype.slice.call(arguments)));
  },
  testGet: function testGet() {
    return http.get.apply(http, ['/get/url'].concat(Array.prototype.slice.call(arguments)));
  } };

/***/ }),

/***/ 11:
/*!*****************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _promise = _interopRequireDefault(__webpack_require__(/*! ./es6-promise/promise */ 12));
var _polyfill = _interopRequireDefault(__webpack_require__(/*! ./es6-promise/polyfill */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Strange compat..
_promise.default.polyfill = _polyfill.default;
_promise.default.Promise = _promise.default;var _default =
_promise.default;exports.default = _default;

/***/ }),

/***/ 116:
/*!***********************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/vod-wx-sdk-v2.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (e, a) {for (var i in a) {e[i] = a[i];}})(exports, /******/function (modules) {// webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/}
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/}
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/}
    /******/};
  /******/
  /******/ // define __esModule on exports
  /******/__webpack_require__.r = function (exports) {
    /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/}
    /******/Object.defineProperty(exports, '__esModule', { value: true });
    /******/};
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/__webpack_require__.t = function (value, mode) {
    /******/if (mode & 1) value = __webpack_require__(value);
    /******/if (mode & 8) return value;
    /******/if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/var ns = Object.create(null);
    /******/__webpack_require__.r(ns);
    /******/Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/if (mode & 2 && typeof value != 'string') for (var key in value) {__webpack_require__.d(ns, key, function (key) {return value[key];}.bind(null, key));}
    /******/return ns;
    /******/};
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {return module['default'];} :
    /******/function getModuleExports() {return module;};
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/};
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {return Object.prototype.hasOwnProperty.call(object, property);};
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}

  function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}

  function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

  function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

  function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}

  function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

  function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}

  function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}

  function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}

  function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}

  function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}

  function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}

  function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}

  function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

  var COS = __webpack_require__(1);

  var vodUtil = __webpack_require__(2);

  var _require = __webpack_require__(3),
  UploaderEvent = _require.UploaderEvent;

  var _require2 = __webpack_require__(4),
  EventEmitter = _require2.EventEmitter;

  var COS_REGION_KEY = "COS_REGION_KEY";

  var _require3 = __webpack_require__(5),
  VodReporter = _require3.VodReporter,
  reportEvent = _require3.reportEvent;

  function raceRequest(options) {
    return new Promise(function (resolve, reject) {
      wx.request({
        method: "HEAD",
        url: "https://" + options.domain,
        success: function success(result) {
          resolve(options.region);
        },
        fail: function fail(result) {
          if (vodUtil.isFunction(self.error)) {
            self.error(result);
          }
        } });

    });
  }

  var Uploader = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Uploader, _EventEmitter);

    var _super = _createSuper(Uploader);

    function Uploader(opts) {
      var _this;

      _classCallCheck(this, Uploader);

      _this = _super.call(this);

      _defineProperty(_assertThisInitialized(_this), "retryCommitNum", 3);

      _defineProperty(_assertThisInitialized(_this), "retryApplyNum", 3);

      _defineProperty(_assertThisInitialized(_this), "retryPrepareNum", 3);

      var self = _assertThisInitialized(_this);

      if (vodUtil.getType(opts) !== "object") {
        throw new Error("opts must be a object");
      }

      self.appId = opts.appId || undefined;
      self.taskId = undefined;
      self.cos = undefined;
      var videoFile;

      if (opts.mediaFile) {
        // alias
        videoFile = opts.mediaFile;
      } else {
        videoFile = opts.videoFile;
      }

      if (!videoFile) {
        throw new Error("need `mediaFile` param");
      }

      self.fileKey = videoFile.tempFilePath.replace(/^.*?([^/]{32}\.\w+)$/, "$1");

      if (opts.mediaName) {
        // alias
        self.fileName = opts.mediaName;
      } else {
        self.fileName = opts.fileName;
      }

      var coverFile = opts.coverFile;
      self.videoFileMessage = vodUtil.getFileMessage(videoFile, self.fileName);

      if (coverFile) {
        coverFile.tempFilePath = coverFile.tempFilePaths[0];
        coverFile.size = coverFile.tempFiles[0].size;
        self.coverFileMessage = vodUtil.getFileMessage(coverFile, self.fileName);
        self.fileKey = coverFile.tempFilePath.replace(/^.*?([^/]{32}\.\w+)$/, "$1");
      }

      self.reportId = opts.reportId || "";
      self.getSignature = opts.getSignature; // self.success = opts.success;

      self.error = opts.error;
      self.progress = opts.progress;
      self.finish = opts.finish;

      if (!self.getSignature) {
        throw new Error("need `getSignature` param");
      }

      if (!vodUtil.isFunction(self.getSignature) || // !vodUtil.isFunction(self.success) ||
      !vodUtil.isFunction(self.error) || !vodUtil.isFunction(self.progress) || !vodUtil.isFunction(self.finish)) {
        throw new Error("getSignature, error, progress, finish must be a Function.");
      } // 网络状态变化时重新竞速获取最优 storeRegion
      // wx.onNetworkStatusChange((res) => {
      //   if (res.isConnected) {
      //     this.requestRegion();
      //   }
      // });


      return _this;
    }

    _createClass(Uploader, [{
      key: "setStorage",
      value: function setStorage(name, val) {
        wx.setStorageSync("wp_ugc_" + name, val);
      } },
    {
      key: "getStorage",
      value: function getStorage(name) {
        try {
          var val = wx.getStorageSync("wp_ugc_" + name);
          return val;
        } catch (e) {
          return "";
        }
      } },
    {
      key: "delStorage",
      value: function delStorage(name) {
        wx.removeStorageSync("wp_ugc_" + name);
      } },
    {
      key: "regionRace",
      value: function regionRace(cosRegionList, cb) {
        Promise.race(cosRegionList.map(function (item) {
          return raceRequest(item);
        })).then(function (res) {
          wx.setStorageSync(COS_REGION_KEY, res); // report target region obtain from prepare

          if (cb) {
            cb(res);
          }
        });
      } },
    {
      key: "requestRegion",
      value: function requestRegion(callback) {
        var self = this;
        self.getSignature(function (signature) {
          self.signature = signature;
          var sendParams = {
            signature: signature };

          var requestStartTime = Date.now();
          wx.request({
            method: "POST",
            url: "https://vod2.qcloud.com/v3/index.php?Action=PrepareUploadUGC",
            data: sendParams,
            dataType: "json",
            success: function success(result) {
              if (result.data.code === 0) {
                self.appId = self.appId || result.data.data.appId;
                self.regionRace(result.data.data.cosRegionList, function (res) {
                  self.emit(reportEvent.report_prepare, {
                    data: {
                      region: res },

                    requestStartTime: requestStartTime });

                  callback(res);
                });
              } else {
                // eslint-disable-next-line no-lonely-if
                if (self.retryPrepareNum > 0) {
                  self.emit(reportEvent.report_prepare, {
                    err: result.data,
                    requestStartTime: requestStartTime });

                  self.retryPrepareNum -= 1;
                  self.requestRegion(callback);
                } else {
                  // eslint-disable-next-line no-lonely-if
                  if (vodUtil.isFunction(self.error)) {
                    self.error(result);
                  }
                }
              }
            },
            fail: function fail(result) {
              if (vodUtil.isFunction(self.error)) {
                self.error(result);
              }
            } });

        });
      } },
    {
      key: "getStoreRegion",
      value: function getStoreRegion(callback) {
        var self = this;

        try {
          var region = wx.getStorageSync(COS_REGION_KEY);

          if (!region) {
            throw new Error("no storage");
          }

          return callback(region);
        } catch (e) {
          self.requestRegion(callback);
        }
      } },
    {
      key: "start",
      value: function start() {
        var self = this; // self.getStoreRegion((region) => {
        // });

        self.applyUpload(function (result) {
          self.uploadFile(result, function () {
            self.commitUpload();
          });
        });
      } },
    {
      key: "cancel",
      value: function cancel() {
        this.cos.cancelTask(this.taskId);
      } },
    {
      key: "pause",
      value: function pause() {
        this.cos.pauseTask(this.taskId);
      } },
    {
      key: "restart",
      value: function restart() {
        this.cos.restartTask(this.taskId);
      } },
    {
      key: "applyUpload",
      value: function applyUpload(callback) {
        var self = this;
        self.getSignature(function (signature) {
          self.signature = signature;
          var sessionKey = self.getStorage(self.fileKey);
          var sendParams;

          if (sessionKey) {
            sendParams = {
              signature: signature,
              vodSessionKey: sessionKey };

          } else {
            sendParams = {
              signature: signature,
              videoName: self.videoFileMessage.name,
              videoType: self.videoFileMessage.type // videoSize: self.videoFileMessage.size,
            };

          }

          if (self.coverFileMessage) {
            // upload video together with cover
            sendParams.coverName = self.coverFileMessage.name;
            sendParams.coverType = self.coverFileMessage.type; // sendParams.coverSize = self.coverFileMessage.size;
          }

          var requestStartTime = Date.now();
          wx.request({
            method: "POST",
            url: "https://vod2.qcloud.com/v3/index.php?Action=ApplyUploadUGC",
            data: sendParams,
            dataType: "json",
            success: function success(result) {
              if (result.data.code === 0) {
                self.appId = self.appId || result.data.data.appId;
                self.emit(reportEvent.report_apply, {
                  data: sendParams,
                  requestStartTime: requestStartTime });

                self.vodSessionKey = result.data.data.vodSessionKey;
                self.setStorage(self.fileKey, self.vodSessionKey);
                callback(result);
              } else {
                // eslint-disable-next-line no-lonely-if
                if (self.retryApplyNum > 0) {
                  self.emit(reportEvent.report_apply, {
                    err: result.data,
                    requestStartTime: requestStartTime });

                  self.retryApplyNum -= 1;
                  self.applyUpload(callback);
                } else {
                  // eslint-disable-next-line no-lonely-if
                  if (vodUtil.isFunction(self.error)) {
                    self.error(result);
                  }
                }
              }
            },
            fail: function fail(result) {
              if (vodUtil.isFunction(self.error)) {
                self.error(result);
              }
            } });

        });
      } },
    {
      key: "uploadFile",
      value: function uploadFile(result, cb) {
        var self = this;
        var applyData = result.data.data;
        var cos = new COS({
          getAuthorization: function getAuthorization(options, callback) {
            callback({
              TmpSecretId: applyData.tempCertificate.secretId,
              TmpSecretKey: applyData.tempCertificate.secretKey,
              XCosSecurityToken: applyData.tempCertificate.token,
              StartTime: applyData.timestamp,
              ExpiredTime: applyData.tempCertificate.expiredTime });

          } });

        cos.on("before-send", function (opt) {
          var url = opt.url;
          var u = url.match(/^(https?:\/\/([^\/]+)\/)([^\/]*\/?)(.*)$/);
          opt.url = url.replace(u[2], "vod2.qcloud.com");
          opt.headers["Vod-Forward-Cos"] = u[2];
        });
        this.cos = cos;
        var cosCommonParam = {
          bucket: "".concat(applyData.storageBucket, "-").concat(applyData.storageAppId),
          region: applyData.storageRegionV5 };

        var uploadCosParams = [];

        if (this.videoFileMessage) {
          var cosVideoParam = _objectSpread(_objectSpread({}, cosCommonParam), {}, {
            filePath: this.videoFileMessage.tempFilePath,
            fileSize: this.videoFileMessage.size,
            key: applyData.video.storagePath,
            onProgress: function onProgress(info) {
              if (vodUtil.isFunction(self.progress)) {
                self.progress(info);
              }
            },
            // onProgress: function onProgress(data) {
            //   self.emit(UploaderEvent.video_progress, data);
            //   self.emit(UploaderEvent.media_progress, data);
            // },
            onTaskReady: function onTaskReady(taskId) {
              self.taskId = taskId;
            } });


          uploadCosParams.push(cosVideoParam);
        }

        if (this.coverFileMessage) {
          var cosCoverParam = _objectSpread(_objectSpread({}, cosCommonParam), {}, {
            fileSize: this.coverFileMessage.size,
            filePath: this.coverFileMessage.tempFilePath,
            key: applyData.cover.storagePath,
            onTaskReady: vodUtil.noop,
            onProgress: vodUtil.noop // cover don't need progress
            // onProgress: function onProgress(data) {
            //   self.emit(UploaderEvent.cover_progress, data);
            // }
          });


          uploadCosParams.push(cosCoverParam);
        }

        var uploadPromises = uploadCosParams.map(function (uploadCosParam) {
          return new Promise(function (resolve, reject) {
            var requestStartTime = Date.now();
            cos.sliceUploadFile( // cos.postObject(
            {
              Bucket: uploadCosParam.bucket,
              Region: uploadCosParam.region,
              Key: uploadCosParam.key,
              FilePath: uploadCosParam.filePath,
              FileSize: uploadCosParam.fileSize,
              onProgress: uploadCosParam.onProgress,
              onTaskReady: uploadCosParam.onTaskReady },
            function (err, data) {
              if (err) {
                // when fails
                if (uploadCosParam.filePath === self.videoFileMessage.tempFilePath) {
                  self.emit(reportEvent.report_cos_upload, {
                    err: err,
                    requestStartTime: requestStartTime });

                }

                if (vodUtil.isFunction(self.error)) {
                  var error = err.error;
                  var errObj = error && error.Code ? {
                    code: error.Code,
                    message: error.Message || error.message,
                    reqid: error.RequestId || undefined } :
                  {
                    code: err.statusCode || -2,
                    message: "cos error" };

                  self.error(errObj);
                }

                reject();
                return;
              } // when succeeds
              // if (vodUtil.isFunction(self.success)) {
              //   self.success(data);
              // }


              resolve();
            });
          });
        });
        Promise.all(uploadPromises).then(function () {
          cb();
        });
      } },
    {
      key: "commitUpload",
      value: function commitUpload() {
        var self = this;
        var sendParam = {
          signature: this.signature,
          vodSessionKey: this.vodSessionKey };

        var requestStartTime = Date.now();
        wx.request({
          method: "POST",
          url: "https://vod2.qcloud.com/v3/index.php?Action=CommitUploadUGC",
          data: sendParam,
          dataType: "json",
          success: function success(result) {
            if (result.data.code === 0) {
              self.emit(reportEvent.report_commit, {
                data: result.data.data,
                requestStartTime: requestStartTime });

              var res = result.data.data;

              if (vodUtil.isFunction(self.finish)) {
                self.finish({
                  fileId: res.fileId,
                  videoName: self.videoFileMessage.name,
                  videoUrl: res.video && res.video.url,
                  coverUrl: res.cover && res.cover.url });

              }

              self.delStorage(self.fileKey);
            } else {
              // eslint-disable-next-line no-lonely-if
              self.emit(reportEvent.report_commit, {
                err: result.data,
                requestStartTime: requestStartTime });


              if (self.retryCommitNum > 0) {
                self.retryCommitNum -= 1;
                self.commitUpload();
              } else {
                // eslint-disable-next-line no-lonely-if
                if (vodUtil.isFunction(self.error)) {
                  self.error(result);
                }
              }
            }
          },
          fail: function fail(result) {
            if (vodUtil.isFunction(self.error)) {
              self.error(result);
            }
          } });

      } }]);


    return Uploader;
  }(EventEmitter);

  module.exports = {
    start: function start(params) {
      try {
        var uploader = new Uploader(params);
        new VodReporter(uploader);
        uploader.start();
        return uploader;
      } catch (e) {
        if (vodUtil.isFunction(params.error)) {
          params.error({
            code: -1,
            message: e.message });

        } else {
          throw e;
        }
      }
    } };


  /***/},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  !function (e, t) {
    true ? module.exports = t() : undefined;
  }("undefined" != typeof self ? self : this, function () {
    return function (e) {
      function t(i) {
        if (n[i]) return n[i].exports;
        var a = n[i] = {
          i: i,
          l: !1,
          exports: {} };

        return e[i].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
      }

      var n = {};
      return t.m = e, t.c = n, t.d = function (e, n, i) {
        t.o(e, n) || Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: i });

      }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
          return e.default;
        } : function () {
          return e;
        };
        return t.d(n, "a", n), n;
      }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, t.p = "D:\\code\\cos-wx-sdk-v5\\demo\\lib", t(t.s = 6);
    }([function (e, t, n) {
      "use strict";

      (function (t) {
        function i(e) {
          return encodeURIComponent(e).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
        }

        function a(e) {
          return u(e, function (e) {
            return "object" == typeof e ? a(e) : e;
          });
        }

        function o(e, t, n) {
          return e && t in e ? e[t] : n;
        }

        function r(e, t) {
          return p(t, function (n, i) {
            e[i] = t[i];
          }), e;
        }

        function s(e) {
          return e instanceof Array;
        }

        function c(e, t) {
          for (var n = !1, i = 0; i < e.length; i++) {if (t === e[i]) {
              n = !0;
              break;
            }}

          return n;
        }

        function l(e) {
          return s(e) ? e : [e];
        }

        function p(e, t) {
          for (var n in e) {e.hasOwnProperty(n) && t(e[n], n);}
        }

        function u(e, t) {
          var n = s(e) ? [] : {};

          for (var i in e) {e.hasOwnProperty(i) && (n[i] = t(e[i], i));}

          return n;
        }

        function d(e, t) {
          var n = s(e),
          i = n ? [] : {};

          for (var a in e) {e.hasOwnProperty(a) && t(e[a], a) && (n ? i.push(e[a]) : i[a] = e[a]);}

          return i;
        }

        var m = n(8),
        f = n(11),
        h = n(12),
        g = n(15),
        v = n(3),
        x = v.btoa,
        y = wx.getFileSystemManager(),
        C = function C(e) {
          e = e || {};
          var t,
          n = e.SecretId,
          o = e.SecretKey,
          r = e.KeyTime,
          s = (e.method || e.Method || "get").toLowerCase(),
          c = a(e.Query || e.params || {}),
          l = a(e.Headers || e.headers || {}),
          p = e.Key || "";
          if (e.UseRawKey ? t = e.Pathname || e.pathname || "/" + p : (t = e.Pathname || e.pathname || p, 0 !== t.indexOf("/") && (t = "/" + t)), !n) return console.error("missing param SecretId");
          if (!o) return console.error("missing param SecretKey");

          var u = function u(e, t) {
            var n = [];

            for (var a in e) {e.hasOwnProperty(a) && n.push(t ? i(a).toLowerCase() : a);}

            return n.sort(function (e, t) {
              return e = e.toLowerCase(), t = t.toLowerCase(), e === t ? 0 : e > t ? 1 : -1;
            });
          },
          d = function d(e) {
            var t,
            n,
            a,
            o = [],
            r = u(e);

            for (t = 0; t < r.length; t++) {n = r[t], a = void 0 === e[n] || null === e[n] ? "" : "" + e[n], n = i(n).toLowerCase(), a = i(a) || "", o.push(n + "=" + a);}

            return o.join("&");
          },
          m = Math.round(N(e.SystemClockOffset) / 1e3) - 1,
          h = m,
          g = e.Expires || e.expires;

          h += void 0 === g ? 900 : 1 * g || 0;
          var v = n,
          x = r || m + ";" + h,
          y = r || m + ";" + h,
          C = u(l, !0).join(";").toLowerCase(),
          k = u(c, !0).join(";").toLowerCase(),
          b = f.HmacSHA1(y, o).toString(),
          S = [s, t, d(c), d(l), ""].join("\n"),
          R = ["sha1", x, f.SHA1(S).toString(), ""].join("\n");
          return ["q-sign-algorithm=sha1", "q-ak=" + v, "q-sign-time=" + x, "q-key-time=" + y, "q-header-list=" + C, "q-url-param-list=" + k, "q-signature=" + f.HmacSHA1(R, b).toString()].join("&");
        },
        k = function k() {},
        b = function b(e) {
          var t = {};

          for (var n in e) {e.hasOwnProperty(n) && void 0 !== e[n] && null !== e[n] && (t[n] = e[n]);}

          return t;
        },
        S = function S(e, t, n, i) {
          e ? y.readFile({
            filePath: e,
            position: t,
            length: n - t,
            success: function success(e) {
              i(e.data);
            },
            fail: function fail() {
              i(null);
            } }) :
          i(null);
        },
        R = function R(e, t, n) {
          n = n || k, e && t && t instanceof ArrayBuffer ? j.getFileMd5(t, function (e, t) {
            n(t);
          }) : n();
        },
        w = function w(e, t) {
          var n = m(e);
          return t && t(n), n;
        },
        _ = function _(e) {
          var t,
          n,
          i,
          a = "";

          for (t = 0, n = e.length / 2; t < n; t++) {i = parseInt(e[2 * t] + e[2 * t + 1], 16), a += String.fromCharCode(i);}

          return x(a);
        },
        A = function A() {
          var e = function e() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
          };

          return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
        },
        T = function T(e, t) {
          var n = t.Bucket,
          i = t.Region,
          a = t.Key;

          if (e.indexOf("Bucket") > -1 || "deleteMultipleObject" === e || "multipartList" === e || "listObjectVersions" === e) {
            if (!n) return "Bucket";
            if (!i) return "Region";
          } else if (e.indexOf("Object") > -1 || e.indexOf("multipart") > -1 || "sliceUploadFile" === e || "abortUploadTask" === e) {
            if (!n) return "Bucket";
            if (!i) return "Region";
            if (!a) return "Key";
          }

          return !1;
        },
        E = function E(e, t) {
          if (t = r({}, t), "getAuth" !== e && "getV4Auth" !== e && "getObjectUrl" !== e) {
            var n = t.Headers || {};

            if (t && "object" == typeof t) {
              !function () {
                for (var e in t) {t.hasOwnProperty(e) && e.indexOf("x-cos-") > -1 && (n[e] = t[e]);}
              }();
              var i = {
                "x-cos-mfa": "MFA",
                "Content-MD5": "ContentMD5",
                "Content-Length": "ContentLength",
                "Content-Type": "ContentType",
                Expect: "Expect",
                Expires: "Expires",
                "Cache-Control": "CacheControl",
                "Content-Disposition": "ContentDisposition",
                "Content-Encoding": "ContentEncoding",
                Range: "Range",
                "If-Modified-Since": "IfModifiedSince",
                "If-Unmodified-Since": "IfUnmodifiedSince",
                "If-Match": "IfMatch",
                "If-None-Match": "IfNoneMatch",
                "x-cos-copy-source": "CopySource",
                "x-cos-copy-source-Range": "CopySourceRange",
                "x-cos-metadata-directive": "MetadataDirective",
                "x-cos-copy-source-If-Modified-Since": "CopySourceIfModifiedSince",
                "x-cos-copy-source-If-Unmodified-Since": "CopySourceIfUnmodifiedSince",
                "x-cos-copy-source-If-Match": "CopySourceIfMatch",
                "x-cos-copy-source-If-None-Match": "CopySourceIfNoneMatch",
                "x-cos-acl": "ACL",
                "x-cos-grant-read": "GrantRead",
                "x-cos-grant-write": "GrantWrite",
                "x-cos-grant-full-control": "GrantFullControl",
                "x-cos-grant-read-acp": "GrantReadAcp",
                "x-cos-grant-write-acp": "GrantWriteAcp",
                "x-cos-storage-class": "StorageClass",
                "x-cos-server-side-encryption-customer-algorithm": "SSECustomerAlgorithm",
                "x-cos-server-side-encryption-customer-key": "SSECustomerKey",
                "x-cos-server-side-encryption-customer-key-MD5": "SSECustomerKeyMD5",
                "x-cos-server-side-encryption": "ServerSideEncryption",
                "x-cos-server-side-encryption-cos-kms-key-id": "SSEKMSKeyId",
                "x-cos-server-side-encryption-context": "SSEContext" };

              j.each(i, function (e, i) {
                void 0 !== t[e] && (n[i] = t[e]);
              }), t.Headers = b(n);
            }
          }

          return t;
        },
        B = function B(e, n) {
          return function (i, a) {
            var o = this;
            "function" == typeof i && (a = i, i = {}), i = E(e, i);

            var r = function r(e) {
              return e && e.headers && (e.headers["x-cos-version-id"] && (e.VersionId = e.headers["x-cos-version-id"]), e.headers["x-cos-delete-marker"] && (e.DeleteMarker = e.headers["x-cos-delete-marker"])), e;
            },
            s = function s(e, t) {
              a && a(r(e), r(t));
            },
            c = function () {
              if ("getService" !== e && "abortUploadTask" !== e) {
                var t = T(e, i);
                if (t) return "missing param " + t;

                if (i.Region) {
                  if (i.Region.indexOf("cos.") > -1) return 'param Region should not be start with "cos."';
                  if (!/^([a-z\d-]+)$/.test(i.Region)) return "Region format error.";
                  o.options.CompatibilityMode || -1 !== i.Region.indexOf("-") || "yfb" === i.Region || "default" === i.Region || console.warn("warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224");
                }

                if (i.Bucket) {
                  if (!/^([a-z\d-]+)-(\d+)$/.test(i.Bucket)) if (i.AppId) i.Bucket = i.Bucket + "-" + i.AppId;else {
                    if (!o.options.AppId) return 'Bucket should format as "test-1250000000".';
                    i.Bucket = i.Bucket + "-" + o.options.AppId;
                  }
                  i.AppId && (console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).'), delete i.AppId);
                }

                i.Key && "/" === i.Key.substr(0, 1) && (i.Key = i.Key.substr(1));
              }
            }(),
            l = "getAuth" === e || "getObjectUrl" === e,
            p = t.Promise;

            if (!l && p && !a) return new p(function (e, t) {
              if (a = function a(n, i) {
                n ? t(n) : e(i);
              }, c) return s({
                error: c });

              n.call(o, i, s);
            });
            if (c) return s({
              error: c });

            var u = n.call(o, i, s);
            return l ? u : void 0;
          };
        },
        O = function O(e, t) {
          function n() {
            if (a = 0, t && "function" == typeof t) {
              i = Date.now();
              var n,
              o = Math.max(0, Math.round((s - r) / ((i - c) / 1e3) * 100) / 100) || 0;
              n = 0 === s && 0 === e ? 1 : Math.floor(s / e * 100) / 100 || 0, c = i, r = s;

              try {
                t({
                  loaded: s,
                  total: e,
                  speed: o,
                  percent: n });

              } catch (e) {}
            }
          }

          var i,
          a,
          o = this,
          r = 0,
          s = 0,
          c = Date.now();
          return function (t, i) {
            if (t && (s = t.loaded, e = t.total), i) clearTimeout(a), n();else {
              if (a) return;
              a = setTimeout(n, o.options.ProgressInterval);
            }
          };
        },
        D = function D(e, t, n) {
          "postObject" === e ? n() : "putObject" === e ? void 0 !== t.Body ? (t.ContentLength = t.Body.byteLength, n(null, t.ContentLength)) : n({
            error: "missing param Body" }) :
          t.FilePath ? y.stat({
            path: t.FilePath,
            success: function success(e) {
              var i = e.stats;
              t.FileStat = i, t.FileStat.FilePath = t.FilePath;
              var a = i.isDirectory() ? 0 : i.size;
              t.ContentLength = a = a || 0, n(null, a);
            },
            fail: function fail(e) {
              n(e);
            } }) :
          n({
            error: "missing param FilePath" });

        },
        N = function N(e) {
          return Date.now() + (e || 0);
        },
        I = function I(e, t) {
          e = e.split("."), t = t.split(".");

          for (var n = Math.max(e.length, t.length); e.length < n;) {e.push("0");}

          for (; t.length < n;) {t.push("0");}

          for (var i = 0; i < n; i++) {
            var a = parseInt(e[i]),
            o = parseInt(t[i]);
            if (a > o) return 1;
            if (a < o) return -1;
          }

          return 0;
        },
        P = function () {
          var e = wx.getSystemInfoSync(),
          t = I(e.SDKVersion, "2.10.0") >= 0,
          n = !t && "devtools" === e.platform;
          return function () {
            return n && console.warn("\u5F53\u524D\u5C0F\u7A0B\u5E8F\u7248\u672C\u5C0F\u4E8E 2.10.0\uFF0C\u4E0D\u652F\u6301\u5206\u7247\u4E0A\u4F20\uFF0C\u8BF7\u66F4\u65B0\u8F6F\u4EF6\u3002"), n = !1, t;
          };
        }(),
        j = {
          noop: k,
          formatParams: E,
          apiWrapper: B,
          xml2json: h,
          json2xml: g,
          md5: m,
          clearKey: b,
          fileSlice: S,
          getBodyMd5: R,
          getFileMd5: w,
          binaryBase64: _,
          extend: r,
          isArray: s,
          isInArray: c,
          makeArray: l,
          each: p,
          map: u,
          filter: d,
          clone: a,
          attr: o,
          uuid: A,
          camSafeUrlEncode: i,
          throttleOnProgress: O,
          getFileSize: D,
          getSkewTime: N,
          getAuth: C,
          compareVersion: I,
          canFileSlice: P };


        e.exports = j;
      }).call(t, n(1));
    }, function (e, t) {
      var n;

      n = function () {
        return this;
      }();

      try {
        n = n || Function("return this")() || (0, eval)("this");
      } catch (e) {
        "object" == typeof window && (n = window);
      }

      e.exports = n;
    }, function (e, t) {
      function n(e, t) {
        for (var n in e) {t[n] = e[n];}
      }

      function i(e, t) {
        function i() {}

        var a = e.prototype;

        if (Object.create) {
          var o = Object.create(t.prototype);
          a.__proto__ = o;
        }

        a instanceof t || (i.prototype = t.prototype, i = new i(), n(a, i), e.prototype = a = i), a.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), a.constructor = e);
      }

      function a(e, t) {
        if (t instanceof Error) var n = t;else n = this, Error.call(this, ae[e]), this.message = ae[e], Error.captureStackTrace && Error.captureStackTrace(this, a);
        return n.code = e, t && (this.message = this.message + ": " + t), n;
      }

      function o() {}

      function r(e, t) {
        this._node = e, this._refresh = t, s(this);
      }

      function s(e) {
        var t = e._node._inc || e._node.ownerDocument._inc;

        if (e._inc != t) {
          var i = e._refresh(e._node);

          L(e, "length", i.length), n(i, e), e._inc = t;
        }
      }

      function c() {}

      function l(e, t) {
        for (var n = e.length; n--;) {if (e[n] === t) return n;}
      }

      function p(e, t, n, i) {
        if (i ? t[l(t, i)] = n : t[t.length++] = n, e) {
          n.ownerElement = e;
          var a = e.ownerDocument;
          a && (i && x(a, e, i), v(a, e, n));
        }
      }

      function u(e, t, n) {
        var i = l(t, n);
        if (!(i >= 0)) throw a(re, new Error(e.tagName + "@" + n));

        for (var o = t.length - 1; i < o;) {t[i] = t[++i];}

        if (t.length = o, e) {
          var r = e.ownerDocument;
          r && (x(r, e, n), n.ownerElement = null);
        }
      }

      function d(e) {
        if (this._features = {}, e) for (var t in e) {this._features = e[t];}
      }

      function m() {}

      function f(e) {
        return "<" == e && "&lt;" || ">" == e && "&gt;" || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";";
      }

      function h(e, t) {
        if (t(e)) return !0;
        if (e = e.firstChild) do {
          if (h(e, t)) return !0;
        } while (e = e.nextSibling);
      }

      function g() {}

      function v(e, t, n) {
        e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
      }

      function x(e, t, n, i) {
        e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""];
      }

      function y(e, t, n) {
        if (e && e._inc) {
          e._inc++;
          var i = t.childNodes;
          if (n) i[i.length++] = n;else {
            for (var a = t.firstChild, o = 0; a;) {i[o++] = a, a = a.nextSibling;}

            i.length = o;
          }
        }
      }

      function C(e, t) {
        var n = t.previousSibling,
        i = t.nextSibling;
        return n ? n.nextSibling = i : e.firstChild = i, i ? i.previousSibling = n : e.lastChild = n, y(e.ownerDocument, e), t;
      }

      function k(e, t, n) {
        var i = t.parentNode;

        if (i && i.removeChild(t), t.nodeType === te) {
          var a = t.firstChild;
          if (null == a) return t;
          var o = t.lastChild;
        } else a = o = t;

        var r = n ? n.previousSibling : e.lastChild;
        a.previousSibling = r, o.nextSibling = n, r ? r.nextSibling = a : e.firstChild = a, null == n ? e.lastChild = o : n.previousSibling = o;

        do {
          a.parentNode = e;
        } while (a !== o && (a = a.nextSibling));

        return y(e.ownerDocument || e, e), t.nodeType == te && (t.firstChild = t.lastChild = null), t;
      }

      function b(e, t) {
        var n = t.parentNode;

        if (n) {
          var i = e.lastChild;
          n.removeChild(t);
          var i = e.lastChild;
        }

        var i = e.lastChild;
        return t.parentNode = e, t.previousSibling = i, t.nextSibling = null, i ? i.nextSibling = t : e.firstChild = t, e.lastChild = t, y(e.ownerDocument, e, t), t;
      }

      function S() {
        this._nsMap = {};
      }

      function R() {}

      function w() {}

      function _() {}

      function A() {}

      function T() {}

      function E() {}

      function B() {}

      function O() {}

      function D() {}

      function N() {}

      function I() {}

      function P() {}

      function j(e, t) {
        var n = [],
        i = 9 == this.nodeType ? this.documentElement : this,
        a = i.prefix,
        o = i.namespaceURI;

        if (o && null == a) {
          var a = i.lookupPrefix(o);
          if (null == a) var r = [{
            namespace: o,
            prefix: null }];

        }

        return U(this, n, e, t, r), n.join("");
      }

      function M(e, t, n) {
        var i = e.prefix || "",
        a = e.namespaceURI;
        if (!i && !a) return !1;
        if ("xml" === i && "http://www.w3.org/XML/1998/namespace" === a || "http://www.w3.org/2000/xmlns/" == a) return !1;

        for (var o = n.length; o--;) {
          var r = n[o];
          if (r.prefix == i) return r.namespace != a;
        }

        return !0;
      }

      function U(e, t, n, i, a) {
        if (i) {
          if (!(e = i(e))) return;
          if ("string" == typeof e) return void t.push(e);
        }

        switch (e.nodeType) {
          case G:
            a || (a = []);
            var o = (a.length, e.attributes),
            r = o.length,
            s = e.firstChild,
            c = e.tagName;
            n = K === e.namespaceURI || n, t.push("<", c);

            for (var l = 0; l < r; l++) {
              var p = o.item(l);
              "xmlns" == p.prefix ? a.push({
                prefix: p.localName,
                namespace: p.value }) :
              "xmlns" == p.nodeName && a.push({
                prefix: "",
                namespace: p.value });

            }

            for (var l = 0; l < r; l++) {
              var p = o.item(l);

              if (M(p, n, a)) {
                var u = p.prefix || "",
                d = p.namespaceURI,
                m = u ? " xmlns:" + u : " xmlns";
                t.push(m, '="', d, '"'), a.push({
                  prefix: u,
                  namespace: d });

              }

              U(p, t, n, i, a);
            }

            if (M(e, n, a)) {
              var u = e.prefix || "",
              d = e.namespaceURI,
              m = u ? " xmlns:" + u : " xmlns";
              t.push(m, '="', d, '"'), a.push({
                prefix: u,
                namespace: d });

            }

            if (s || n && !/^(?:meta|link|img|br|hr|input)$/i.test(c)) {
              if (t.push(">"), n && /^script$/i.test(c)) for (; s;) {s.data ? t.push(s.data) : U(s, t, n, i, a), s = s.nextSibling;} else for (; s;) {U(s, t, n, i, a), s = s.nextSibling;}
              t.push("</", c, ">");
            } else t.push("/>");

            return;

          case Z:
          case te:
            for (var s = e.firstChild; s;) {U(s, t, n, i, a), s = s.nextSibling;}

            return;

          case V:
            return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, f), '"');

          case X:
            return t.push(e.data.replace(/[<&]/g, f));

          case W:
            return t.push("<![CDATA[", e.data, "]]>");

          case Y:
            return t.push("\x3c!--", e.data, "--\x3e");

          case ee:
            var h = e.publicId,
            g = e.systemId;
            if (t.push("<!DOCTYPE ", e.name), h) t.push(' PUBLIC "', h), g && "." != g && t.push('" "', g), t.push('">');else if (g && "." != g) t.push(' SYSTEM "', g, '">');else {
              var v = e.internalSubset;
              v && t.push(" [", v, "]"), t.push(">");
            }
            return;

          case J:
            return t.push("<?", e.target, " ", e.data, "?>");

          case $:
            return t.push("&", e.nodeName, ";");

          default:
            t.push("??", e.nodeName);}

      }

      function F(e, t, n) {
        var i;

        switch (t.nodeType) {
          case G:
            i = t.cloneNode(!1), i.ownerDocument = e;

          case te:
            break;

          case V:
            n = !0;}


        if (i || (i = t.cloneNode(!1)), i.ownerDocument = e, i.parentNode = null, n) for (var a = t.firstChild; a;) {i.appendChild(F(e, a, n)), a = a.nextSibling;}
        return i;
      }

      function H(e, t, n) {
        var i = new t.constructor();

        for (var a in t) {
          var r = t[a];
          "object" != typeof r && r != i[a] && (i[a] = r);
        }

        switch (t.childNodes && (i.childNodes = new o()), i.ownerDocument = e, i.nodeType) {
          case G:
            var s = t.attributes,
            l = i.attributes = new c(),
            p = s.length;
            l._ownerElement = i;

            for (var u = 0; u < p; u++) {i.setAttributeNode(H(e, s.item(u), !0));}

            break;

          case V:
            n = !0;}


        if (n) for (var d = t.firstChild; d;) {i.appendChild(H(e, d, n)), d = d.nextSibling;}
        return i;
      }

      function L(e, t, n) {
        e[t] = n;
      }

      function z(e) {
        switch (e.nodeType) {
          case G:
          case te:
            var t = [];

            for (e = e.firstChild; e;) {7 !== e.nodeType && 8 !== e.nodeType && t.push(z(e)), e = e.nextSibling;}

            return t.join("");

          default:
            return e.nodeValue;}

      }

      var K = "http://www.w3.org/1999/xhtml",
      q = {},
      G = q.ELEMENT_NODE = 1,
      V = q.ATTRIBUTE_NODE = 2,
      X = q.TEXT_NODE = 3,
      W = q.CDATA_SECTION_NODE = 4,
      $ = q.ENTITY_REFERENCE_NODE = 5,
      Q = q.ENTITY_NODE = 6,
      J = q.PROCESSING_INSTRUCTION_NODE = 7,
      Y = q.COMMENT_NODE = 8,
      Z = q.DOCUMENT_NODE = 9,
      ee = q.DOCUMENT_TYPE_NODE = 10,
      te = q.DOCUMENT_FRAGMENT_NODE = 11,
      ne = q.NOTATION_NODE = 12,
      ie = {},
      ae = {},
      oe = (ie.INDEX_SIZE_ERR = (ae[1] = "Index size error", 1), ie.DOMSTRING_SIZE_ERR = (ae[2] = "DOMString size error", 2), ie.HIERARCHY_REQUEST_ERR = (ae[3] = "Hierarchy request error", 3)),
      re = (ie.WRONG_DOCUMENT_ERR = (ae[4] = "Wrong document", 4), ie.INVALID_CHARACTER_ERR = (ae[5] = "Invalid character", 5), ie.NO_DATA_ALLOWED_ERR = (ae[6] = "No data allowed", 6), ie.NO_MODIFICATION_ALLOWED_ERR = (ae[7] = "No modification allowed", 7), ie.NOT_FOUND_ERR = (ae[8] = "Not found", 8)),
      se = (ie.NOT_SUPPORTED_ERR = (ae[9] = "Not supported", 9), ie.INUSE_ATTRIBUTE_ERR = (ae[10] = "Attribute in use", 10));
      ie.INVALID_STATE_ERR = (ae[11] = "Invalid state", 11), ie.SYNTAX_ERR = (ae[12] = "Syntax error", 12), ie.INVALID_MODIFICATION_ERR = (ae[13] = "Invalid modification", 13), ie.NAMESPACE_ERR = (ae[14] = "Invalid namespace", 14), ie.INVALID_ACCESS_ERR = (ae[15] = "Invalid access", 15);
      a.prototype = Error.prototype, n(ie, a), o.prototype = {
        length: 0,
        item: function item(e) {
          return this[e] || null;
        },
        toString: function toString(e, t) {
          for (var n = [], i = 0; i < this.length; i++) {U(this[i], n, e, t);}

          return n.join("");
        } },
      r.prototype.item = function (e) {
        return s(this), this[e];
      }, i(r, o), c.prototype = {
        length: 0,
        item: o.prototype.item,
        getNamedItem: function getNamedItem(e) {
          for (var t = this.length; t--;) {
            var n = this[t];
            if (n.nodeName == e) return n;
          }
        },
        setNamedItem: function setNamedItem(e) {
          var t = e.ownerElement;
          if (t && t != this._ownerElement) throw new a(se);
          var n = this.getNamedItem(e.nodeName);
          return p(this._ownerElement, this, e, n), n;
        },
        setNamedItemNS: function setNamedItemNS(e) {
          var t,
          n = e.ownerElement;
          if (n && n != this._ownerElement) throw new a(se);
          return t = this.getNamedItemNS(e.namespaceURI, e.localName), p(this._ownerElement, this, e, t), t;
        },
        removeNamedItem: function removeNamedItem(e) {
          var t = this.getNamedItem(e);
          return u(this._ownerElement, this, t), t;
        },
        removeNamedItemNS: function removeNamedItemNS(e, t) {
          var n = this.getNamedItemNS(e, t);
          return u(this._ownerElement, this, n), n;
        },
        getNamedItemNS: function getNamedItemNS(e, t) {
          for (var n = this.length; n--;) {
            var i = this[n];
            if (i.localName == t && i.namespaceURI == e) return i;
          }

          return null;
        } },
      d.prototype = {
        hasFeature: function hasFeature(e, t) {
          var n = this._features[e.toLowerCase()];

          return !(!n || t && !(t in n));
        },
        createDocument: function createDocument(e, t, n) {
          var i = new g();

          if (i.implementation = this, i.childNodes = new o(), i.doctype = n, n && i.appendChild(n), t) {
            var a = i.createElementNS(e, t);
            i.appendChild(a);
          }

          return i;
        },
        createDocumentType: function createDocumentType(e, t, n) {
          var i = new E();
          return i.name = e, i.nodeName = e, i.publicId = t, i.systemId = n, i;
        } },
      m.prototype = {
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        attributes: null,
        parentNode: null,
        childNodes: null,
        ownerDocument: null,
        nodeValue: null,
        namespaceURI: null,
        prefix: null,
        localName: null,
        insertBefore: function insertBefore(e, t) {
          return k(this, e, t);
        },
        replaceChild: function replaceChild(e, t) {
          this.insertBefore(e, t), t && this.removeChild(t);
        },
        removeChild: function removeChild(e) {
          return C(this, e);
        },
        appendChild: function appendChild(e) {
          return this.insertBefore(e, null);
        },
        hasChildNodes: function hasChildNodes() {
          return null != this.firstChild;
        },
        cloneNode: function cloneNode(e) {
          return H(this.ownerDocument || this, this, e);
        },
        normalize: function normalize() {
          for (var e = this.firstChild; e;) {
            var t = e.nextSibling;
            t && t.nodeType == X && e.nodeType == X ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
          }
        },
        isSupported: function isSupported(e, t) {
          return this.ownerDocument.implementation.hasFeature(e, t);
        },
        hasAttributes: function hasAttributes() {
          return this.attributes.length > 0;
        },
        lookupPrefix: function lookupPrefix(e) {
          for (var t = this; t;) {
            var n = t._nsMap;
            if (n) for (var i in n) {if (n[i] == e) return i;}
            t = t.nodeType == V ? t.ownerDocument : t.parentNode;
          }

          return null;
        },
        lookupNamespaceURI: function lookupNamespaceURI(e) {
          for (var t = this; t;) {
            var n = t._nsMap;
            if (n && e in n) return n[e];
            t = t.nodeType == V ? t.ownerDocument : t.parentNode;
          }

          return null;
        },
        isDefaultNamespace: function isDefaultNamespace(e) {
          return null == this.lookupPrefix(e);
        } },
      n(q, m), n(q, m.prototype), g.prototype = {
        nodeName: "#document",
        nodeType: Z,
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function insertBefore(e, t) {
          if (e.nodeType == te) {
            for (var n = e.firstChild; n;) {
              var i = n.nextSibling;
              this.insertBefore(n, t), n = i;
            }

            return e;
          }

          return null == this.documentElement && e.nodeType == G && (this.documentElement = e), k(this, e, t), e.ownerDocument = this, e;
        },
        removeChild: function removeChild(e) {
          return this.documentElement == e && (this.documentElement = null), C(this, e);
        },
        importNode: function importNode(e, t) {
          return F(this, e, t);
        },
        getElementById: function getElementById(e) {
          var t = null;
          return h(this.documentElement, function (n) {
            if (n.nodeType == G && n.getAttribute("id") == e) return t = n, !0;
          }), t;
        },
        createElement: function createElement(e) {
          var t = new S();
          return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new o(), (t.attributes = new c())._ownerElement = t, t;
        },
        createDocumentFragment: function createDocumentFragment() {
          var e = new N();
          return e.ownerDocument = this, e.childNodes = new o(), e;
        },
        createTextNode: function createTextNode(e) {
          var t = new _();
          return t.ownerDocument = this, t.appendData(e), t;
        },
        createComment: function createComment(e) {
          var t = new A();
          return t.ownerDocument = this, t.appendData(e), t;
        },
        createCDATASection: function createCDATASection(e) {
          var t = new T();
          return t.ownerDocument = this, t.appendData(e), t;
        },
        createProcessingInstruction: function createProcessingInstruction(e, t) {
          var n = new I();
          return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, n;
        },
        createAttribute: function createAttribute(e) {
          var t = new R();
          return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
        },
        createEntityReference: function createEntityReference(e) {
          var t = new D();
          return t.ownerDocument = this, t.nodeName = e, t;
        },
        createElementNS: function createElementNS(e, t) {
          var n = new S(),
          i = t.split(":"),
          a = n.attributes = new c();
          return n.childNodes = new o(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, 2 == i.length ? (n.prefix = i[0], n.localName = i[1]) : n.localName = t, a._ownerElement = n, n;
        },
        createAttributeNS: function createAttributeNS(e, t) {
          var n = new R(),
          i = t.split(":");
          return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 2 == i.length ? (n.prefix = i[0], n.localName = i[1]) : n.localName = t, n;
        } },
      i(g, m), S.prototype = {
        nodeType: G,
        hasAttribute: function hasAttribute(e) {
          return null != this.getAttributeNode(e);
        },
        getAttribute: function getAttribute(e) {
          var t = this.getAttributeNode(e);
          return t && t.value || "";
        },
        getAttributeNode: function getAttributeNode(e) {
          return this.attributes.getNamedItem(e);
        },
        setAttribute: function setAttribute(e, t) {
          var n = this.ownerDocument.createAttribute(e);
          n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
        },
        removeAttribute: function removeAttribute(e) {
          var t = this.getAttributeNode(e);
          t && this.removeAttributeNode(t);
        },
        appendChild: function appendChild(e) {
          return e.nodeType === te ? this.insertBefore(e, null) : b(this, e);
        },
        setAttributeNode: function setAttributeNode(e) {
          return this.attributes.setNamedItem(e);
        },
        setAttributeNodeNS: function setAttributeNodeNS(e) {
          return this.attributes.setNamedItemNS(e);
        },
        removeAttributeNode: function removeAttributeNode(e) {
          return this.attributes.removeNamedItem(e.nodeName);
        },
        removeAttributeNS: function removeAttributeNS(e, t) {
          var n = this.getAttributeNodeNS(e, t);
          n && this.removeAttributeNode(n);
        },
        hasAttributeNS: function hasAttributeNS(e, t) {
          return null != this.getAttributeNodeNS(e, t);
        },
        getAttributeNS: function getAttributeNS(e, t) {
          var n = this.getAttributeNodeNS(e, t);
          return n && n.value || "";
        },
        setAttributeNS: function setAttributeNS(e, t, n) {
          var i = this.ownerDocument.createAttributeNS(e, t);
          i.value = i.nodeValue = "" + n, this.setAttributeNode(i);
        },
        getAttributeNodeNS: function getAttributeNodeNS(e, t) {
          return this.attributes.getNamedItemNS(e, t);
        },
        getElementsByTagName: function getElementsByTagName(e) {
          return new r(this, function (t) {
            var n = [];
            return h(t, function (i) {
              i === t || i.nodeType != G || "*" !== e && i.tagName != e || n.push(i);
            }), n;
          });
        },
        getElementsByTagNameNS: function getElementsByTagNameNS(e, t) {
          return new r(this, function (n) {
            var i = [];
            return h(n, function (a) {
              a === n || a.nodeType !== G || "*" !== e && a.namespaceURI !== e || "*" !== t && a.localName != t || i.push(a);
            }), i;
          });
        } },
      g.prototype.getElementsByTagName = S.prototype.getElementsByTagName, g.prototype.getElementsByTagNameNS = S.prototype.getElementsByTagNameNS, i(S, m), R.prototype.nodeType = V, i(R, m), w.prototype = {
        data: "",
        substringData: function substringData(e, t) {
          return this.data.substring(e, e + t);
        },
        appendData: function appendData(e) {
          e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
        },
        insertData: function insertData(e, t) {
          this.replaceData(e, 0, t);
        },
        appendChild: function appendChild(e) {
          throw new Error(ae[oe]);
        },
        deleteData: function deleteData(e, t) {
          this.replaceData(e, t, "");
        },
        replaceData: function replaceData(e, t, n) {
          n = this.data.substring(0, e) + n + this.data.substring(e + t), this.nodeValue = this.data = n, this.length = n.length;
        } },
      i(w, m), _.prototype = {
        nodeName: "#text",
        nodeType: X,
        splitText: function splitText(e) {
          var t = this.data,
          n = t.substring(e);
          t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
          var i = this.ownerDocument.createTextNode(n);
          return this.parentNode && this.parentNode.insertBefore(i, this.nextSibling), i;
        } },
      i(_, w), A.prototype = {
        nodeName: "#comment",
        nodeType: Y },
      i(A, w), T.prototype = {
        nodeName: "#cdata-section",
        nodeType: W },
      i(T, w), E.prototype.nodeType = ee, i(E, m), B.prototype.nodeType = ne, i(B, m), O.prototype.nodeType = Q, i(O, m), D.prototype.nodeType = $, i(D, m), N.prototype.nodeName = "#document-fragment", N.prototype.nodeType = te, i(N, m), I.prototype.nodeType = J, i(I, m), P.prototype.serializeToString = function (e, t, n) {
        return j.call(e, t, n);
      }, m.prototype.toString = j;

      try {
        Object.defineProperty && (Object.defineProperty(r.prototype, "length", {
          get: function get() {
            return s(this), this.$$length;
          } }),
        Object.defineProperty(m.prototype, "textContent", {
          get: function get() {
            return z(this);
          },
          set: function set(e) {
            switch (this.nodeType) {
              case G:
              case te:
                for (; this.firstChild;) {this.removeChild(this.firstChild);}

                (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                break;

              default:
                this.data = e, this.value = e, this.nodeValue = e;}

          } }),
        L = function L(e, t, n) {
          e["$$" + t] = n;
        });
      } catch (e) {}

      t.DOMImplementation = d, t.XMLSerializer = P;
    }, function (e, t) {
      var n = function (e) {
        e = e || {};

        var t,
        n = e.Base64,
        i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        a = function (e) {
          for (var t = {}, n = 0, i = e.length; n < i; n++) {t[e.charAt(n)] = n;}

          return t;
        }(i),
        o = String.fromCharCode,
        r = function r(e) {
          if (e.length < 2) {
            var t = e.charCodeAt(0);
            return t < 128 ? e : t < 2048 ? o(192 | t >>> 6) + o(128 | 63 & t) : o(224 | t >>> 12 & 15) + o(128 | t >>> 6 & 63) + o(128 | 63 & t);
          }

          var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
          return o(240 | t >>> 18 & 7) + o(128 | t >>> 12 & 63) + o(128 | t >>> 6 & 63) + o(128 | 63 & t);
        },
        s = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
        c = function c(e) {
          return e.replace(s, r);
        },
        l = function l(e) {
          var t = [0, 2, 1][e.length % 3],
          n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
          return [i.charAt(n >>> 18), i.charAt(n >>> 12 & 63), t >= 2 ? "=" : i.charAt(n >>> 6 & 63), t >= 1 ? "=" : i.charAt(63 & n)].join("");
        },
        p = e.btoa ? function (t) {
          return e.btoa(t);
        } : function (e) {
          return e.replace(/[\s\S]{1,3}/g, l);
        },
        u = t ? function (e) {
          return (e.constructor === t.constructor ? e : new t(e)).toString("base64");
        } : function (e) {
          return p(c(e));
        },
        d = function d(e, t) {
          return t ? u(String(e)).replace(/[+\/]/g, function (e) {
            return "+" == e ? "-" : "_";
          }).replace(/=/g, "") : u(String(e));
        },
        m = function m(e) {
          return d(e, !0);
        },
        f = new RegExp(["[\xc0-\xdf][\x80-\xbf]", "[\xe0-\xef][\x80-\xbf]{2}", "[\xf0-\xf7][\x80-\xbf]{3}"].join("|"), "g"),
        h = function h(e) {
          switch (e.length) {
            case 4:
              var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3),
              n = t - 65536;
              return o(55296 + (n >>> 10)) + o(56320 + (1023 & n));

            case 3:
              return o((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));

            default:
              return o((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));}

        },
        g = function g(e) {
          return e.replace(f, h);
        },
        v = function v(e) {
          var t = e.length,
          n = t % 4,
          i = (t > 0 ? a[e.charAt(0)] << 18 : 0) | (t > 1 ? a[e.charAt(1)] << 12 : 0) | (t > 2 ? a[e.charAt(2)] << 6 : 0) | (t > 3 ? a[e.charAt(3)] : 0),
          r = [o(i >>> 16), o(i >>> 8 & 255), o(255 & i)];
          return r.length -= [0, 0, 2, 1][n], r.join("");
        },
        x = e.atob ? function (t) {
          return e.atob(t);
        } : function (e) {
          return e.replace(/[\s\S]{1,4}/g, v);
        },
        y = t ? function (e) {
          return (e.constructor === t.constructor ? e : new t(e, "base64")).toString();
        } : function (e) {
          return g(x(e));
        },
        C = function C(e) {
          return y(String(e).replace(/[-_]/g, function (e) {
            return "-" == e ? "+" : "/";
          }).replace(/[^A-Za-z0-9\+\/]/g, ""));
        };

        return {
          VERSION: "2.1.9",
          atob: x,
          btoa: p,
          fromBase64: C,
          toBase64: d,
          utob: c,
          encode: d,
          encodeURI: m,
          btou: g,
          decode: C,
          noConflict: function noConflict() {
            var t = e.Base64;
            return e.Base64 = n, t;
          } };

      }();

      e.exports = n;
    }, function (e, t) {
      var n = function n(e) {
        var t = {},
        n = function n(e) {
          return !t[e] && (t[e] = []), t[e];
        };

        e.on = function (e, t) {
          n(e).push(t);
        }, e.off = function (e, t) {
          for (var i = n(e), a = i.length - 1; a >= 0; a--) {t === i[a] && i.splice(a, 1);}
        }, e.emit = function (e, t) {
          for (var i = n(e).map(function (e) {
            return e;
          }), a = 0; a < i.length; a++) {i[a](t);}
        };
      },
      i = function i() {
        n(this);
      };

      e.exports.init = n, e.exports.EventProxy = i;
    }, function (e, t, n) {
      var i,
      a,
      o = n(0),
      r = function r() {
        try {
          var e = JSON.parse(wx.getStorageSync("cos_sdk_upload_cache"));
        } catch (e) {}

        return e || (e = []), e;
      },
      s = function s() {
        try {
          wx.setStorageSync("cos_sdk_upload_cache", JSON.stringify(i));
        } catch (e) {}
      },
      c = function c() {
        if (!i) {
          i = r();

          for (var e = !1, t = Math.round(Date.now() / 1e3), n = i.length - 1; n >= 0; n--) {
            var a = i[n][2];
            (!a || a + 2592e3 < t) && (i.splice(n, 1), e = !0);
          }

          e && s();
        }
      },
      l = function l() {
        a || (a = setTimeout(function () {
          s(), a = null;
        }, 400));
      },
      p = {
        using: {},
        setUsing: function setUsing(e) {
          p.using[e] = !0;
        },
        removeUsing: function removeUsing(e) {
          delete p.using[e];
        },
        getFileId: function getFileId(e, t, n, i) {
          return e.FilePath && e.size && e.lastModifiedTime && t ? o.md5([e.FilePath].join("::")) + "-" + o.md5([e.size, e.mode, e.lastAccessedTime, e.lastModifiedTime, t, n, i].join("::")) : null;
        },
        getUploadIdList: function getUploadIdList(e) {
          if (!e) return null;
          c();

          for (var t = [], n = 0; n < i.length; n++) {i[n][0] === e && t.push(i[n][1]);}

          return t.length ? t : null;
        },
        saveUploadId: function saveUploadId(e, t, n) {
          if (c(), e) {
            for (var a = e.substr(0, e.indexOf("-") + 1), o = i.length - 1; o >= 0; o--) {
              var r = i[o];
              r[0] === e && r[1] === t ? i.splice(o, 1) : e !== r[0] && 0 === r[0].indexOf(a) && i.splice(o, 1);
            }

            i.unshift([e, t, Math.round(Date.now() / 1e3)]), i.length > n && i.splice(n), l();
          }
        },
        removeUploadId: function removeUploadId(e) {
          c(), delete p.using[e];

          for (var t = i.length - 1; t >= 0; t--) {i[t][1] === e && i.splice(t, 1);}

          l();
        } };


      e.exports = p;
    }, function (e, t, n) {
      var i = n(7);
      e.exports = i;
    }, function (e, t, n) {
      "use strict";

      var i = n(0),
      a = n(4),
      o = n(16),
      r = n(17),
      s = n(23),
      c = {
        SecretId: "",
        SecretKey: "",
        XCosSecurityToken: "",
        ChunkRetryTimes: 2,
        FileParallelLimit: 3,
        ChunkParallelLimit: 3,
        ChunkSize: 1048576,
        SliceSize: 1048576,
        CopyChunkParallelLimit: 20,
        CopyChunkSize: 10485760,
        CopySliceSize: 10485760,
        MaxPartNumber: 1e4,
        ProgressInterval: 1e3,
        UploadQueueSize: 1e4,
        Domain: "",
        ServiceDomain: "",
        Protocol: "",
        CompatibilityMode: !1,
        ForcePathStyle: !1,
        Timeout: 0,
        CorrectClockSkew: !0,
        SystemClockOffset: 0,
        UploadCheckContentMd5: !1,
        UploadIdCacheLimit: 50 },

      l = function l(e) {
        this.options = i.extend(i.clone(c), e || {}), this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit), this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit), this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes), this.options.ChunkSize = Math.max(1048576, this.options.ChunkSize), this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit), this.options.CopyChunkSize = Math.max(1048576, this.options.CopyChunkSize), this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize), this.options.MaxPartNumber = Math.max(1024, Math.min(1e4, this.options.MaxPartNumber)), this.options.Timeout = Math.max(0, this.options.Timeout), this.options.AppId && console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").'), a.init(this), o.init(this);
      };

      r.init(l, o), s.init(l, o), l.getAuthorization = i.getAuth, l.version = "1.0.6", e.exports = l;
    }, function (module, exports, __webpack_require__) {
      (function (process, global) {
        var __WEBPACK_AMD_DEFINE_RESULT__;

        !function () {
          "use strict";

          function Md5(e) {
            if (e) blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks, this.buffer8 = buffer8;else if (ARRAY_BUFFER) {
              var t = new ArrayBuffer(68);
              this.buffer8 = new Uint8Array(t), this.blocks = new Uint32Array(t);
            } else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0;
          }

          var ERROR = "input is invalid type",
          WINDOW = "object" == typeof window,
          root = WINDOW ? window : {};
          root.JS_MD5_NO_WINDOW && (WINDOW = !1);
          var WEB_WORKER = !WINDOW && "object" == typeof self,
          NODE_JS = !root.JS_MD5_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
          NODE_JS ? root = global : WEB_WORKER && (root = self);

          var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && "object" == typeof module && module.exports,
          AMD = __webpack_require__(10),
          ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
          HEX_CHARS = "0123456789abcdef".split(""),
          EXTRA = [128, 32768, 8388608, -2147483648],
          SHIFT = [0, 8, 16, 24],
          OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"],
          BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
          blocks = [],
          buffer8;

          if (ARRAY_BUFFER) {
            var buffer = new ArrayBuffer(68);
            buffer8 = new Uint8Array(buffer), blocks = new Uint32Array(buffer);
          }

          !root.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          }), !ARRAY_BUFFER || !root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (e) {
            return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer;
          });

          var createOutputMethod = function createOutputMethod(e) {
            return function (t) {
              return new Md5(!0).update(t)[e]();
            };
          },
          createMethod = function createMethod() {
            var e = createOutputMethod("hex");
            NODE_JS && (e = nodeWrap(e)), e.getCtx = e.create = function () {
              return new Md5();
            }, e.update = function (t) {
              return e.create().update(t);
            };

            for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
              var n = OUTPUT_TYPES[t];
              e[n] = createOutputMethod(n);
            }

            return e;
          },
          nodeWrap = function nodeWrap(method) {
            var crypto = eval("require('crypto')"),
            Buffer = eval("require('buffer').Buffer"),
            nodeMethod = function nodeMethod(e) {
              if ("string" == typeof e) return crypto.createHash("md5").update(e, "utf8").digest("hex");
              if (null === e || void 0 === e) throw ERROR;
              return e.constructor === ArrayBuffer && (e = new Uint8Array(e)), Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer ? crypto.createHash("md5").update(new Buffer(e)).digest("hex") : method(e);
            };

            return nodeMethod;
          };

          Md5.prototype.update = function (e) {
            if (!this.finalized) {
              var t,
              n = typeof e;

              if ("string" !== n) {
                if ("object" !== n) throw ERROR;
                if (null === e) throw ERROR;

                if (!ARRAY_BUFFER || e.constructor !== ArrayBuffer && "ArrayBuffer" !== e.constructor.name) {
                  if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e))) throw ERROR;
                } else e = new Uint8Array(e);

                t = !0;
              }

              for (var i, a, o = 0, r = e.length, s = this.blocks, c = this.buffer8; o < r;) {
                if (this.hashed && (this.hashed = !1, s[0] = s[16], s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0), t) {
                  if (ARRAY_BUFFER) for (a = this.start; o < r && a < 64; ++o) {c[a++] = e[o];} else for (a = this.start; o < r && a < 64; ++o) {s[a >> 2] |= e[o] << SHIFT[3 & a++];}
                } else if (ARRAY_BUFFER) for (a = this.start; o < r && a < 64; ++o) {i = e.charCodeAt(o), i < 128 ? c[a++] = i : i < 2048 ? (c[a++] = 192 | i >> 6, c[a++] = 128 | 63 & i) : i < 55296 || i >= 57344 ? (c[a++] = 224 | i >> 12, c[a++] = 128 | i >> 6 & 63, c[a++] = 128 | 63 & i) : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++o)), c[a++] = 240 | i >> 18, c[a++] = 128 | i >> 12 & 63, c[a++] = 128 | i >> 6 & 63, c[a++] = 128 | 63 & i);} else for (a = this.start; o < r && a < 64; ++o) {i = e.charCodeAt(o), i < 128 ? s[a >> 2] |= i << SHIFT[3 & a++] : i < 2048 ? (s[a >> 2] |= (192 | i >> 6) << SHIFT[3 & a++], s[a >> 2] |= (128 | 63 & i) << SHIFT[3 & a++]) : i < 55296 || i >= 57344 ? (s[a >> 2] |= (224 | i >> 12) << SHIFT[3 & a++], s[a >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & a++], s[a >> 2] |= (128 | 63 & i) << SHIFT[3 & a++]) : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++o)), s[a >> 2] |= (240 | i >> 18) << SHIFT[3 & a++], s[a >> 2] |= (128 | i >> 12 & 63) << SHIFT[3 & a++], s[a >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & a++], s[a >> 2] |= (128 | 63 & i) << SHIFT[3 & a++]);}
                this.lastByteIndex = a, this.bytes += a - this.start, a >= 64 ? (this.start = a - 64, this.hash(), this.hashed = !0) : this.start = a;
              }

              return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
            }
          }, Md5.prototype.finalize = function () {
            if (!this.finalized) {
              this.finalized = !0;
              var e = this.blocks,
              t = this.lastByteIndex;
              e[t >> 2] |= EXTRA[3 & t], t >= 56 && (this.hashed || this.hash(), e[0] = e[16], e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.bytes << 3, e[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash();
            }
          }, Md5.prototype.hash = function () {
            var e,
            t,
            n,
            i,
            a,
            o,
            r = this.blocks;
            this.first ? (e = r[0] - 680876937, e = (e << 7 | e >>> 25) - 271733879 << 0, i = (-1732584194 ^ 2004318071 & e) + r[1] - 117830708, i = (i << 12 | i >>> 20) + e << 0, n = (-271733879 ^ i & (-271733879 ^ e)) + r[2] - 1126478375, n = (n << 17 | n >>> 15) + i << 0, t = (e ^ n & (i ^ e)) + r[3] - 1316259209, t = (t << 22 | t >>> 10) + n << 0) : (e = this.h0, t = this.h1, n = this.h2, i = this.h3, e += (i ^ t & (n ^ i)) + r[0] - 680876936, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[1] - 389564586, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[2] + 606105819, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[3] - 1044525330, t = (t << 22 | t >>> 10) + n << 0), e += (i ^ t & (n ^ i)) + r[4] - 176418897, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[5] + 1200080426, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[6] - 1473231341, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[7] - 45705983, t = (t << 22 | t >>> 10) + n << 0, e += (i ^ t & (n ^ i)) + r[8] + 1770035416, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[9] - 1958414417, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[10] - 42063, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[11] - 1990404162, t = (t << 22 | t >>> 10) + n << 0, e += (i ^ t & (n ^ i)) + r[12] + 1804603682, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[13] - 40341101, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[14] - 1502002290, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[15] + 1236535329, t = (t << 22 | t >>> 10) + n << 0, e += (n ^ i & (t ^ n)) + r[1] - 165796510, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[6] - 1069501632, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[11] + 643717713, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[0] - 373897302, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ i & (t ^ n)) + r[5] - 701558691, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[10] + 38016083, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[15] - 660478335, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[4] - 405537848, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ i & (t ^ n)) + r[9] + 568446438, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[14] - 1019803690, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[3] - 187363961, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[8] + 1163531501, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ i & (t ^ n)) + r[13] - 1444681467, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[2] - 51403784, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[7] + 1735328473, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[12] - 1926607734, t = (t << 20 | t >>> 12) + n << 0, a = t ^ n, e += (a ^ i) + r[5] - 378558, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[8] - 2022574463, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[11] + 1839030562, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[14] - 35309556, t = (t << 23 | t >>> 9) + n << 0, a = t ^ n, e += (a ^ i) + r[1] - 1530992060, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[4] + 1272893353, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[7] - 155497632, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[10] - 1094730640, t = (t << 23 | t >>> 9) + n << 0, a = t ^ n, e += (a ^ i) + r[13] + 681279174, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[0] - 358537222, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[3] - 722521979, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[6] + 76029189, t = (t << 23 | t >>> 9) + n << 0, a = t ^ n, e += (a ^ i) + r[9] - 640364487, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[12] - 421815835, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[15] + 530742520, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[2] - 995338651, t = (t << 23 | t >>> 9) + n << 0, e += (n ^ (t | ~i)) + r[0] - 198630844, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[7] + 1126891415, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[14] - 1416354905, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[5] - 57434055, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~i)) + r[12] + 1700485571, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[3] - 1894986606, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[10] - 1051523, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[1] - 2054922799, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~i)) + r[8] + 1873313359, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[15] - 30611744, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[6] - 1560198380, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[13] + 1309151649, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~i)) + r[4] - 145523070, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[11] - 1120210379, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[2] + 718787259, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[9] - 343485551, t = (t << 21 | t >>> 11) + n << 0, this.first ? (this.h0 = e + 1732584193 << 0, this.h1 = t - 271733879 << 0, this.h2 = n - 1732584194 << 0, this.h3 = i + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + e << 0, this.h1 = this.h1 + t << 0, this.h2 = this.h2 + n << 0, this.h3 = this.h3 + i << 0);
          }, Md5.prototype.hex = function () {
            this.finalize();
            var e = this.h0,
            t = this.h1,
            n = this.h2,
            i = this.h3;
            return HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15];
          }, Md5.prototype.toString = Md5.prototype.hex, Md5.prototype.digest = function () {
            this.finalize();
            var e = this.h0,
            t = this.h1,
            n = this.h2,
            i = this.h3;
            return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 255 & i, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255];
          }, Md5.prototype.array = Md5.prototype.digest, Md5.prototype.arrayBuffer = function () {
            this.finalize();
            var e = new ArrayBuffer(16),
            t = new Uint32Array(e);
            return t[0] = this.h0, t[1] = this.h1, t[2] = this.h2, t[3] = this.h3, e;
          }, Md5.prototype.buffer = Md5.prototype.arrayBuffer, Md5.prototype.base64 = function () {
            for (var e, t, n, i = "", a = this.array(), o = 0; o < 15;) {e = a[o++], t = a[o++], n = a[o++], i += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[63 & (e << 4 | t >>> 4)] + BASE64_ENCODE_CHAR[63 & (t << 2 | n >>> 6)] + BASE64_ENCODE_CHAR[63 & n];}

            return e = a[o], i += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[e << 4 & 63] + "==";
          };
          var exports = createMethod();
          COMMON_JS ? module.exports = exports : (root.md5 = exports, AMD && void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return exports;
          }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }();
      }).call(exports, __webpack_require__(9), __webpack_require__(1));
    }, function (e, t) {
      function n() {
        throw new Error("setTimeout has not been defined");
      }

      function i() {
        throw new Error("clearTimeout has not been defined");
      }

      function a(e) {
        if (p === setTimeout) return setTimeout(e, 0);
        if ((p === n || !p) && setTimeout) return p = setTimeout, setTimeout(e, 0);

        try {
          return p(e, 0);
        } catch (t) {
          try {
            return p.call(null, e, 0);
          } catch (t) {
            return p.call(this, e, 0);
          }
        }
      }

      function o(e) {
        if (u === clearTimeout) return clearTimeout(e);
        if ((u === i || !u) && clearTimeout) return u = clearTimeout, clearTimeout(e);

        try {
          return u(e);
        } catch (t) {
          try {
            return u.call(null, e);
          } catch (t) {
            return u.call(this, e);
          }
        }
      }

      function r() {
        h && m && (h = !1, m.length ? f = m.concat(f) : g = -1, f.length && s());
      }

      function s() {
        if (!h) {
          var e = a(r);
          h = !0;

          for (var t = f.length; t;) {
            for (m = f, f = []; ++g < t;) {m && m[g].run();}

            g = -1, t = f.length;
          }

          m = null, h = !1, o(e);
        }
      }

      function c(e, t) {
        this.fun = e, this.array = t;
      }

      function l() {}

      var p,
      u,
      d = e.exports = {};
      !function () {
        try {
          p = "function" == typeof setTimeout ? setTimeout : n;
        } catch (e) {
          p = n;
        }

        try {
          u = "function" == typeof clearTimeout ? clearTimeout : i;
        } catch (e) {
          u = i;
        }
      }();
      var m,
      f = [],
      h = !1,
      g = -1;
      d.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}
        f.push(new c(e, t)), 1 !== f.length || h || a(s);
      }, c.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.prependListener = l, d.prependOnceListener = l, d.listeners = function (e) {
        return [];
      }, d.binding = function (e) {
        throw new Error("process.binding is not supported");
      }, d.cwd = function () {
        return "/";
      }, d.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }, d.umask = function () {
        return 0;
      };
    }, function (e, t) {
      (function (t) {
        e.exports = t;
      }).call(t, {});
    }, function (e, t) {
      var n = n || function (e, t) {
        var n = {},
        i = n.lib = {},
        a = function a() {},
        o = i.Base = {
          extend: function extend(e) {
            a.prototype = this;
            var t = new a();
            return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () {
              t.$super.init.apply(this, arguments);
            }), t.init.prototype = t, t.$super = this, t;
          },
          create: function create() {
            var e = this.extend();
            return e.init.apply(e, arguments), e;
          },
          init: function init() {},
          mixIn: function mixIn(e) {
            for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}

            e.hasOwnProperty("toString") && (this.toString = e.toString);
          },
          clone: function clone() {
            return this.init.prototype.extend(this);
          } },

        r = i.WordArray = o.extend({
          init: function init(e, t) {
            e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length;
          },
          toString: function toString(e) {
            return (e || c).stringify(this);
          },
          concat: function concat(e) {
            var t = this.words,
            n = e.words,
            i = this.sigBytes;
            if (e = e.sigBytes, this.clamp(), i % 4) for (var a = 0; a < e; a++) {t[i + a >>> 2] |= (n[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 24 - (i + a) % 4 * 8;} else if (65535 < n.length) for (a = 0; a < e; a += 4) {t[i + a >>> 2] = n[a >>> 2];} else t.push.apply(t, n);
            return this.sigBytes += e, this;
          },
          clamp: function clamp() {
            var t = this.words,
            n = this.sigBytes;
            t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);
          },
          clone: function clone() {
            var e = o.clone.call(this);
            return e.words = this.words.slice(0), e;
          },
          random: function random(t) {
            for (var n = [], i = 0; i < t; i += 4) {n.push(4294967296 * e.random() | 0);}

            return new r.init(n, t);
          } }),

        s = n.enc = {},
        c = s.Hex = {
          stringify: function stringify(e) {
            var t = e.words;
            e = e.sigBytes;

            for (var n = [], i = 0; i < e; i++) {
              var a = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              n.push((a >>> 4).toString(16)), n.push((15 & a).toString(16));
            }

            return n.join("");
          },
          parse: function parse(e) {
            for (var t = e.length, n = [], i = 0; i < t; i += 2) {n[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;}

            return new r.init(n, t / 2);
          } },

        l = s.Latin1 = {
          stringify: function stringify(e) {
            var t = e.words;
            e = e.sigBytes;

            for (var n = [], i = 0; i < e; i++) {n.push(String.fromCharCode(t[i >>> 2] >>> 24 - i % 4 * 8 & 255));}

            return n.join("");
          },
          parse: function parse(e) {
            for (var t = e.length, n = [], i = 0; i < t; i++) {n[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;}

            return new r.init(n, t);
          } },

        p = s.Utf8 = {
          stringify: function stringify(e) {
            try {
              return decodeURIComponent(escape(l.stringify(e)));
            } catch (e) {
              throw Error("Malformed UTF-8 data");
            }
          },
          parse: function parse(e) {
            return l.parse(unescape(encodeURIComponent(e)));
          } },

        u = i.BufferedBlockAlgorithm = o.extend({
          reset: function reset() {
            this._data = new r.init(), this._nDataBytes = 0;
          },
          _append: function _append(e) {
            "string" == typeof e && (e = p.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
          },
          _process: function _process(t) {
            var n = this._data,
            i = n.words,
            a = n.sigBytes,
            o = this.blockSize,
            s = a / (4 * o),
            s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0);

            if (t = s * o, a = e.min(4 * t, a), t) {
              for (var c = 0; c < t; c += o) {this._doProcessBlock(i, c);}

              c = i.splice(0, t), n.sigBytes -= a;
            }

            return new r.init(c, a);
          },
          clone: function clone() {
            var e = o.clone.call(this);
            return e._data = this._data.clone(), e;
          },
          _minBufferSize: 0 });


        i.Hasher = u.extend({
          cfg: o.extend(),
          init: function init(e) {
            this.cfg = this.cfg.extend(e), this.reset();
          },
          reset: function reset() {
            u.reset.call(this), this._doReset();
          },
          update: function update(e) {
            return this._append(e), this._process(), this;
          },
          finalize: function finalize(e) {
            return e && this._append(e), this._doFinalize();
          },
          blockSize: 16,
          _createHelper: function _createHelper(e) {
            return function (t, n) {
              return new e.init(n).finalize(t);
            };
          },
          _createHmacHelper: function _createHmacHelper(e) {
            return function (t, n) {
              return new d.HMAC.init(e, n).finalize(t);
            };
          } });

        var d = n.algo = {};
        return n;
      }(Math);

      !function () {
        var e = n,
        t = e.lib,
        i = t.WordArray,
        a = t.Hasher,
        o = [],
        t = e.algo.SHA1 = a.extend({
          _doReset: function _doReset() {
            this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function _doProcessBlock(e, t) {
            for (var n = this._hash.words, i = n[0], a = n[1], r = n[2], s = n[3], c = n[4], l = 0; 80 > l; l++) {
              if (16 > l) o[l] = 0 | e[t + l];else {
                var p = o[l - 3] ^ o[l - 8] ^ o[l - 14] ^ o[l - 16];
                o[l] = p << 1 | p >>> 31;
              }
              p = (i << 5 | i >>> 27) + c + o[l], p = 20 > l ? p + (1518500249 + (a & r | ~a & s)) : 40 > l ? p + (1859775393 + (a ^ r ^ s)) : 60 > l ? p + ((a & r | a & s | r & s) - 1894007588) : p + ((a ^ r ^ s) - 899497514), c = s, s = r, r = a << 30 | a >>> 2, a = i, i = p;
            }

            n[0] = n[0] + i | 0, n[1] = n[1] + a | 0, n[2] = n[2] + r | 0, n[3] = n[3] + s | 0, n[4] = n[4] + c | 0;
          },
          _doFinalize: function _doFinalize() {
            var e = this._data,
            t = e.words,
            n = 8 * this._nDataBytes,
            i = 8 * e.sigBytes;
            return t[i >>> 5] |= 128 << 24 - i % 32, t[14 + (i + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), t[15 + (i + 64 >>> 9 << 4)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash;
          },
          clone: function clone() {
            var e = a.clone.call(this);
            return e._hash = this._hash.clone(), e;
          } });

        e.SHA1 = a._createHelper(t), e.HmacSHA1 = a._createHmacHelper(t);
      }(), function () {
        var e = n,
        t = e.enc.Utf8;
        e.algo.HMAC = e.lib.Base.extend({
          init: function init(e, n) {
            e = this._hasher = new e.init(), "string" == typeof n && (n = t.parse(n));
            var i = e.blockSize,
            a = 4 * i;
            n.sigBytes > a && (n = e.finalize(n)), n.clamp();

            for (var o = this._oKey = n.clone(), r = this._iKey = n.clone(), s = o.words, c = r.words, l = 0; l < i; l++) {s[l] ^= 1549556828, c[l] ^= 909522486;}

            o.sigBytes = r.sigBytes = a, this.reset();
          },
          reset: function reset() {
            var e = this._hasher;
            e.reset(), e.update(this._iKey);
          },
          update: function update(e) {
            return this._hasher.update(e), this;
          },
          finalize: function finalize(e) {
            var t = this._hasher;
            return e = t.finalize(e), t.reset(), t.finalize(this._oKey.clone().concat(e));
          } });

      }(), function () {
        var e = n,
        t = e.lib,
        i = t.WordArray,
        a = e.enc;
        a.Base64 = {
          stringify: function stringify(e) {
            var t = e.words,
            n = e.sigBytes,
            i = this._map;
            e.clamp();

            for (var a = [], o = 0; o < n; o += 3) {for (var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255, s = t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, l = r << 16 | s << 8 | c, p = 0; p < 4 && o + .75 * p < n; p++) {a.push(i.charAt(l >>> 6 * (3 - p) & 63));}}

            var u = i.charAt(64);
            if (u) for (; a.length % 4;) {a.push(u);}
            return a.join("");
          },
          parse: function parse(e) {
            var t = e.length,
            n = this._map,
            a = n.charAt(64);

            if (a) {
              var o = e.indexOf(a);
              -1 != o && (t = o);
            }

            for (var r = [], s = 0, c = 0; c < t; c++) {if (c % 4) {
                var l = n.indexOf(e.charAt(c - 1)) << c % 4 * 2,
                p = n.indexOf(e.charAt(c)) >>> 6 - c % 4 * 2;
                r[s >>> 2] |= (l | p) << 24 - s % 4 * 8, s++;
              }}

            return i.create(r, s);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };

      }(), e.exports = n;
    }, function (e, t, n) {
      var i = n(13).DOMParser,
      a = function a(e) {
        "use strict";

        function t(e) {
          var t = e.localName;
          return null == t && (t = e.baseName), null != t && "" != t || (t = e.nodeName), t;
        }

        function n(e) {
          return e.prefix;
        }

        function a(e) {
          return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") : e;
        }

        function o(e, t, n, i) {
          for (var a = 0; a < e.length; a++) {
            var o = e[a];

            if ("string" == typeof o) {
              if (o == i) break;
            } else if (o instanceof RegExp) {
              if (o.test(i)) break;
            } else if ("function" == typeof o && o(t, n, i)) break;
          }

          return a != e.length;
        }

        function r(t, n, i) {
          switch (e.arrayAccessForm) {
            case "property":
              t[n] instanceof Array ? t[n + "_asArray"] = t[n] : t[n + "_asArray"] = [t[n]];}


          !(t[n] instanceof Array) && e.arrayAccessFormPaths.length > 0 && o(e.arrayAccessFormPaths, t, n, i) && (t[n] = [t[n]]);
        }

        function s(e) {
          var t = e.split(/[-T:+Z]/g),
          n = new Date(t[0], t[1] - 1, t[2]),
          i = t[5].split(".");

          if (n.setHours(t[3], t[4], i[0]), i.length > 1 && n.setMilliseconds(i[1]), t[6] && t[7]) {
            var a = 60 * t[6] + Number(t[7]);
            a = 0 + ("-" == (/\d\d-\d\d:\d\d$/.test(e) ? "-" : "+") ? -1 * a : a), n.setMinutes(n.getMinutes() - a - n.getTimezoneOffset());
          } else -1 !== e.indexOf("Z", e.length - 1) && (n = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds())));

          return n;
        }

        function c(t, n, i) {
          if (e.datetimeAccessFormPaths.length > 0) {
            var a = i.split(".#")[0];
            return o(e.datetimeAccessFormPaths, t, n, a) ? s(t) : t;
          }

          return t;
        }

        function l(t, n, i, a) {
          return !(n == S.ELEMENT_NODE && e.xmlElementsFilter.length > 0) || o(e.xmlElementsFilter, t, i, a);
        }

        function p(i, a) {
          if (i.nodeType == S.DOCUMENT_NODE) {
            for (var o = new Object(), s = i.childNodes, u = 0; u < s.length; u++) {
              var d = s.item(u);

              if (d.nodeType == S.ELEMENT_NODE) {
                var m = t(d);
                o[m] = p(d, m);
              }
            }

            return o;
          }

          if (i.nodeType == S.ELEMENT_NODE) {
            var o = new Object();
            o.__cnt = 0;

            for (var s = i.childNodes, u = 0; u < s.length; u++) {
              var d = s.item(u),
              m = t(d);

              if (d.nodeType != S.COMMENT_NODE) {
                var f = a + "." + m;
                l(o, d.nodeType, m, f) && (o.__cnt++, null == o[m] ? (o[m] = p(d, f), r(o, m, f)) : (null != o[m] && (o[m] instanceof Array || (o[m] = [o[m]], r(o, m, f))), o[m][o[m].length] = p(d, f)));
              }
            }

            for (var h = 0; h < i.attributes.length; h++) {
              var g = i.attributes.item(h);
              o.__cnt++, o[e.attributePrefix + g.name] = g.value;
            }

            var v = n(i);
            return null != v && "" != v && (o.__cnt++, o.__prefix = v), null != o["#text"] && (o.__text = o["#text"], o.__text instanceof Array && (o.__text = o.__text.join("\n")), e.stripWhitespaces && (o.__text = o.__text.trim()), delete o["#text"], "property" == e.arrayAccessForm && delete o["#text_asArray"], o.__text = c(o.__text, m, a + "." + m)), null != o["#cdata-section"] && (o.__cdata = o["#cdata-section"], delete o["#cdata-section"], "property" == e.arrayAccessForm && delete o["#cdata-section_asArray"]), 0 == o.__cnt && "text" == e.emptyNodeForm ? o = "" : 1 == o.__cnt && null != o.__text ? o = o.__text : 1 != o.__cnt || null == o.__cdata || e.keepCData ? o.__cnt > 1 && null != o.__text && e.skipEmptyTextNodesForObj && (e.stripWhitespaces && "" == o.__text || "" == o.__text.trim()) && delete o.__text : o = o.__cdata, delete o.__cnt, !e.enableToStringFunc || null == o.__text && null == o.__cdata || (o.toString = function () {
              return (null != this.__text ? this.__text : "") + (null != this.__cdata ? this.__cdata : "");
            }), o;
          }

          if (i.nodeType == S.TEXT_NODE || i.nodeType == S.CDATA_SECTION_NODE) return i.nodeValue;
        }

        function u(t, n, i, o) {
          var r = "<" + (null != t && null != t.__prefix ? t.__prefix + ":" : "") + n;
          if (null != i) for (var s = 0; s < i.length; s++) {
            var c = i[s],
            l = t[c];
            e.escapeMode && (l = a(l)), r += " " + c.substr(e.attributePrefix.length) + "=", e.useDoubleQuotes ? r += '"' + l + '"' : r += "'" + l + "'";
          }
          return r += o ? "/>" : ">";
        }

        function d(e, t) {
          return "</" + (null != e.__prefix ? e.__prefix + ":" : "") + t + ">";
        }

        function m(e, t) {
          return -1 !== e.indexOf(t, e.length - t.length);
        }

        function f(t, n) {
          return !!("property" == e.arrayAccessForm && m(n.toString(), "_asArray") || 0 == n.toString().indexOf(e.attributePrefix) || 0 == n.toString().indexOf("__") || t[n] instanceof Function);
        }

        function h(e) {
          var t = 0;
          if (e instanceof Object) for (var n in e) {f(e, n) || t++;}
          return t;
        }

        function g(t, n, i) {
          return 0 == e.jsonPropertiesFilter.length || "" == i || o(e.jsonPropertiesFilter, t, n, i);
        }

        function v(t) {
          var n = [];
          if (t instanceof Object) for (var i in t) {-1 == i.toString().indexOf("__") && 0 == i.toString().indexOf(e.attributePrefix) && n.push(i);}
          return n;
        }

        function x(t) {
          var n = "";
          return null != t.__cdata && (n += "<![CDATA[" + t.__cdata + "]]>"), null != t.__text && (e.escapeMode ? n += a(t.__text) : n += t.__text), n;
        }

        function y(t) {
          var n = "";
          return t instanceof Object ? n += x(t) : null != t && (e.escapeMode ? n += a(t) : n += t), n;
        }

        function C(e, t) {
          return "" === e ? t : e + "." + t;
        }

        function k(e, t, n, i) {
          var a = "";
          if (0 == e.length) a += u(e, t, n, !0);else for (var o = 0; o < e.length; o++) {a += u(e[o], t, v(e[o]), !1), a += b(e[o], C(i, t)), a += d(e[o], t);}
          return a;
        }

        function b(e, t) {
          var n = "";
          if (h(e) > 0) for (var i in e) {if (!f(e, i) && ("" == t || g(e, i, C(t, i)))) {
              var a = e[i],
              o = v(a);
              if (null == a || void 0 == a) n += u(a, i, o, !0);else if (a instanceof Object) {
                if (a instanceof Array) n += k(a, i, o, t);else if (a instanceof Date) n += u(a, i, o, !1), n += a.toISOString(), n += d(a, i);else {
                  var r = h(a);
                  r > 0 || null != a.__text || null != a.__cdata ? (n += u(a, i, o, !1), n += b(a, C(t, i)), n += d(a, i)) : n += u(a, i, o, !0);
                }
              } else n += u(a, i, o, !1), n += y(a), n += d(a, i);
            }}
          return n += y(e);
        }

        e = e || {}, function () {
          void 0 === e.escapeMode && (e.escapeMode = !0), e.attributePrefix = e.attributePrefix || "_", e.arrayAccessForm = e.arrayAccessForm || "none", e.emptyNodeForm = e.emptyNodeForm || "text", void 0 === e.enableToStringFunc && (e.enableToStringFunc = !0), e.arrayAccessFormPaths = e.arrayAccessFormPaths || [], void 0 === e.skipEmptyTextNodesForObj && (e.skipEmptyTextNodesForObj = !0), void 0 === e.stripWhitespaces && (e.stripWhitespaces = !0), e.datetimeAccessFormPaths = e.datetimeAccessFormPaths || [], void 0 === e.useDoubleQuotes && (e.useDoubleQuotes = !1), e.xmlElementsFilter = e.xmlElementsFilter || [], e.jsonPropertiesFilter = e.jsonPropertiesFilter || [], void 0 === e.keepCData && (e.keepCData = !1);
        }();
        var S = {
          ELEMENT_NODE: 1,
          TEXT_NODE: 3,
          CDATA_SECTION_NODE: 4,
          COMMENT_NODE: 8,
          DOCUMENT_NODE: 9 };

        this.parseXmlString = function (e) {
          if (void 0 === e) return null;
          var t;

          if (i) {
            var n = new i(),
            a = null;

            try {
              a = n.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
            } catch (e) {
              a = null;
            }

            try {
              t = n.parseFromString(e, "text/xml"), null != a && t.getElementsByTagNameNS(a, "parsererror").length > 0 && (t = null);
            } catch (e) {
              t = null;
            }
          } else 0 == e.indexOf("<?") && (e = e.substr(e.indexOf("?>") + 2)), t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e);

          return t;
        }, this.asArray = function (e) {
          return void 0 === e || null == e ? [] : e instanceof Array ? e : [e];
        }, this.toXmlDateTime = function (e) {
          return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null;
        }, this.asDateTime = function (e) {
          return "string" == typeof e ? s(e) : e;
        }, this.xml2json = function (e) {
          return p(e);
        }, this.xml_str2json = function (e) {
          var t = this.parseXmlString(e);
          return null != t ? this.xml2json(t) : null;
        }, this.json2xml_str = function (e) {
          return b(e, "");
        }, this.json2xml = function (e) {
          var t = this.json2xml_str(e);
          return this.parseXmlString(t);
        }, this.getVersion = function () {
          return "1.2.0";
        };
      },
      o = function o(e) {
        if (!e) return null;
        var t = new i(),
        n = t.parseFromString(e, "text/xml"),
        o = new a(),
        r = o.xml2json(n);
        return r.html && r.getElementsByTagName("parsererror").length ? null : r;
      };

      e.exports = o;
    }, function (e, t, n) {
      function i(e) {
        this.options = e || {
          locator: {} };

      }

      function a(e, t, n) {
        function i(t) {
          var i = e[t];
          !i && r && (i = 2 == e.length ? function (n) {
            e(t, n);
          } : e), a[t] = i && function (e) {
            i("[xmldom " + t + "]\t" + e + s(n));
          } || function () {};
        }

        if (!e) {
          if (t instanceof o) return t;
          e = t;
        }

        var a = {},
        r = e instanceof Function;
        return n = n || {}, i("warning"), i("error"), i("fatalError"), a;
      }

      function o() {
        this.cdata = !1;
      }

      function r(e, t) {
        t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
      }

      function s(e) {
        if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
      }

      function c(e, t, n) {
        return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
      }

      function l(e, t) {
        e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
      }

      i.prototype.parseFromString = function (e, t) {
        var n = this.options,
        i = new p(),
        r = n.domBuilder || new o(),
        s = n.errorHandler,
        c = n.locator,
        l = n.xmlns || {},
        u = {
          lt: "<",
          gt: ">",
          amp: "&",
          quot: '"',
          apos: "'" };

        return c && r.setDocumentLocator(c), i.errorHandler = a(s, r, c), i.domBuilder = n.domBuilder || r, /\/x?html?$/.test(t) && (u.nbsp = "\xa0", u.copy = "\xa9", l[""] = "http://www.w3.org/1999/xhtml"), l.xml = l.xml || "http://www.w3.org/XML/1998/namespace", e ? i.parse(e, l, u) : i.errorHandler.error("invalid doc source"), r.doc;
      }, o.prototype = {
        startDocument: function startDocument() {
          this.doc = new u().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
        },
        startElement: function startElement(e, t, n, i) {
          var a = this.doc,
          o = a.createElementNS(e, n || t),
          s = i.length;
          l(this, o), this.currentElement = o, this.locator && r(this.locator, o);

          for (var c = 0; c < s; c++) {
            var e = i.getURI(c),
            p = i.getValue(c),
            n = i.getQName(c),
            u = a.createAttributeNS(e, n);
            this.locator && r(i.getLocator(c), u), u.value = u.nodeValue = p, o.setAttributeNode(u);
          }
        },
        endElement: function endElement(e, t, n) {
          var i = this.currentElement;
          i.tagName;
          this.currentElement = i.parentNode;
        },
        startPrefixMapping: function startPrefixMapping(e, t) {},
        endPrefixMapping: function endPrefixMapping(e) {},
        processingInstruction: function processingInstruction(e, t) {
          var n = this.doc.createProcessingInstruction(e, t);
          this.locator && r(this.locator, n), l(this, n);
        },
        ignorableWhitespace: function ignorableWhitespace(e, t, n) {},
        characters: function characters(e, t, n) {
          if (e = c.apply(this, arguments)) {
            if (this.cdata) var i = this.doc.createCDATASection(e);else var i = this.doc.createTextNode(e);
            this.currentElement ? this.currentElement.appendChild(i) : /^\s*$/.test(e) && this.doc.appendChild(i), this.locator && r(this.locator, i);
          }
        },
        skippedEntity: function skippedEntity(e) {},
        endDocument: function endDocument() {
          this.doc.normalize();
        },
        setDocumentLocator: function setDocumentLocator(e) {
          (this.locator = e) && (e.lineNumber = 0);
        },
        comment: function comment(e, t, n) {
          e = c.apply(this, arguments);
          var i = this.doc.createComment(e);
          this.locator && r(this.locator, i), l(this, i);
        },
        startCDATA: function startCDATA() {
          this.cdata = !0;
        },
        endCDATA: function endCDATA() {
          this.cdata = !1;
        },
        startDTD: function startDTD(e, t, n) {
          var i = this.doc.implementation;

          if (i && i.createDocumentType) {
            var a = i.createDocumentType(e, t, n);
            this.locator && r(this.locator, a), l(this, a);
          }
        },
        warning: function warning(e) {
          console.warn("[xmldom warning]\t" + e, s(this.locator));
        },
        error: function error(e) {
          console.error("[xmldom error]\t" + e, s(this.locator));
        },
        fatalError: function fatalError(e) {
          throw console.error("[xmldom fatalError]\t" + e, s(this.locator)), e;
        } },
      "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (e) {
        o.prototype[e] = function () {
          return null;
        };
      });
      var p = n(14).XMLReader,
      u = t.DOMImplementation = n(2).DOMImplementation;
      t.XMLSerializer = n(2).XMLSerializer, t.DOMParser = i;
    }, function (e, t) {
      function n() {}

      function i(e, t, n, i, l) {
        function m(e) {
          if (e > 65535) {
            e -= 65536;
            var t = 55296 + (e >> 10),
            n = 56320 + (1023 & e);
            return String.fromCharCode(t, n);
          }

          return String.fromCharCode(e);
        }

        function f(e) {
          var t = e.slice(1, -1);
          return t in n ? n[t] : "#" === t.charAt(0) ? m(parseInt(t.substr(1).replace("x", "0x"))) : (l.error("entity not found:" + e), e);
        }

        function h(t) {
          if (t > S) {
            var n = e.substring(S, t).replace(/&#?\w+;/g, f);
            C && g(S), i.characters(n, 0, t - S), S = t;
          }
        }

        function g(t, n) {
          for (; t >= x && (n = y.exec(e));) {v = n.index, x = v + n[0].length, C.lineNumber++;}

          C.columnNumber = t - v + 1;
        }

        for (var v = 0, x = 0, y = /.*(?:\r\n?|\n)|.*$/g, C = i.locator, k = [{
          currentNSMap: t }],
        b = {}, S = 0;;) {
          try {
            var R = e.indexOf("<", S);

            if (R < 0) {
              if (!e.substr(S).match(/^\s*$/)) {
                var w = i.doc,
                _ = w.createTextNode(e.substr(S));

                w.appendChild(_), i.currentElement = _;
              }

              return;
            }

            switch (R > S && h(R), e.charAt(R + 1)) {
              case "/":
                var A = e.indexOf(">", R + 3),
                T = e.substring(R + 2, A),
                E = k.pop();
                A < 0 ? (T = e.substring(R + 2).replace(/[\s<].*/, ""), l.error("end tag name: " + T + " is not complete:" + E.tagName), A = R + 1 + T.length) : T.match(/\s</) && (T = T.replace(/[\s<].*/, ""), l.error("end tag name: " + T + " maybe not complete"), A = R + 1 + T.length);
                var B = E.localNSMap,
                O = E.tagName == T;

                if (O || E.tagName && E.tagName.toLowerCase() == T.toLowerCase()) {
                  if (i.endElement(E.uri, E.localName, T), B) for (var D in B) {i.endPrefixMapping(D);}
                  O || l.fatalError("end tag name: " + T + " is not match the current start tagName:" + E.tagName);
                } else k.push(E);

                A++;
                break;

              case "?":
                C && g(R), A = u(e, R, i);
                break;

              case "!":
                C && g(R), A = p(e, R, i, l);
                break;

              default:
                C && g(R);
                var N = new d(),
                I = k[k.length - 1].currentNSMap,
                A = o(e, R, N, I, f, l),
                P = N.length;

                if (!N.closed && c(e, A, N.tagName, b) && (N.closed = !0, n.nbsp || l.warning("unclosed xml attribute")), C && P) {
                  for (var j = a(C, {}), M = 0; M < P; M++) {
                    var U = N[M];
                    g(U.offset), U.locator = a(C, {});
                  }

                  i.locator = j, r(N, i, I) && k.push(N), i.locator = C;
                } else r(N, i, I) && k.push(N);

                "http://www.w3.org/1999/xhtml" !== N.uri || N.closed ? A++ : A = s(e, A, N.tagName, f, i);}

          } catch (e) {
            l.error("element parse error: " + e), A = -1;
          }

          A > S ? S = A : h(Math.max(R, S) + 1);
        }
      }

      function a(e, t) {
        return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
      }

      function o(e, t, n, i, a, o) {
        for (var r, s, c = ++t, l = x;;) {
          var p = e.charAt(c);

          switch (p) {
            case "=":
              if (l === y) r = e.slice(t, c), l = k;else {
                if (l !== C) throw new Error("attribute equal must after attrName");
                l = k;
              }
              break;

            case "'":
            case '"':
              if (l === k || l === y) {
                if (l === y && (o.warning('attribute value must after "="'), r = e.slice(t, c)), t = c + 1, !((c = e.indexOf(p, t)) > 0)) throw new Error("attribute value no end '" + p + "' match");
                s = e.slice(t, c).replace(/&#?\w+;/g, a), n.add(r, s, t - 1), l = S;
              } else {
                if (l != b) throw new Error('attribute value must after "="');
                s = e.slice(t, c).replace(/&#?\w+;/g, a), n.add(r, s, t), o.warning('attribute "' + r + '" missed start quot(' + p + ")!!"), t = c + 1, l = S;
              }

              break;

            case "/":
              switch (l) {
                case x:
                  n.setTagName(e.slice(t, c));

                case S:
                case R:
                case w:
                  l = w, n.closed = !0;

                case b:
                case y:
                case C:
                  break;

                default:
                  throw new Error("attribute invalid close char('/')");}


              break;

            case "":
              return o.error("unexpected end of input"), l == x && n.setTagName(e.slice(t, c)), c;

            case ">":
              switch (l) {
                case x:
                  n.setTagName(e.slice(t, c));

                case S:
                case R:
                case w:
                  break;

                case b:
                case y:
                  s = e.slice(t, c), "/" === s.slice(-1) && (n.closed = !0, s = s.slice(0, -1));

                case C:
                  l === C && (s = r), l == b ? (o.warning('attribute "' + s + '" missed quot(")!!'), n.add(r, s.replace(/&#?\w+;/g, a), t)) : ("http://www.w3.org/1999/xhtml" === i[""] && s.match(/^(?:disabled|checked|selected)$/i) || o.warning('attribute "' + s + '" missed value!! "' + s + '" instead!!'), n.add(s, s, t));
                  break;

                case k:
                  throw new Error("attribute value missed!!");}


              return c;

            case "\x80":
              p = " ";

            default:
              if (p <= " ") switch (l) {
                case x:
                  n.setTagName(e.slice(t, c)), l = R;
                  break;

                case y:
                  r = e.slice(t, c), l = C;
                  break;

                case b:
                  var s = e.slice(t, c).replace(/&#?\w+;/g, a);
                  o.warning('attribute "' + s + '" missed quot(")!!'), n.add(r, s, t);

                case S:
                  l = R;} else
              switch (l) {
                case C:
                  n.tagName;
                  "http://www.w3.org/1999/xhtml" === i[""] && r.match(/^(?:disabled|checked|selected)$/i) || o.warning('attribute "' + r + '" missed value!! "' + r + '" instead2!!'), n.add(r, r, t), t = c, l = y;
                  break;

                case S:
                  o.warning('attribute space is required"' + r + '"!!');

                case R:
                  l = y, t = c;
                  break;

                case k:
                  l = b, t = c;
                  break;

                case w:
                  throw new Error("elements closed character '/' and '>' must be connected to");}}



          c++;
        }
      }

      function r(e, t, n) {
        for (var i = e.tagName, a = null, o = e.length; o--;) {
          var r = e[o],
          s = r.qName,
          c = r.value,
          p = s.indexOf(":");
          if (p > 0) var u = r.prefix = s.slice(0, p),
          d = s.slice(p + 1),
          m = "xmlns" === u && d;else d = s, u = null, m = "xmlns" === s && "";
          r.localName = d, !1 !== m && (null == a && (a = {}, l(n, n = {})), n[m] = a[m] = c, r.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(m, c));
        }

        for (var o = e.length; o--;) {
          r = e[o];
          var u = r.prefix;
          u && ("xml" === u && (r.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== u && (r.uri = n[u || ""]));
        }

        var p = i.indexOf(":");
        p > 0 ? (u = e.prefix = i.slice(0, p), d = e.localName = i.slice(p + 1)) : (u = null, d = e.localName = i);
        var f = e.uri = n[u || ""];
        if (t.startElement(f, d, i, e), !e.closed) return e.currentNSMap = n, e.localNSMap = a, !0;
        if (t.endElement(f, d, i), a) for (u in a) {t.endPrefixMapping(u);}
      }

      function s(e, t, n, i, a) {
        if (/^(?:script|textarea)$/i.test(n)) {
          var o = e.indexOf("</" + n + ">", t),
          r = e.substring(t + 1, o);
          if (/[&<]/.test(r)) return /^script$/i.test(n) ? (a.characters(r, 0, r.length), o) : (r = r.replace(/&#?\w+;/g, i), a.characters(r, 0, r.length), o);
        }

        return t + 1;
      }

      function c(e, t, n, i) {
        var a = i[n];
        return null == a && (a = e.lastIndexOf("</" + n + ">"), a < t && (a = e.lastIndexOf("</" + n)), i[n] = a), a < t;
      }

      function l(e, t) {
        for (var n in e) {t[n] = e[n];}
      }

      function p(e, t, n, i) {
        switch (e.charAt(t + 2)) {
          case "-":
            if ("-" === e.charAt(t + 3)) {
              var a = e.indexOf("--\x3e", t + 4);
              return a > t ? (n.comment(e, t + 4, a - t - 4), a + 3) : (i.error("Unclosed comment"), -1);
            }

            return -1;

          default:
            if ("CDATA[" == e.substr(t + 3, 6)) {
              var a = e.indexOf("]]>", t + 9);
              return n.startCDATA(), n.characters(e, t + 9, a - t - 9), n.endCDATA(), a + 3;
            }

            var o = f(e, t),
            r = o.length;

            if (r > 1 && /!doctype/i.test(o[0][0])) {
              var s = o[1][0],
              c = r > 3 && /^public$/i.test(o[2][0]) && o[3][0],
              l = r > 4 && o[4][0],
              p = o[r - 1];
              return n.startDTD(s, c && c.replace(/^(['"])(.*?)\1$/, "$2"), l && l.replace(/^(['"])(.*?)\1$/, "$2")), n.endDTD(), p.index + p[0].length;
            }}



        return -1;
      }

      function u(e, t, n) {
        var i = e.indexOf("?>", t);

        if (i) {
          var a = e.substring(t, i).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);

          if (a) {
            a[0].length;
            return n.processingInstruction(a[1], a[2]), i + 2;
          }

          return -1;
        }

        return -1;
      }

      function d(e) {}

      function m(e, t) {
        return e.__proto__ = t, e;
      }

      function f(e, t) {
        var n,
        i = [],
        a = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;

        for (a.lastIndex = t, a.exec(e); n = a.exec(e);) {if (i.push(n), n[1]) return i;}
      }

      var h = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
      g = new RegExp("[\\-\\.0-9" + h.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),
      v = new RegExp("^" + h.source + g.source + "*(?::" + h.source + g.source + "*)?$"),
      x = 0,
      y = 1,
      C = 2,
      k = 3,
      b = 4,
      S = 5,
      R = 6,
      w = 7;
      n.prototype = {
        parse: function parse(e, t, n) {
          var a = this.domBuilder;
          a.startDocument(), l(t, t = {}), i(e, t, n, a, this.errorHandler), a.endDocument();
        } },
      d.prototype = {
        setTagName: function setTagName(e) {
          if (!v.test(e)) throw new Error("invalid tagName:" + e);
          this.tagName = e;
        },
        add: function add(e, t, n) {
          if (!v.test(e)) throw new Error("invalid attribute:" + e);
          this[this.length++] = {
            qName: e,
            value: t,
            offset: n };

        },
        length: 0,
        getLocalName: function getLocalName(e) {
          return this[e].localName;
        },
        getLocator: function getLocator(e) {
          return this[e].locator;
        },
        getQName: function getQName(e) {
          return this[e].qName;
        },
        getURI: function getURI(e) {
          return this[e].uri;
        },
        getValue: function getValue(e) {
          return this[e].value;
        } },
      m({}, m.prototype) instanceof m || (m = function m(e, t) {
        function n() {}

        n.prototype = t, n = new n();

        for (t in e) {n[t] = e[t];}

        return n;
      }), t.XMLReader = n;
    }, function (e, t) {
      function n(e) {
        return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(a, "");
      }

      var i = new RegExp("^([^a-zA-Z_\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD])|^((x|X)(m|M)(l|L))|([^a-zA-Z_\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD-.0-9\xB7\u0300-\u036F\u203F\u2040])", "g"),
      a = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
      o = function o(e) {
        var t = [];
        if (e instanceof Object) for (var n in e) {e.hasOwnProperty(n) && t.push(n);}
        return t;
      },
      r = function r(e, t) {
        var a = function a(e, n, _a, o, r) {
          var s = void 0 !== t.indent ? t.indent : "\t",
          c = t.prettyPrint ? "\n" + new Array(o).join(s) : "";
          t.removeIllegalNameCharacters && (e = e.replace(i, "_"));
          var l = [c, "<", e, _a || ""];
          return n && n.length > 0 ? (l.push(">"), l.push(n), r && l.push(c), l.push("</"), l.push(e), l.push(">")) : l.push("/>"), l.join("");
        };

        return function e(i, r, s) {
          var c = typeof i;

          switch ((Array.isArray ? Array.isArray(i) : i instanceof Array) ? c = "array" : i instanceof Date && (c = "date"), c) {
            case "array":
              var l = [];
              return i.map(function (t) {
                l.push(e(t, 1, s + 1));
              }), t.prettyPrint && l.push("\n"), l.join("");

            case "date":
              return i.toJSON ? i.toJSON() : i + "";

            case "object":
              var p = [];

              for (var u in i) {if (i.hasOwnProperty(u)) if (i[u] instanceof Array) for (var d in i[u]) {i[u].hasOwnProperty(d) && p.push(a(u, e(i[u][d], 0, s + 1), null, s + 1, o(i[u][d]).length));} else p.push(a(u, e(i[u], 0, s + 1), null, s + 1));}

              return t.prettyPrint && p.length > 0 && p.push("\n"), p.join("");

            case "function":
              return i();

            default:
              return t.escape ? n(i) : "" + i;}

        }(e, 0, 0);
      },
      s = function s(e) {
        var t = ['<?xml version="1.0" encoding="UTF-8"'];
        return e && t.push(' standalone="yes"'), t.push("?>"), t.join("");
      },
      c = function c(e, t) {
        if (t || (t = {
          xmlHeader: {
            standalone: !0 },

          prettyPrint: !0,
          indent: "  " }),
        "string" == typeof e) try {
          e = JSON.parse(e.toString());
        } catch (e) {
          return !1;
        }
        var n = "",
        i = "";
        return t && ("object" == typeof t ? (t.xmlHeader && (n = s(!!t.xmlHeader.standalone)), void 0 !== t.docType && (i = "<!DOCTYPE " + t.docType + ">")) : n = s()), t = t || {}, [n, t.prettyPrint && i ? "\n" : "", i, r(e, t)].join("").replace(/\n{2,}/g, "\n").replace(/\s+$/g, "");
      };

      e.exports = c;
    }, function (e, t, n) {
      var i = n(5),
      a = n(0),
      o = {},
      r = function r(e, t) {
        o[t] = e[t], e[t] = function (e, n) {
          e.SkipTask ? o[t].call(this, e, n) : this._addTask(t, e, n);
        };
      },
      s = function s(e) {
        var t = [],
        n = {},
        r = 0,
        s = 0,
        c = function c(e) {
          var t = {
            id: e.id,
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            FilePath: e.FilePath,
            state: e.state,
            loaded: e.loaded,
            size: e.size,
            speed: e.speed,
            percent: e.percent,
            hashPercent: e.hashPercent,
            error: e.error };

          return e.FilePath && (t.FilePath = e.FilePath), t;
        },
        l = function () {
          var n,
          i = function i() {
            n = 0, e.emit("task-list-update", {
              list: a.map(t, c) }),
            e.emit("list-update", {
              list: a.map(t, c) });

          };

          return function () {
            n || (n = setTimeout(i));
          };
        }(),
        p = function p() {
          if (!(t.length <= e.options.UploadQueueSize)) {
            for (var i = 0; i < s && i < t.length && t.length > e.options.UploadQueueSize;) {
              var a = "waiting" === t[i].state || "checking" === t[i].state || "uploading" === t[i].state;
              t[i] && a ? i++ : (n[t[i].id] && delete n[t[i].id], t.splice(i, 1), s--);
            }

            l();
          }
        },
        u = function u() {
          if (!(r >= e.options.FileParallelLimit)) {
            for (; t[s] && "waiting" !== t[s].state;) {s++;}

            if (!(s >= t.length)) {
              var n = t[s];
              s++, r++, n.state = "checking", n.params.onTaskStart && n.params.onTaskStart(c(n)), !n.params.UploadData && (n.params.UploadData = {});
              var i = a.formatParams(n.api, n.params);
              o[n.api].call(e, i, function (t, i) {
                e._isRunningTask(n.id) && ("checking" !== n.state && "uploading" !== n.state || (n.state = t ? "error" : "success", t && (n.error = t), r--, l(), u(), n.callback && n.callback(t, i), "success" === n.state && (n.params && (delete n.params.UploadData, delete n.params.Body, delete n.params), delete n.callback)), p());
              }), l(), setTimeout(u);
            }
          }
        },
        d = function d(t, a) {
          var o = n[t];

          if (o) {
            var s = o && "waiting" === o.state,
            c = o && ("checking" === o.state || "uploading" === o.state);

            if ("canceled" === a && "canceled" !== o.state || "paused" === a && s || "paused" === a && c) {
              if ("paused" === a && o.params.Body && "function" == typeof o.params.Body.pipe) return void console.error("stream not support pause");
              o.state = a, e.emit("inner-kill-task", {
                TaskId: t,
                toState: a });


              try {
                var d = o && o.params && o.params.UploadData.UploadId;
              } catch (e) {}

              "canceled" === a && d && i.removeUsing(d), l(), c && (r--, u()), "canceled" === a && (o.params && (delete o.params.UploadData, delete o.params.Body, delete o.params), delete o.callback);
            }

            p();
          }
        };

        e._addTasks = function (t) {
          a.each(t, function (t) {
            e._addTask(t.api, t.params, t.callback, !0);
          }), l();
        }, e._addTask = function (i, o, r, s) {
          "sliceUploadFile" !== i || a.canFileSlice() || (i = "postObject"), o = a.formatParams(i, o);
          var c = a.uuid();
          o.TaskId = c, o.onTaskReady && o.onTaskReady(c);
          var d = {
            params: o,
            callback: r,
            api: i,
            index: t.length,
            id: c,
            Bucket: o.Bucket,
            Region: o.Region,
            Key: o.Key,
            FilePath: o.FilePath || "",
            state: "waiting",
            loaded: 0,
            size: 0,
            speed: 0,
            percent: 0,
            hashPercent: 0,
            error: null },

          m = o.onHashProgress;

          o.onHashProgress = function (t) {
            e._isRunningTask(d.id) && (d.hashPercent = t.percent, m && m(t), l());
          };

          var f = o.onProgress;
          return o.onProgress = function (t) {
            e._isRunningTask(d.id) && ("checking" === d.state && (d.state = "uploading"), d.loaded = t.loaded, d.size = t.total, d.speed = t.speed, d.percent = t.percent, f && f(t), l());
          }, a.getFileSize(i, o, function (e, i) {
            if (e) return void r(e);
            n[c] = d, t.push(d), d.size = i, !s && l(), u(), p();
          }), c;
        }, e._isRunningTask = function (e) {
          var t = n[e];
          return !(!t || "checking" !== t.state && "uploading" !== t.state);
        }, e.getTaskList = function () {
          return a.map(t, c);
        }, e.cancelTask = function (e) {
          d(e, "canceled");
        }, e.pauseTask = function (e) {
          d(e, "paused");
        }, e.restartTask = function (e) {
          var t = n[e];
          !t || "paused" !== t.state && "error" !== t.state || (t.state = "waiting", l(), s = Math.min(s, t.index), u());
        }, e.isUploadRunning = function () {
          return r || s < t.length;
        };
      };

      e.exports.transferToTaskMethod = r, e.exports.init = s;
    }, function (e, t, n) {
      "use strict";

      function i(e, t) {
        "function" == typeof e && (t = e, e = {});
        var n = this.options.ServiceDomain,
        i = e.Region;
        n ? (n = n.replace(/\{\{Region\}\}/gi, i || "").replace(/\{\{.*?\}\}/gi, ""), /^[a-zA-Z]+:\/\//.test(n) || (n = "https://" + n), "/" === n.slice(-1) && (n = n.slice(0, -1))) : n = i ? "https://cos." + i + ".myqcloud.com" : "https://service.cos.myqcloud.com", be.call(this, {
          Action: "name/cos:GetService",
          url: n,
          method: "GET",
          headers: e.Headers },
        function (e, n) {
          if (e) return t(e);
          var i = n && n.ListAllMyBucketsResult && n.ListAllMyBucketsResult.Buckets && n.ListAllMyBucketsResult.Buckets.Bucket || [];
          i = _e.isArray(i) ? i : [i];
          var a = n && n.ListAllMyBucketsResult && n.ListAllMyBucketsResult.Owner || {};
          t(null, {
            Buckets: i,
            Owner: a,
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function a(e, t) {
        var n = this,
        i = "";

        if (e.BucketAZConfig) {
          var a = {
            BucketAZConfig: e.BucketAZConfig };

          i = _e.json2xml({
            CreateBucketConfiguration: a });

        }

        be.call(this, {
          Action: "name/cos:PutBucket",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          body: i },
        function (i, a) {
          if (i) return t(i);
          var o = ye({
            protocol: n.options.Protocol,
            domain: n.options.Domain,
            bucket: e.Bucket,
            region: e.Region,
            isLocation: !0 });

          t(null, {
            Location: o,
            statusCode: a.statusCode,
            headers: a.headers });

        });
      }

      function o(e, t) {
        be.call(this, {
          Action: "name/cos:HeadBucket",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          method: "HEAD" },
        function (e, n) {
          t(e, n);
        });
      }

      function r(e, t) {
        var n = {};
        n.prefix = e.Prefix || "", n.delimiter = e.Delimiter, n.marker = e.Marker, n["max-keys"] = e.MaxKeys, n["encoding-type"] = e.EncodingType, be.call(this, {
          Action: "name/cos:GetBucket",
          ResourceKey: n.prefix,
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          qs: n },
        function (e, n) {
          if (e) return t(e);
          var i = n.ListBucketResult || {},
          a = i.Contents || [],
          o = i.CommonPrefixes || [];
          a = _e.isArray(a) ? a : [a], o = _e.isArray(o) ? o : [o];

          var r = _e.clone(i);

          _e.extend(r, {
            Contents: a,
            CommonPrefixes: o,
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, r);
        });
      }

      function s(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucket",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          method: "DELETE" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function c(e, t) {
        var n = e.Headers,
        i = "";

        if (e.AccessControlPolicy) {
          var a = _e.clone(e.AccessControlPolicy || {}),
          o = a.Grants || a.Grant;

          o = _e.isArray(o) ? o : [o], delete a.Grant, delete a.Grants, a.AccessControlList = {
            Grant: o },
          i = _e.json2xml({
            AccessControlPolicy: a }),
          n["Content-Type"] = "application/xml", n["Content-MD5"] = _e.binaryBase64(_e.md5(i));
        }

        _e.each(n, function (e, t) {
          0 === t.indexOf("x-cos-grant-") && (n[t] = xe(n[t]));
        }), be.call(this, {
          Action: "name/cos:PutBucketACL",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: n,
          action: "acl",
          body: i },
        function (e, n) {
          if (e) return t(e);
          t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function l(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketACL",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "acl" },
        function (e, n) {
          if (e) return t(e);
          var i = n.AccessControlPolicy || {},
          a = i.Owner || {},
          o = i.AccessControlList.Grant || [];
          o = _e.isArray(o) ? o : [o];
          var r = ve(i);
          n.headers && n.headers["x-cos-acl"] && (r.ACL = n.headers["x-cos-acl"]), r = _e.extend(r, {
            Owner: a,
            Grants: o,
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, r);
        });
      }

      function p(e, t) {
        var n = e.CORSConfiguration || {},
        i = n.CORSRules || e.CORSRules || [];
        i = _e.clone(_e.isArray(i) ? i : [i]), _e.each(i, function (e) {
          _e.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function (t) {
            var n = t + "s",
            i = e[n] || e[t] || [];
            delete e[n], e[t] = _e.isArray(i) ? i : [i];
          });
        });

        var a = _e.json2xml({
          CORSConfiguration: {
            CORSRule: i } }),


        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Action: "name/cos:PutBucketCORS",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: a,
          action: "cors",
          headers: o },
        function (e, n) {
          if (e) return t(e);
          t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function u(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketCORS",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "cors" },
        function (e, n) {
          if (e) {
            if (404 === e.statusCode && e.error && "NoSuchCORSConfiguration" === e.error.Code) {
              var i = {
                CORSRules: [],
                statusCode: e.statusCode };

              e.headers && (i.headers = e.headers), t(null, i);
            } else t(e);
          } else {
            var a = n.CORSConfiguration || {},
            o = a.CORSRules || a.CORSRule || [];
            o = _e.clone(_e.isArray(o) ? o : [o]), _e.each(o, function (e) {
              _e.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function (t) {
                var n = t + "s",
                i = e[n] || e[t] || [];
                delete e[t], e[n] = _e.isArray(i) ? i : [i];
              });
            }), t(null, {
              CORSRules: o,
              statusCode: n.statusCode,
              headers: n.headers });

          }
        });
      }

      function d(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketCORS",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "cors" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode || e.statusCode,
            headers: n.headers });

        });
      }

      function m(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketLocation",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "location" },
        function (e, n) {
          if (e) return t(e);
          t(null, n);
        });
      }

      function f(e, t) {
        var n = e.Policy,
        i = n;

        try {
          "string" == typeof n ? n = JSON.parse(i) : i = JSON.stringify(n);
        } catch (e) {
          t({
            error: "Policy format error" });

        }

        var a = e.Headers;
        a["Content-Type"] = "application/json", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, {
          Action: "name/cos:PutBucketPolicy",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          action: "policy",
          body: i,
          headers: a,
          json: !0 },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function h(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketPolicy",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "policy",
          rawBody: !0 },
        function (e, n) {
          if (e) return t(e.statusCode && 403 === e.statusCode ? {
            ErrorStatus: "Access Denied" } :
          e.statusCode && 405 === e.statusCode ? {
            ErrorStatus: "Method Not Allowed" } :
          e.statusCode && 404 === e.statusCode ? {
            ErrorStatus: "Policy Not Found" } :
          e);
          var i = {};

          try {
            i = JSON.parse(n.body);
          } catch (e) {}

          t(null, {
            Policy: i,
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function g(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketPolicy",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "policy" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode || e.statusCode,
            headers: n.headers });

        });
      }

      function v(e, t) {
        var n = e.Tagging || {},
        i = n.TagSet || n.Tags || e.Tags || [];
        i = _e.clone(_e.isArray(i) ? i : [i]);

        var a = _e.json2xml({
          Tagging: {
            TagSet: {
              Tag: i } } }),



        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Action: "name/cos:PutBucketTagging",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: a,
          action: "tagging",
          headers: o },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function x(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketTagging",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "tagging" },
        function (e, n) {
          if (e) {
            if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "NoSuchTagSet" !== e.error.Code) t(e);else {
              var i = {
                Tags: [],
                statusCode: e.statusCode };

              e.headers && (i.headers = e.headers), t(null, i);
            }
          } else {
            var a = [];

            try {
              a = n.Tagging.TagSet.Tag || [];
            } catch (e) {}

            a = _e.clone(_e.isArray(a) ? a : [a]), t(null, {
              Tags: a,
              statusCode: n.statusCode,
              headers: n.headers });

          }
        });
      }

      function y(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketTagging",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "tagging" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function C(e, t) {
        var n = e.LifecycleConfiguration || {},
        i = n.Rules || e.Rules || [];
        i = _e.clone(i);

        var a = _e.json2xml({
          LifecycleConfiguration: {
            Rule: i } }),


        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Action: "name/cos:PutBucketLifecycle",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: a,
          action: "lifecycle",
          headers: o },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function k(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketLifecycle",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "lifecycle" },
        function (e, n) {
          if (e) {
            if (404 === e.statusCode && e.error && "NoSuchLifecycleConfiguration" === e.error.Code) {
              var i = {
                Rules: [],
                statusCode: e.statusCode };

              e.headers && (i.headers = e.headers), t(null, i);
            } else t(e);
          } else {
            var a = [];

            try {
              a = n.LifecycleConfiguration.Rule || [];
            } catch (e) {}

            a = _e.clone(_e.isArray(a) ? a : [a]), t(null, {
              Rules: a,
              statusCode: n.statusCode,
              headers: n.headers });

          }
        });
      }

      function b(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketLifecycle",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "lifecycle" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function S(e, t) {
        if (!e.VersioningConfiguration) return void t({
          error: "missing param VersioningConfiguration" });


        var n = e.VersioningConfiguration || {},
        i = _e.json2xml({
          VersioningConfiguration: n }),

        a = e.Headers;

        a["Content-Type"] = "application/xml", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, {
          Action: "name/cos:PutBucketVersioning",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: i,
          action: "versioning",
          headers: a },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function R(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketVersioning",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "versioning" },
        function (e, n) {
          e || !n.VersioningConfiguration && (n.VersioningConfiguration = {}), t(e, n);
        });
      }

      function w(e, t) {
        var n = _e.clone(e.ReplicationConfiguration),
        i = _e.json2xml({
          ReplicationConfiguration: n });


        i = i.replace(/<(\/?)Rules>/gi, "<$1Rule>"), i = i.replace(/<(\/?)Tags>/gi, "<$1Tag>");
        var a = e.Headers;
        a["Content-Type"] = "application/xml", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, {
          Action: "name/cos:PutBucketReplication",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: i,
          action: "replication",
          headers: a },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function _(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketReplication",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "replication" },
        function (e, n) {
          if (e) {
            if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "ReplicationConfigurationnotFoundError" !== e.error.Code) t(e);else {
              var i = {
                ReplicationConfiguration: {
                  Rules: [] },

                statusCode: e.statusCode };

              e.headers && (i.headers = e.headers), t(null, i);
            }
          } else e || !n.ReplicationConfiguration && (n.ReplicationConfiguration = {}), n.ReplicationConfiguration.Rule && (n.ReplicationConfiguration.Rules = n.ReplicationConfiguration.Rule, delete n.ReplicationConfiguration.Rule), t(e, n);
        });
      }

      function A(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketReplication",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "replication" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function T(e, t) {
        if (!e.WebsiteConfiguration) return void t({
          error: "missing param WebsiteConfiguration" });


        var n = _e.clone(e.WebsiteConfiguration || {}),
        i = n.RoutingRules || n.RoutingRule || [];

        i = _e.isArray(i) ? i : [i], delete n.RoutingRule, delete n.RoutingRules, i.length && (n.RoutingRules = {
          RoutingRule: i });


        var a = _e.json2xml({
          WebsiteConfiguration: n }),

        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Action: "name/cos:PutBucketWebsite",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: a,
          action: "website",
          headers: o },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function E(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketWebsite",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: e.Headers,
          action: "website" },
        function (e, n) {
          if (e) {
            if (404 === e.statusCode && "NoSuchWebsiteConfiguration" === e.error.Code) {
              var i = {
                WebsiteConfiguration: {},
                statusCode: e.statusCode };

              e.headers && (i.headers = e.headers), t(null, i);
            } else t(e);
          } else {
            var a = n.WebsiteConfiguration || {};

            if (a.RoutingRules) {
              var o = _e.clone(a.RoutingRules.RoutingRule || []);

              o = _e.makeArray(o), a.RoutingRules = o;
            }

            t(null, {
              WebsiteConfiguration: a,
              statusCode: n.statusCode,
              headers: n.headers });

          }
        });
      }

      function B(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketWebsite",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "website" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function O(e, t) {
        if (!e.RefererConfiguration) return void t({
          error: "missing param RefererConfiguration" });


        var n = _e.clone(e.RefererConfiguration || {}),
        i = n.DomainList || {},
        a = i.Domains || i.Domain || [];

        a = _e.isArray(a) ? a : [a], a.length && (n.DomainList = {
          Domain: a });


        var o = _e.json2xml({
          RefererConfiguration: n }),

        r = e.Headers;

        r["Content-Type"] = "application/xml", r["Content-MD5"] = _e.binaryBase64(_e.md5(o)), be.call(this, {
          Action: "name/cos:PutBucketReferer",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: o,
          action: "referer",
          headers: r },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function D(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketReferer",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: e.Headers,
          action: "referer" },
        function (e, n) {
          if (e) {
            if (404 === e.statusCode && "NoSuchRefererConfiguration" === e.error.Code) {
              var i = {
                WebsiteConfiguration: {},
                statusCode: e.statusCode };

              e.headers && (i.headers = e.headers), t(null, i);
            } else t(e);
          } else {
            var a = n.RefererConfiguration || {};

            if (a.DomainList) {
              var o = _e.clone(a.DomainList.Domain || []);

              o = _e.makeArray(o), a.DomainList = {
                Domains: o };

            }

            t(null, {
              RefererConfiguration: a,
              statusCode: n.statusCode,
              headers: n.headers });

          }
        });
      }

      function N(e, t) {
        var n = e.DomainConfiguration || {},
        i = n.DomainRule || e.DomainRule || [];
        i = _e.clone(i);

        var a = _e.json2xml({
          DomainConfiguration: {
            DomainRule: i } }),


        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Action: "name/cos:PutBucketDomain",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: a,
          action: "domain",
          headers: o },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function I(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketDomain",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "domain" },
        function (e, n) {
          if (e) return t(e);
          var i = [];

          try {
            i = n.DomainConfiguration.DomainRule || [];
          } catch (e) {}

          i = _e.clone(_e.isArray(i) ? i : [i]), t(null, {
            DomainRule: i,
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function P(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketDomain",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "domain" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function j(e, t) {
        var n = e.OriginConfiguration || {},
        i = n.OriginRule || e.OriginRule || [];
        i = _e.clone(i);

        var a = _e.json2xml({
          OriginConfiguration: {
            OriginRule: i } }),


        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Action: "name/cos:PutBucketOrigin",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: a,
          action: "origin",
          headers: o },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function M(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketOrigin",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "origin" },
        function (e, n) {
          if (e) return t(e);
          var i = [];

          try {
            i = n.OriginConfiguration.OriginRule || [];
          } catch (e) {}

          i = _e.clone(_e.isArray(i) ? i : [i]), t(null, {
            OriginRule: i,
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function U(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketOrigin",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "origin" },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function F(e, t) {
        var n = _e.json2xml({
          BucketLoggingStatus: e.BucketLoggingStatus || "" }),

        i = e.Headers;

        i["Content-Type"] = "application/xml", i["Content-MD5"] = _e.binaryBase64(_e.md5(n)), be.call(this, {
          Action: "name/cos:PutBucketLogging",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: n,
          action: "logging",
          headers: i },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function H(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketLogging",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "logging" },
        function (e, n) {
          if (e) return t(e);
          delete n.BucketLoggingStatus._xmlns, t(null, {
            BucketLoggingStatus: n.BucketLoggingStatus,
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function L(e, t) {
        var n = _e.clone(e.InventoryConfiguration);

        if (n.OptionalFields) {
          var i = n.OptionalFields || [];
          n.OptionalFields = {
            Field: i };

        }

        if (n.Destination && n.Destination.COSBucketDestination && n.Destination.COSBucketDestination.Encryption) {
          var a = n.Destination.COSBucketDestination.Encryption;
          Object.keys(a).indexOf("SSECOS") > -1 && (a["SSE-COS"] = a.SSECOS, delete a.SSECOS);
        }

        var o = _e.json2xml({
          InventoryConfiguration: n }),

        r = e.Headers;

        r["Content-Type"] = "application/xml", r["Content-MD5"] = _e.binaryBase64(_e.md5(o)), be.call(this, {
          Action: "name/cos:PutBucketInventory",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: o,
          action: "inventory",
          qs: {
            id: e.Id },

          headers: r },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function z(e, t) {
        be.call(this, {
          Action: "name/cos:GetBucketInventory",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "inventory",
          qs: {
            id: e.Id } },

        function (e, n) {
          if (e) return t(e);
          var i = n.InventoryConfiguration;

          if (i && i.OptionalFields && i.OptionalFields.Field) {
            var a = i.OptionalFields.Field;
            _e.isArray(a) || (a = [a]), i.OptionalFields = a;
          }

          if (i.Destination && i.Destination.COSBucketDestination && i.Destination.COSBucketDestination.Encryption) {
            var o = i.Destination.COSBucketDestination.Encryption;
            Object.keys(o).indexOf("SSE-COS") > -1 && (o.SSECOS = o["SSE-COS"], delete o["SSE-COS"]);
          }

          t(null, {
            InventoryConfiguration: i,
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function K(e, t) {
        be.call(this, {
          Action: "name/cos:ListBucketInventory",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "inventory",
          qs: {
            "continuation-token": e.ContinuationToken } },

        function (e, n) {
          if (e) return t(e);
          var i = n.ListInventoryConfigurationResult,
          a = i.InventoryConfiguration || [];
          a = _e.isArray(a) ? a : [a], delete i.InventoryConfiguration, _e.each(a, function (e) {
            if (e && e.OptionalFields && e.OptionalFields.Field) {
              var t = e.OptionalFields.Field;
              _e.isArray(t) || (t = [t]), e.OptionalFields = t;
            }

            if (e.Destination && e.Destination.COSBucketDestination && e.Destination.COSBucketDestination.Encryption) {
              var n = e.Destination.COSBucketDestination.Encryption;
              Object.keys(n).indexOf("SSE-COS") > -1 && (n.SSECOS = n["SSE-COS"], delete n["SSE-COS"]);
            }
          }), i.InventoryConfigurations = a, _e.extend(i, {
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, i);
        });
      }

      function q(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteBucketInventory",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "inventory",
          qs: {
            id: e.Id } },

        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function G(e, t) {
        if (!e.AccelerateConfiguration) return void t({
          error: "missing param AccelerateConfiguration" });


        var n = {
          AccelerateConfiguration: e.AccelerateConfiguration || {} },

        i = _e.json2xml(n),
        a = {};

        a["Content-Type"] = "application/xml", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, {
          Interface: "putBucketAccelerate",
          Action: "name/cos:PutBucketAccelerate",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          body: i,
          action: "accelerate",
          headers: a },
        function (e, n) {
          if (e) return t(e);
          t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function V(e, t) {
        be.call(this, {
          Interface: "getBucketAccelerate",
          Action: "name/cos:GetBucketAccelerate",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          action: "accelerate" },
        function (e, n) {
          e || !n.AccelerateConfiguration && (n.AccelerateConfiguration = {}), t(e, n);
        });
      }

      function X(e, t) {
        be.call(this, {
          Action: "name/cos:HeadObject",
          method: "HEAD",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          VersionId: e.VersionId,
          headers: e.Headers },
        function (n, i) {
          if (n) {
            var a = n.statusCode;
            return e.Headers["If-Modified-Since"] && a && 304 === a ? t(null, {
              NotModified: !0,
              statusCode: a }) :
            t(n);
          }

          i.ETag = _e.attr(i.headers, "etag", ""), t(null, i);
        });
      }

      function W(e, t) {
        var n = {};
        n.prefix = e.Prefix || "", n.delimiter = e.Delimiter, n["key-marker"] = e.KeyMarker, n["version-id-marker"] = e.VersionIdMarker, n["max-keys"] = e.MaxKeys, n["encoding-type"] = e.EncodingType, be.call(this, {
          Action: "name/cos:GetBucketObjectVersions",
          ResourceKey: n.prefix,
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          qs: n,
          action: "versions" },
        function (e, n) {
          if (e) return t(e);
          var i = n.ListVersionsResult || {},
          a = i.DeleteMarker || [];
          a = _e.isArray(a) ? a : [a];
          var o = i.Version || [];
          o = _e.isArray(o) ? o : [o];

          var r = _e.clone(i);

          delete r.DeleteMarker, delete r.Version, _e.extend(r, {
            DeleteMarkers: a,
            Versions: o,
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, r);
        });
      }

      function $(e, t) {
        var n = e.Query || {};
        n["response-content-type"] = e.ResponseContentType, n["response-content-language"] = e.ResponseContentLanguage, n["response-expires"] = e.ResponseExpires, n["response-cache-control"] = e.ResponseCacheControl, n["response-content-disposition"] = e.ResponseContentDisposition, n["response-content-encoding"] = e.ResponseContentEncoding, be.call(this, {
          Action: "name/cos:GetObject",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          VersionId: e.VersionId,
          headers: e.Headers,
          qs: n,
          rawBody: !0 },
        function (n, i) {
          if (n) {
            var a = n.statusCode;
            return e.Headers["If-Modified-Since"] && a && 304 === a ? t(null, {
              NotModified: !0 }) :
            t(n);
          }

          t(null, {
            Body: i.body,
            ETag: _e.attr(i.headers, "etag", ""),
            statusCode: i.statusCode,
            headers: i.headers });

        });
      }

      function Q(e, t) {
        var n = this,
        i = e.ContentLength,
        a = _e.throttleOnProgress.call(n, i, e.onProgress),
        o = e.Headers;

        o["Cache-Control"] || o["cache-control"] || (o["Cache-Control"] = ""), o["Content-Type"] || o["content-type"] || (o["Content-Type"] = Ae.getType(e.Key) || "application/octet-stream"), _e.getBodyMd5(n.options.UploadCheckContentMd5, e.Body, function (r) {
          r && (o["Content-MD5"] = _e.binaryBase64(r)), void 0 !== e.ContentLength && (o["Content-Length"] = e.ContentLength), a(null, !0), be.call(n, {
            Action: "name/cos:PutObject",
            TaskId: e.TaskId,
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            qs: e.Query,
            body: e.Body,
            onProgress: a },
          function (o, r) {
            if (o) return a(null, !0), t(o);
            a({
              loaded: i,
              total: i },
            !0);
            var s = ye({
              ForcePathStyle: n.options.ForcePathStyle,
              protocol: n.options.Protocol,
              domain: n.options.Domain,
              bucket: e.Bucket,
              region: e.Region,
              object: e.Key });

            s = s.substr(s.indexOf("://") + 3), r.Location = s, r.ETag = _e.attr(r.headers, "etag", ""), t(null, r);
          });
        });
      }

      function J(e, t) {
        var n = this,
        i = {},
        a = e.FilePath;
        if (!a) return void t({
          error: "missing param FilePath" });

        i["Cache-Control"] = e.CacheControl, i["Content-Disposition"] = e.ContentDisposition, i["Content-Encoding"] = e.ContentEncoding, i["Content-MD5"] = e.ContentMD5, i["Content-Length"] = e.ContentLength, i["Content-Type"] = e.ContentType, i.Expect = e.Expect, i.Expires = e.Expires, i["x-cos-acl"] = e.ACL, i["x-cos-grant-read"] = e.GrantRead, i["x-cos-grant-write"] = e.GrantWrite, i["x-cos-grant-full-control"] = e.GrantFullControl, i["x-cos-storage-class"] = e.StorageClass, delete i["Content-Length"], delete i["content-length"];

        for (var o in e) {o.indexOf("x-cos-meta-") > -1 && (i[o] = e[o]);}

        var r = _e.throttleOnProgress.call(n, i["Content-Length"], e.onProgress);

        be.call(this, {
          Action: "name/cos:PostObject",
          method: "POST",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: i,
          qs: e.Query,
          filePath: a,
          onProgress: r },
        function (i, o) {
          if (r(null, !0), i) return t(i);

          if (o && o.headers) {
            var s = o.headers,
            c = s.etag || s.Etag || s.ETag || "",
            l = a.substr(a.lastIndexOf("/") + 1),
            p = ye({
              ForcePathStyle: n.options.ForcePathStyle,
              protocol: n.options.Protocol,
              domain: n.options.Domain,
              bucket: e.Bucket,
              region: e.Region,
              object: e.Key.replace(/\$\{filename\}/g, l),
              isLocation: !0 });

            return t(null, {
              Location: p,
              statusCode: o.statusCode,
              headers: s,
              ETag: c });

          }

          t(null, o);
        });
      }

      function Y(e, t) {
        be.call(this, {
          Action: "name/cos:DeleteObject",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: e.Headers,
          VersionId: e.VersionId },
        function (e, n) {
          if (e) {
            var i = e.statusCode;
            return i && 204 === i ? t(null, {
              statusCode: i }) :
            i && 404 === i ? t(null, {
              BucketNotFound: !0,
              statusCode: i }) :
            t(e);
          }

          t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function Z(e, t) {
        be.call(this, {
          Action: "name/cos:GetObjectACL",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: e.Headers,
          action: "acl" },
        function (e, n) {
          if (e) return t(e);
          var i = n.AccessControlPolicy || {},
          a = i.Owner || {},
          o = i.AccessControlList && i.AccessControlList.Grant || [];
          o = _e.isArray(o) ? o : [o];
          var r = ve(i);
          n.headers && n.headers["x-cos-acl"] && (r.ACL = n.headers["x-cos-acl"]), r = _e.extend(r, {
            Owner: a,
            Grants: o,
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, r);
        });
      }

      function ee(e, t) {
        var n = e.Headers,
        i = "";

        if (e.AccessControlPolicy) {
          var a = _e.clone(e.AccessControlPolicy || {}),
          o = a.Grants || a.Grant;

          o = _e.isArray(o) ? o : [o], delete a.Grant, delete a.Grants, a.AccessControlList = {
            Grant: o },
          i = _e.json2xml({
            AccessControlPolicy: a }),
          n["Content-Type"] = "application/xml", n["Content-MD5"] = _e.binaryBase64(_e.md5(i));
        }

        _e.each(n, function (e, t) {
          0 === t.indexOf("x-cos-grant-") && (n[t] = xe(n[t]));
        }), be.call(this, {
          Action: "name/cos:PutObjectACL",
          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          action: "acl",
          headers: n,
          body: i },
        function (e, n) {
          if (e) return t(e);
          t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function te(e, t) {
        var n = e.Headers;
        n.Origin = e.Origin, n["Access-Control-Request-Method"] = e.AccessControlRequestMethod, n["Access-Control-Request-Headers"] = e.AccessControlRequestHeaders, be.call(this, {
          Action: "name/cos:OptionsObject",
          method: "OPTIONS",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: n },
        function (e, n) {
          if (e) return e.statusCode && 403 === e.statusCode ? t(null, {
            OptionsForbidden: !0,
            statusCode: e.statusCode }) :
          t(e);
          var i = n.headers || {};
          t(null, {
            AccessControlAllowOrigin: i["access-control-allow-origin"],
            AccessControlAllowMethods: i["access-control-allow-methods"],
            AccessControlAllowHeaders: i["access-control-allow-headers"],
            AccessControlExposeHeaders: i["access-control-expose-headers"],
            AccessControlMaxAge: i["access-control-max-age"],
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function ne(e, t) {
        var n = e.Headers;
        !n["Cache-Control"] && n["cache-control"] && (n["Cache-Control"] = "");
        var i = e.CopySource || "",
        a = i.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^\/]+\/(.+)$/);
        if (!a) return void t({
          error: "CopySource format error" });

        var o = a[1],
        r = a[3],
        s = decodeURIComponent(a[4]);
        be.call(this, {
          Scope: [{
            action: "name/cos:GetObject",
            bucket: o,
            region: r,
            prefix: s },
          {
            action: "name/cos:PutObject",
            bucket: e.Bucket,
            region: e.Region,
            prefix: e.Key }],

          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          VersionId: e.VersionId,
          headers: e.Headers },
        function (e, n) {
          if (e) return t(e);

          var i = _e.clone(n.CopyObjectResult || {});

          _e.extend(i, {
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, i);
        });
      }

      function ie(e, t) {
        var n = e.CopySource || "",
        i = n.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^\/]+\/(.+)$/);
        if (!i) return void t({
          error: "CopySource format error" });

        var a = i[1],
        o = i[3],
        r = decodeURIComponent(i[4]);
        be.call(this, {
          Scope: [{
            action: "name/cos:GetObject",
            bucket: a,
            region: o,
            prefix: r },
          {
            action: "name/cos:PutObject",
            bucket: e.Bucket,
            region: e.Region,
            prefix: e.Key }],

          method: "PUT",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          VersionId: e.VersionId,
          qs: {
            partNumber: e.PartNumber,
            uploadId: e.UploadId },

          headers: e.Headers },
        function (e, n) {
          if (e) return t(e);

          var i = _e.clone(n.CopyPartResult || {});

          _e.extend(i, {
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, i);
        });
      }

      function ae(e, t) {
        var n = e.Objects || [],
        i = e.Quiet;
        n = _e.isArray(n) ? n : [n];

        var a = _e.json2xml({
          Delete: {
            Object: n,
            Quiet: i || !1 } }),


        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a));

        var r = _e.map(n, function (t) {
          return {
            action: "name/cos:DeleteObject",
            bucket: e.Bucket,
            region: e.Region,
            prefix: t.Key };

        });

        be.call(this, {
          Scope: r,
          method: "POST",
          Bucket: e.Bucket,
          Region: e.Region,
          body: a,
          action: "delete",
          headers: o },
        function (e, n) {
          if (e) return t(e);
          var i = n.DeleteResult || {},
          a = i.Deleted || [],
          o = i.Error || [];
          a = _e.isArray(a) ? a : [a], o = _e.isArray(o) ? o : [o];

          var r = _e.clone(i);

          _e.extend(r, {
            Error: o,
            Deleted: a,
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, r);
        });
      }

      function oe(e, t) {
        var n = e.Headers;
        if (!e.RestoreRequest) return void t({
          error: "missing param RestoreRequest" });


        var i = e.RestoreRequest || {},
        a = _e.json2xml({
          RestoreRequest: i });


        n["Content-Type"] = "application/xml", n["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Action: "name/cos:RestoreObject",
          method: "POST",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          VersionId: e.VersionId,
          body: a,
          action: "restore",
          headers: n },
        function (e, n) {
          t(e, n);
        });
      }

      function re(e, t) {
        var n = e.Tagging || {},
        i = n.TagSet || n.Tags || e.Tags || [];
        i = _e.clone(_e.isArray(i) ? i : [i]);

        var a = _e.json2xml({
          Tagging: {
            TagSet: {
              Tag: i } } }),



        o = e.Headers;

        o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, {
          Interface: "putObjectTagging",
          Action: "name/cos:PutObjectTagging",
          method: "PUT",
          Bucket: e.Bucket,
          Key: e.Key,
          Region: e.Region,
          body: a,
          action: "tagging",
          headers: o,
          VersionId: e.VersionId },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function se(e, t) {
        be.call(this, {
          Interface: "getObjectTagging",
          Action: "name/cos:GetObjectTagging",
          method: "GET",
          Key: e.Key,
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          action: "tagging",
          VersionId: e.VersionId },
        function (e, n) {
          if (e) {
            if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "NoSuchTagSet" !== e.error.Code) t(e);else {
              var i = {
                Tags: [],
                statusCode: e.statusCode };

              e.headers && (i.headers = e.headers), t(null, i);
            }
          } else {
            var a = [];

            try {
              a = n.Tagging.TagSet.Tag || [];
            } catch (e) {}

            a = _e.clone(_e.isArray(a) ? a : [a]), t(null, {
              Tags: a,
              statusCode: n.statusCode,
              headers: n.headers });

          }
        });
      }

      function ce(e, t) {
        be.call(this, {
          Interface: "deleteObjectTagging",
          Action: "name/cos:DeleteObjectTagging",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: e.Headers,
          action: "tagging",
          VersionId: e.VersionId },
        function (e, n) {
          return e && 204 === e.statusCode ? t(null, {
            statusCode: e.statusCode }) :
          e ? t(e) : void t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function le(e, t) {
        var n = this,
        i = e.Headers;
        i["Cache-Control"] || i["cache-control"] || (i["Cache-Control"] = ""), i["Content-Type"] || i["content-type"] || (i["Content-Type"] = Ae.getType(e.Key) || "application/octet-stream"), be.call(n, {
          Action: "name/cos:InitiateMultipartUpload",
          method: "POST",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          action: "uploads",
          headers: e.Headers,
          qs: e.Query },
        function (e, n) {
          return e ? t(e) : (n = _e.clone(n || {})) && n.InitiateMultipartUploadResult ? t(null, _e.extend(n.InitiateMultipartUploadResult, {
            statusCode: n.statusCode,
            headers: n.headers })) :
          void t(null, n);
        });
      }

      function pe(e, t) {
        var n = this;

        _e.getFileSize("multipartUpload", e, function () {
          _e.getBodyMd5(n.options.UploadCheckContentMd5, e.Body, function (i) {
            i && (e.Headers["Content-MD5"] = _e.binaryBase64(i)), be.call(n, {
              Action: "name/cos:UploadPart",
              TaskId: e.TaskId,
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              qs: {
                partNumber: e.PartNumber,
                uploadId: e.UploadId },

              headers: e.Headers,
              onProgress: e.onProgress,
              body: e.Body || null },
            function (e, n) {
              if (e) return t(e);
              t(null, {
                ETag: _e.attr(n.headers, "etag", {}),
                statusCode: n.statusCode,
                headers: n.headers });

            });
          });
        });
      }

      function ue(e, t) {
        for (var n = this, i = e.UploadId, a = e.Parts, o = 0, r = a.length; o < r; o++) {0 !== a[o].ETag.indexOf('"') && (a[o].ETag = '"' + a[o].ETag + '"');}

        var s = _e.json2xml({
          CompleteMultipartUpload: {
            Part: a } }),


        c = e.Headers;

        c["Content-Type"] = "application/xml", c["Content-MD5"] = _e.binaryBase64(_e.md5(s)), be.call(this, {
          Action: "name/cos:CompleteMultipartUpload",
          method: "POST",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          qs: {
            uploadId: i },

          body: s,
          headers: c },
        function (i, a) {
          if (i) return t(i);

          var o = ye({
            ForcePathStyle: n.options.ForcePathStyle,
            protocol: n.options.Protocol,
            domain: n.options.Domain,
            bucket: e.Bucket,
            region: e.Region,
            object: e.Key,
            isLocation: !0 }),

          r = a.CompleteMultipartUploadResult || {},
          s = _e.extend(r, {
            Location: o,
            statusCode: a.statusCode,
            headers: a.headers });


          t(null, s);
        });
      }

      function de(e, t) {
        var n = {};
        n.delimiter = e.Delimiter, n["encoding-type"] = e.EncodingType, n.prefix = e.Prefix || "", n["max-uploads"] = e.MaxUploads, n["key-marker"] = e.KeyMarker, n["upload-id-marker"] = e.UploadIdMarker, n = _e.clearKey(n), be.call(this, {
          Action: "name/cos:ListMultipartUploads",
          ResourceKey: n.prefix,
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          headers: e.Headers,
          qs: n,
          action: "uploads" },
        function (e, n) {
          if (e) return t(e);

          if (n && n.ListMultipartUploadsResult) {
            var i = n.ListMultipartUploadsResult.Upload || [],
            a = n.ListMultipartUploadsResult.CommonPrefixes || [];
            a = _e.isArray(a) ? a : [a], i = _e.isArray(i) ? i : [i], n.ListMultipartUploadsResult.Upload = i, n.ListMultipartUploadsResult.CommonPrefixes = a;
          }

          var o = _e.clone(n.ListMultipartUploadsResult || {});

          _e.extend(o, {
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, o);
        });
      }

      function me(e, t) {
        var n = {};
        n.uploadId = e.UploadId, n["encoding-type"] = e.EncodingType, n["max-parts"] = e.MaxParts, n["part-number-marker"] = e.PartNumberMarker, be.call(this, {
          Action: "name/cos:ListParts",
          method: "GET",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: e.Headers,
          qs: n },
        function (e, n) {
          if (e) return t(e);
          var i = n.ListPartsResult || {},
          a = i.Part || [];
          a = _e.isArray(a) ? a : [a], i.Part = a;

          var o = _e.clone(i);

          _e.extend(o, {
            statusCode: n.statusCode,
            headers: n.headers }),
          t(null, o);
        });
      }

      function fe(e, t) {
        var n = {};
        n.uploadId = e.UploadId, be.call(this, {
          Action: "name/cos:AbortMultipartUpload",
          method: "DELETE",
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          headers: e.Headers,
          qs: n },
        function (e, n) {
          if (e) return t(e);
          t(null, {
            statusCode: n.statusCode,
            headers: n.headers });

        });
      }

      function he(e) {
        var t = this;
        return _e.getAuth({
          SecretId: e.SecretId || this.options.SecretId || "",
          SecretKey: e.SecretKey || this.options.SecretKey || "",
          Method: e.Method,
          Key: e.Key,
          Query: e.Query,
          Headers: e.Headers,
          Expires: e.Expires,
          SystemClockOffset: t.options.SystemClockOffset });

      }

      function ge(e, t) {
        var n = this,
        i = ye({
          ForcePathStyle: n.options.ForcePathStyle,
          protocol: e.Protocol || n.options.Protocol,
          domain: e.Domain || n.options.Domain,
          bucket: e.Bucket,
          region: e.Region,
          object: e.Key });

        if (void 0 !== e.Sign && !e.Sign) return t(null, {
          Url: i }),
        i;
        var a = Ce.call(this, {
          Action: "PUT" === (e.Method || "").toUpperCase() ? "name/cos:PutObject" : "name/cos:GetObject",
          Bucket: e.Bucket || "",
          Region: e.Region || "",
          Method: e.Method || "get",
          Key: e.Key,
          Expires: e.Expires },
        function (e, n) {
          if (t) {
            if (e) return void t(e);
            var a = i;
            a += "?" + (n.Authorization.indexOf("q-signature") > -1 ? n.Authorization : "sign=" + encodeURIComponent(n.Authorization)), n.XCosSecurityToken && (a += "&x-cos-security-token=" + n.XCosSecurityToken), n.ClientIP && (a += "&clientIP=" + n.ClientIP), n.ClientUA && (a += "&clientUA=" + n.ClientUA), n.Token && (a += "&token=" + n.Token), setTimeout(function () {
              t(null, {
                Url: a });

            });
          }
        });
        return a ? i + "?" + a.Authorization + (a.XCosSecurityToken ? "&x-cos-security-token=" + a.XCosSecurityToken : "") : i;
      }

      function ve(e) {
        var t = {
          GrantFullControl: [],
          GrantWrite: [],
          GrantRead: [],
          GrantReadAcp: [],
          GrantWriteAcp: [],
          ACL: "" },

        n = {
          FULL_CONTROL: "GrantFullControl",
          WRITE: "GrantWrite",
          READ: "GrantRead",
          READ_ACP: "GrantReadAcp",
          WRITE_ACP: "GrantWriteAcp" },

        i = e && e.AccessControlList || {},
        a = i.Grant;
        a && (a = _e.isArray(a) ? a : [a]);
        var o = {
          READ: 0,
          WRITE: 0,
          FULL_CONTROL: 0 };

        return a && a.length && _e.each(a, function (i) {
          "qcs::cam::anyone:anyone" === i.Grantee.ID || "http://cam.qcloud.com/groups/global/AllUsers" === i.Grantee.URI ? o[i.Permission] = 1 : i.Grantee.ID !== e.Owner.ID && t[n[i.Permission]].push('id="' + i.Grantee.ID + '"');
        }), o.FULL_CONTROL || o.WRITE && o.READ ? t.ACL = "public-read-write" : o.READ ? t.ACL = "public-read" : t.ACL = "private", _e.each(n, function (e) {
          t[e] = xe(t[e].join(","));
        }), t;
      }

      function xe(e) {
        var t,
        n,
        i = e.split(","),
        a = {};

        for (t = 0; t < i.length;) {n = i[t].trim(), a[n] ? i.splice(t, 1) : (a[n] = !0, i[t] = n, t++);}

        return i.join(",");
      }

      function ye(e) {
        var t = e.bucket,
        n = t.substr(0, t.lastIndexOf("-")),
        i = t.substr(t.lastIndexOf("-") + 1),
        a = e.domain,
        o = e.region,
        r = e.object;
        a || (a = ["cn-south", "cn-south-2", "cn-north", "cn-east", "cn-southwest", "sg"].indexOf(o) > -1 ? "{Region}.myqcloud.com" : "cos.{Region}.myqcloud.com", e.ForcePathStyle || (a = "{Bucket}." + a)), a = a.replace(/\{\{AppId\}\}/gi, i).replace(/\{\{Bucket\}\}/gi, n).replace(/\{\{Region\}\}/gi, o).replace(/\{\{.*?\}\}/gi, ""), a = a.replace(/\{AppId\}/gi, i).replace(/\{BucketName\}/gi, n).replace(/\{Bucket\}/gi, t).replace(/\{Region\}/gi, o).replace(/\{.*?\}/gi, ""), /^[a-zA-Z]+:\/\//.test(a) || (a = "https://" + a), "/" === a.slice(-1) && (a = a.slice(0, -1));
        var s = a;
        return e.ForcePathStyle && (s += "/" + t), s += "/", r && (s += _e.camSafeUrlEncode(r).replace(/%2F/g, "/")), e.isLocation && (s = s.replace(/^https?:\/\//, "")), s;
      }

      function Ce(e, t) {
        var n = _e.clone(e.Headers);

        delete n["Content-Type"], delete n["Cache-Control"], _e.each(n, function (e, t) {
          "" === e && delete n[t];
        });

        var i = function i(e) {
          var n = !1,
          i = e.Authorization;
          if (i) if (i.indexOf(" ") > -1) n = !1;else if (i.indexOf("q-sign-algorithm=") > -1 && i.indexOf("q-ak=") > -1 && i.indexOf("q-sign-time=") > -1 && i.indexOf("q-key-time=") > -1 && i.indexOf("q-url-param-list=") > -1) n = !0;else try {
            i = we.atob(i), i.indexOf("a=") > -1 && i.indexOf("k=") > -1 && i.indexOf("t=") > -1 && i.indexOf("r=") > -1 && i.indexOf("b=") > -1 && (n = !0);
          } catch (e) {}
          n ? t && t(null, e) : t && t("authorization error");
        },
        a = this,
        o = e.Bucket || "",
        r = e.Region || "",
        s = "name/cos:PostObject" !== e.Action && e.Key ? e.Key : "";

        a.options.ForcePathStyle && o && (s = o + "/" + s);
        var c = "/" + s,
        l = {},
        p = e.Scope;

        if (!p) {
          var u = e.Action || "",
          d = e.ResourceKey || e.Key || "";
          p = e.Scope || [{
            action: u,
            bucket: o,
            region: r,
            prefix: d }];

        }

        var m = _e.md5(JSON.stringify(p));

        a._StsCache = a._StsCache || [], function () {
          var e, t;

          for (e = a._StsCache.length - 1; e >= 0; e--) {
            t = a._StsCache[e];
            var n = Math.round(_e.getSkewTime(a.options.SystemClockOffset) / 1e3) + 30;
            if (t.StartTime && n < t.StartTime || n >= t.ExpiredTime) a._StsCache.splice(e, 1);else if (!t.ScopeLimit || t.ScopeLimit && t.ScopeKey === m) {
              l = t;
              break;
            }
          }
        }();

        var f = function f() {
          var t = l.StartTime && l.ExpiredTime ? l.StartTime + ";" + l.ExpiredTime : "",
          o = _e.getAuth({
            SecretId: l.TmpSecretId,
            SecretKey: l.TmpSecretKey,
            Method: e.Method,
            Pathname: c,
            Query: e.Query,
            Headers: n,
            Expires: e.Expires,
            SystemClockOffset: a.options.SystemClockOffset,
            KeyTime: t }),

          r = {
            Authorization: o,
            XCosSecurityToken: l.XCosSecurityToken || "",
            Token: l.Token || "",
            ClientIP: l.ClientIP || "",
            ClientUA: l.ClientUA || "" };


          i(r);
        };

        if (l.ExpiredTime && l.ExpiredTime - _e.getSkewTime(a.options.SystemClockOffset) / 1e3 > 60) f();else if (a.options.getAuthorization) a.options.getAuthorization.call(a, {
          Bucket: o,
          Region: r,
          Method: e.Method,
          Key: s,
          Pathname: c,
          Query: e.Query,
          Headers: n,
          Scope: p,
          SystemClockOffset: a.options.SystemClockOffset },
        function (e) {
          "string" == typeof e && (e = {
            Authorization: e }),
          e.TmpSecretId && e.TmpSecretKey && e.XCosSecurityToken && e.ExpiredTime ? (l = e || {}, l.Scope = p, l.ScopeKey = m, a._StsCache.push(l), f()) : i(e);
        });else {
          if (!a.options.getSTS) return function () {
            var t = _e.getAuth({
              SecretId: e.SecretId || a.options.SecretId,
              SecretKey: e.SecretKey || a.options.SecretKey,
              Method: e.Method,
              Pathname: c,
              Query: e.Query,
              Headers: n,
              Expires: e.Expires,
              SystemClockOffset: a.options.SystemClockOffset }),

            o = {
              Authorization: t,
              XCosSecurityToken: a.options.XCosSecurityToken };


            return i(o), o;
          }();
          a.options.getSTS.call(a, {
            Bucket: o,
            Region: r },
          function (e) {
            l = e || {}, l.Scope = p, l.ScopeKey = m, l.TmpSecretId = l.SecretId, l.TmpSecretKey = l.SecretKey, a._StsCache.push(l), f();
          });
        }
        return "";
      }

      function ke(e) {
        var t = !1,
        n = !1,
        i = e.headers && (e.headers.date || e.headers.Date) || e.error && e.error.ServerTime;

        try {
          var a = e.error.Code,
          o = e.error.Message;
          ("RequestTimeTooSkewed" === a || "AccessDenied" === a && "Request has expired" === o) && (n = !0);
        } catch (e) {}

        if (e) if (n && i) {
          var r = Date.parse(i);
          this.options.CorrectClockSkew && Math.abs(_e.getSkewTime(this.options.SystemClockOffset) - r) >= 3e4 && (console.error("error: Local time is too skewed."), this.options.SystemClockOffset = r - Date.now(), t = !0);
        } else 5 === Math.floor(e.statusCode / 100) && (t = !0);
        return t;
      }

      function be(e, t) {
        var n = this;
        !e.headers && (e.headers = {}), !e.qs && (e.qs = {}), e.VersionId && (e.qs.versionId = e.VersionId), e.qs = _e.clearKey(e.qs), e.headers && (e.headers = _e.clearKey(e.headers)), e.qs && (e.qs = _e.clearKey(e.qs));

        var i = _e.clone(e.qs);

        e.action && (i[e.action] = "");

        var a = function a(o) {
          var r = n.options.SystemClockOffset;
          Ce.call(n, {
            Bucket: e.Bucket || "",
            Region: e.Region || "",
            Method: e.method,
            Key: e.Key,
            Query: i,
            Headers: e.headers,
            Action: e.Action,
            ResourceKey: e.ResourceKey,
            Scope: e.Scope },
          function (i, s) {
            if (i) return void t(i);
            e.AuthData = s, Se.call(n, e, function (i, s) {
              i && o < 2 && (r !== n.options.SystemClockOffset || ke.call(n, i)) ? (e.headers && (delete e.headers.Authorization, delete e.headers.token, delete e.headers.clientIP, delete e.headers.clientUA, delete e.headers["x-cos-security-token"]), a(o + 1)) : t(i, s);
            });
          });
        };

        a(1);
      }

      function Se(e, t) {
        var n = this,
        i = e.TaskId;

        if (!i || n._isRunningTask(i)) {
          var a = e.Bucket,
          o = e.Region,
          r = e.Key,
          s = e.method || "GET",
          c = e.url,
          l = e.body,
          p = e.json,
          u = e.rawBody;
          c = c || ye({
            ForcePathStyle: n.options.ForcePathStyle,
            protocol: n.options.Protocol,
            domain: n.options.Domain,
            bucket: a,
            region: o,
            object: r }),
          e.action && (c = c + "?" + e.action);
          var d = {
            method: s,
            url: c,
            headers: e.headers,
            qs: e.qs,
            filePath: e.filePath,
            body: l,
            json: p };

          d.headers.Authorization = e.AuthData.Authorization, e.AuthData.Token && (d.headers.token = e.AuthData.Token), e.AuthData.ClientIP && (d.headers.clientIP = e.AuthData.ClientIP), e.AuthData.ClientUA && (d.headers.clientUA = e.AuthData.ClientUA), e.AuthData.XCosSecurityToken && (d.headers["x-cos-security-token"] = e.AuthData.XCosSecurityToken), d.headers && (d.headers = _e.clearKey(d.headers)), d = _e.clearKey(d), e.onProgress && "function" == typeof e.onProgress && (d.onProgress = function (t) {
            if (!i || n._isRunningTask(i)) {
              var a = t ? t.loaded : 0;
              e.onProgress({
                loaded: a,
                total: t.total });

            }
          }), this.options.Timeout && (d.timeout = this.options.Timeout), n.options.ForcePathStyle && (d.pathStyle = n.options.ForcePathStyle), n.emit("before-send", d);

          var m = Re(d, function (e, a, o) {
            if ("abort" !== e) {
              var r,
              s = function s(e, o) {
                if (i && n.off("inner-kill-task", f), !r) {
                  r = !0;
                  var s = {};
                  a && a.statusCode && (s.statusCode = a.statusCode), a && a.headers && (s.headers = a.headers), e ? (e = _e.extend(e || {}, s), t(e, null)) : (o = _e.extend(o || {}, s), t(null, o)), m = null;
                }
              };

              if (e) return void s({
                error: e });

              var c;
              if (u) c = {}, c.body = o;else try {
                c = o && o.indexOf("<") > -1 && o.indexOf(">") > -1 && _e.xml2json(o) || {};
              } catch (e) {
                c = o || {};
              }
              var l = a.statusCode;
              return 2 === Math.floor(l / 100) ? c.Error ? void s({
                error: c.Error }) :
              void s(null, c) : void s({
                error: c.Error || c });

            }
          }),
          f = function f(e) {
            e.TaskId === i && (m && m.abort && m.abort(), n.off("inner-kill-task", f));
          };

          i && n.on("inner-kill-task", f);
        }
      }

      var Re = n(18),
      we = n(3),
      _e = n(0),
      Ae = n(19),
      Te = {
        getService: i,
        putBucket: a,
        headBucket: o,
        getBucket: r,
        deleteBucket: s,
        putBucketAcl: c,
        getBucketAcl: l,
        putBucketCors: p,
        getBucketCors: u,
        deleteBucketCors: d,
        getBucketLocation: m,
        getBucketPolicy: h,
        putBucketPolicy: f,
        deleteBucketPolicy: g,
        putBucketTagging: v,
        getBucketTagging: x,
        deleteBucketTagging: y,
        putBucketLifecycle: C,
        getBucketLifecycle: k,
        deleteBucketLifecycle: b,
        putBucketVersioning: S,
        getBucketVersioning: R,
        putBucketReplication: w,
        getBucketReplication: _,
        deleteBucketReplication: A,
        putBucketWebsite: T,
        getBucketWebsite: E,
        deleteBucketWebsite: B,
        putBucketReferer: O,
        getBucketReferer: D,
        putBucketDomain: N,
        getBucketDomain: I,
        deleteBucketDomain: P,
        putBucketOrigin: j,
        getBucketOrigin: M,
        deleteBucketOrigin: U,
        putBucketLogging: F,
        getBucketLogging: H,
        putBucketInventory: L,
        getBucketInventory: z,
        listBucketInventory: K,
        deleteBucketInventory: q,
        putBucketAccelerate: G,
        getBucketAccelerate: V,
        getObject: $,
        headObject: X,
        listObjectVersions: W,
        putObject: Q,
        postObject: J,
        deleteObject: Y,
        getObjectAcl: Z,
        putObjectAcl: ee,
        optionsObject: te,
        putObjectCopy: ne,
        deleteMultipleObject: ae,
        restoreObject: oe,
        putObjectTagging: re,
        getObjectTagging: se,
        deleteObjectTagging: ce,
        uploadPartCopy: ie,
        multipartInit: le,
        multipartUpload: pe,
        multipartComplete: ue,
        multipartList: de,
        multipartListPart: me,
        multipartAbort: fe,
        getObjectUrl: ge,
        getAuth: he };


      e.exports.init = function (e, t) {
        t.transferToTaskMethod(Te, "postObject"), t.transferToTaskMethod(Te, "putObject"), _e.each(Te, function (t, n) {
          e.prototype[n] = _e.apiWrapper(n, t);
        });
      };
    }, function (e, t) {
      var n = function n(e) {
        var t,
        n,
        i,
        a = [],
        o = Object.keys(e);

        for (t = 0; t < o.length; t++) {n = o[t], i = e[n] || "", a.push(n + "=" + encodeURIComponent(i));}

        return a.join("&");
      },
      i = function i(e, t) {
        var i,
        a = e.filePath,
        o = e.headers || {},
        r = e.url,
        s = e.method,
        c = e.onProgress,
        l = function l(e, n) {
          var i = n.header,
          a = {};
          if (i) for (var o in i) {i.hasOwnProperty(o) && (a[o.toLowerCase()] = i[o]);}
          t(e, {
            statusCode: n.statusCode,
            headers: a },
          n.data);
        };

        if (a) {
          var p,
          u = r.match(/^(https?:\/\/[^\/]+\/)([^\/]*\/?)(.*)$/);
          e.pathStyle ? (p = decodeURIComponent(u[3] || ""), r = u[1] + u[2]) : (p = decodeURIComponent(u[2] + u[3] || ""), r = u[1]);
          var d = {
            key: p,
            success_action_status: 200,
            Signature: o.Authorization },

          m = ["Cache-Control", "Content-Type", "Content-Disposition", "Content-Encoding", "Expires", "x-cos-storage-class", "x-cos-security-token"];

          for (var f in e.headers) {e.headers.hasOwnProperty(f) && (f.indexOf("x-cos-meta-") > -1 || m.indexOf(f) > -1) && (d[f] = e.headers[f]);}

          o["x-cos-acl"] && (d.acl = o["x-cos-acl"]), !d["Content-Type"] && (d["Content-Type"] = ""), i = wx.uploadFile({
            url: r,
            method: s,
            name: "file",
            header: o,
            filePath: a,
            formData: d,
            timeout: e.timeout,
            success: function success(e) {
              l(null, e);
            },
            fail: function fail(e) {
              l(e.errMsg, e);
            } }),
          i.onProgressUpdate(function (e) {
            c && c({
              loaded: e.totalBytesSent,
              total: e.totalBytesExpectedToSend,
              progress: e.progress / 100 });

          });
        } else {
          var h = e.qs && n(e.qs) || "";
          h && (r += (r.indexOf("?") > -1 ? "&" : "?") + h), o["Content-Length"] && delete o["Content-Length"], i = wx.request({
            url: r,
            method: s,
            header: o,
            dataType: "text",
            data: e.body,
            timeout: e.timeout,
            success: function success(e) {
              l(null, e);
            },
            fail: function fail(e) {
              l(e.errMsg, e);
            } });

        }

        return i;
      };

      e.exports = i;
    }, function (e, t, n) {
      "use strict";

      var i = n(20);
      e.exports = new i(n(21), n(22));
    }, function (e, t, n) {
      "use strict";

      function i() {
        this._types = Object.create(null), this._extensions = Object.create(null);

        for (var e = 0; e < arguments.length; e++) {this.define(arguments[e]);}

        this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
      }

      i.prototype.define = function (e, t) {
        for (var n in e) {
          var i = e[n].map(function (e) {
            return e.toLowerCase();
          });
          n = n.toLowerCase();

          for (var a = 0; a < i.length; a++) {
            var o = i[a];

            if ("*" != o[0]) {
              if (!t && o in this._types) throw new Error('Attempt to change mapping for "' + o + '" extension from "' + this._types[o] + '" to "' + n + '". Pass `force=true` to allow this, otherwise remove "' + o + '" from the list of extensions for "' + n + '".');
              this._types[o] = n;
            }
          }

          if (t || !this._extensions[n]) {
            var o = i[0];
            this._extensions[n] = "*" != o[0] ? o : o.substr(1);
          }
        }
      }, i.prototype.getType = function (e) {
        e = String(e);
        var t = e.replace(/^.*[\/\\]/, "").toLowerCase(),
        n = t.replace(/^.*\./, "").toLowerCase(),
        i = t.length < e.length;
        return (n.length < t.length - 1 || !i) && this._types[n] || null;
      }, i.prototype.getExtension = function (e) {
        return (e = /^\s*([^;\s]*)/.test(e) && RegExp.$1) && this._extensions[e.toLowerCase()] || null;
      }, e.exports = i;
    }, function (e, t) {
      e.exports = {
        "application/andrew-inset": ["ez"],
        "application/applixware": ["aw"],
        "application/atom+xml": ["atom"],
        "application/atomcat+xml": ["atomcat"],
        "application/atomdeleted+xml": ["atomdeleted"],
        "application/atomsvc+xml": ["atomsvc"],
        "application/atsc-dwd+xml": ["dwd"],
        "application/atsc-held+xml": ["held"],
        "application/atsc-rsat+xml": ["rsat"],
        "application/bdoc": ["bdoc"],
        "application/calendar+xml": ["xcs"],
        "application/ccxml+xml": ["ccxml"],
        "application/cdfx+xml": ["cdfx"],
        "application/cdmi-capability": ["cdmia"],
        "application/cdmi-container": ["cdmic"],
        "application/cdmi-domain": ["cdmid"],
        "application/cdmi-object": ["cdmio"],
        "application/cdmi-queue": ["cdmiq"],
        "application/cu-seeme": ["cu"],
        "application/dash+xml": ["mpd"],
        "application/davmount+xml": ["davmount"],
        "application/docbook+xml": ["dbk"],
        "application/dssc+der": ["dssc"],
        "application/dssc+xml": ["xdssc"],
        "application/ecmascript": ["ecma", "es"],
        "application/emma+xml": ["emma"],
        "application/emotionml+xml": ["emotionml"],
        "application/epub+zip": ["epub"],
        "application/exi": ["exi"],
        "application/fdt+xml": ["fdt"],
        "application/font-tdpfr": ["pfr"],
        "application/geo+json": ["geojson"],
        "application/gml+xml": ["gml"],
        "application/gpx+xml": ["gpx"],
        "application/gxf": ["gxf"],
        "application/gzip": ["gz"],
        "application/hjson": ["hjson"],
        "application/hyperstudio": ["stk"],
        "application/inkml+xml": ["ink", "inkml"],
        "application/ipfix": ["ipfix"],
        "application/its+xml": ["its"],
        "application/java-archive": ["jar", "war", "ear"],
        "application/java-serialized-object": ["ser"],
        "application/java-vm": ["class"],
        "application/javascript": ["js", "mjs"],
        "application/json": ["json", "map"],
        "application/json5": ["json5"],
        "application/jsonml+json": ["jsonml"],
        "application/ld+json": ["jsonld"],
        "application/lgr+xml": ["lgr"],
        "application/lost+xml": ["lostxml"],
        "application/mac-binhex40": ["hqx"],
        "application/mac-compactpro": ["cpt"],
        "application/mads+xml": ["mads"],
        "application/manifest+json": ["webmanifest"],
        "application/marc": ["mrc"],
        "application/marcxml+xml": ["mrcx"],
        "application/mathematica": ["ma", "nb", "mb"],
        "application/mathml+xml": ["mathml"],
        "application/mbox": ["mbox"],
        "application/mediaservercontrol+xml": ["mscml"],
        "application/metalink+xml": ["metalink"],
        "application/metalink4+xml": ["meta4"],
        "application/mets+xml": ["mets"],
        "application/mmt-aei+xml": ["maei"],
        "application/mmt-usd+xml": ["musd"],
        "application/mods+xml": ["mods"],
        "application/mp21": ["m21", "mp21"],
        "application/mp4": ["mp4s", "m4p"],
        "application/mrb-consumer+xml": ["*xdf"],
        "application/mrb-publish+xml": ["*xdf"],
        "application/msword": ["doc", "dot"],
        "application/mxf": ["mxf"],
        "application/n-quads": ["nq"],
        "application/n-triples": ["nt"],
        "application/node": ["cjs"],
        "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"],
        "application/oda": ["oda"],
        "application/oebps-package+xml": ["opf"],
        "application/ogg": ["ogx"],
        "application/omdoc+xml": ["omdoc"],
        "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
        "application/oxps": ["oxps"],
        "application/p2p-overlay+xml": ["relo"],
        "application/patch-ops-error+xml": ["*xer"],
        "application/pdf": ["pdf"],
        "application/pgp-encrypted": ["pgp"],
        "application/pgp-signature": ["asc", "sig"],
        "application/pics-rules": ["prf"],
        "application/pkcs10": ["p10"],
        "application/pkcs7-mime": ["p7m", "p7c"],
        "application/pkcs7-signature": ["p7s"],
        "application/pkcs8": ["p8"],
        "application/pkix-attr-cert": ["ac"],
        "application/pkix-cert": ["cer"],
        "application/pkix-crl": ["crl"],
        "application/pkix-pkipath": ["pkipath"],
        "application/pkixcmp": ["pki"],
        "application/pls+xml": ["pls"],
        "application/postscript": ["ai", "eps", "ps"],
        "application/provenance+xml": ["provx"],
        "application/pskc+xml": ["pskcxml"],
        "application/raml+yaml": ["raml"],
        "application/rdf+xml": ["rdf", "owl"],
        "application/reginfo+xml": ["rif"],
        "application/relax-ng-compact-syntax": ["rnc"],
        "application/resource-lists+xml": ["rl"],
        "application/resource-lists-diff+xml": ["rld"],
        "application/rls-services+xml": ["rs"],
        "application/route-apd+xml": ["rapd"],
        "application/route-s-tsid+xml": ["sls"],
        "application/route-usd+xml": ["rusd"],
        "application/rpki-ghostbusters": ["gbr"],
        "application/rpki-manifest": ["mft"],
        "application/rpki-roa": ["roa"],
        "application/rsd+xml": ["rsd"],
        "application/rss+xml": ["rss"],
        "application/rtf": ["rtf"],
        "application/sbml+xml": ["sbml"],
        "application/scvp-cv-request": ["scq"],
        "application/scvp-cv-response": ["scs"],
        "application/scvp-vp-request": ["spq"],
        "application/scvp-vp-response": ["spp"],
        "application/sdp": ["sdp"],
        "application/senml+xml": ["senmlx"],
        "application/sensml+xml": ["sensmlx"],
        "application/set-payment-initiation": ["setpay"],
        "application/set-registration-initiation": ["setreg"],
        "application/shf+xml": ["shf"],
        "application/sieve": ["siv", "sieve"],
        "application/smil+xml": ["smi", "smil"],
        "application/sparql-query": ["rq"],
        "application/sparql-results+xml": ["srx"],
        "application/srgs": ["gram"],
        "application/srgs+xml": ["grxml"],
        "application/sru+xml": ["sru"],
        "application/ssdl+xml": ["ssdl"],
        "application/ssml+xml": ["ssml"],
        "application/swid+xml": ["swidtag"],
        "application/tei+xml": ["tei", "teicorpus"],
        "application/thraud+xml": ["tfi"],
        "application/timestamped-data": ["tsd"],
        "application/toml": ["toml"],
        "application/ttml+xml": ["ttml"],
        "application/urc-ressheet+xml": ["rsheet"],
        "application/voicexml+xml": ["vxml"],
        "application/wasm": ["wasm"],
        "application/widget": ["wgt"],
        "application/winhlp": ["hlp"],
        "application/wsdl+xml": ["wsdl"],
        "application/wspolicy+xml": ["wspolicy"],
        "application/xaml+xml": ["xaml"],
        "application/xcap-att+xml": ["xav"],
        "application/xcap-caps+xml": ["xca"],
        "application/xcap-diff+xml": ["xdf"],
        "application/xcap-el+xml": ["xel"],
        "application/xcap-error+xml": ["xer"],
        "application/xcap-ns+xml": ["xns"],
        "application/xenc+xml": ["xenc"],
        "application/xhtml+xml": ["xhtml", "xht"],
        "application/xliff+xml": ["xlf"],
        "application/xml": ["xml", "xsl", "xsd", "rng"],
        "application/xml-dtd": ["dtd"],
        "application/xop+xml": ["xop"],
        "application/xproc+xml": ["xpl"],
        "application/xslt+xml": ["xslt"],
        "application/xspf+xml": ["xspf"],
        "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
        "application/yang": ["yang"],
        "application/yin+xml": ["yin"],
        "application/zip": ["zip"],
        "audio/3gpp": ["*3gpp"],
        "audio/adpcm": ["adp"],
        "audio/basic": ["au", "snd"],
        "audio/midi": ["mid", "midi", "kar", "rmi"],
        "audio/mobile-xmf": ["mxmf"],
        "audio/mp3": ["*mp3"],
        "audio/mp4": ["m4a", "mp4a"],
        "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
        "audio/ogg": ["oga", "ogg", "spx"],
        "audio/s3m": ["s3m"],
        "audio/silk": ["sil"],
        "audio/wav": ["wav"],
        "audio/wave": ["*wav"],
        "audio/webm": ["weba"],
        "audio/xm": ["xm"],
        "font/collection": ["ttc"],
        "font/otf": ["otf"],
        "font/ttf": ["ttf"],
        "font/woff": ["woff"],
        "font/woff2": ["woff2"],
        "image/aces": ["exr"],
        "image/apng": ["apng"],
        "image/bmp": ["bmp"],
        "image/cgm": ["cgm"],
        "image/dicom-rle": ["drle"],
        "image/emf": ["emf"],
        "image/fits": ["fits"],
        "image/g3fax": ["g3"],
        "image/gif": ["gif"],
        "image/heic": ["heic"],
        "image/heic-sequence": ["heics"],
        "image/heif": ["heif"],
        "image/heif-sequence": ["heifs"],
        "image/hej2k": ["hej2"],
        "image/hsj2": ["hsj2"],
        "image/ief": ["ief"],
        "image/jls": ["jls"],
        "image/jp2": ["jp2", "jpg2"],
        "image/jpeg": ["jpeg", "jpg", "jpe"],
        "image/jph": ["jph"],
        "image/jphc": ["jhc"],
        "image/jpm": ["jpm"],
        "image/jpx": ["jpx", "jpf"],
        "image/jxr": ["jxr"],
        "image/jxra": ["jxra"],
        "image/jxrs": ["jxrs"],
        "image/jxs": ["jxs"],
        "image/jxsc": ["jxsc"],
        "image/jxsi": ["jxsi"],
        "image/jxss": ["jxss"],
        "image/ktx": ["ktx"],
        "image/png": ["png"],
        "image/sgi": ["sgi"],
        "image/svg+xml": ["svg", "svgz"],
        "image/t38": ["t38"],
        "image/tiff": ["tif", "tiff"],
        "image/tiff-fx": ["tfx"],
        "image/webp": ["webp"],
        "image/wmf": ["wmf"],
        "message/disposition-notification": ["disposition-notification"],
        "message/global": ["u8msg"],
        "message/global-delivery-status": ["u8dsn"],
        "message/global-disposition-notification": ["u8mdn"],
        "message/global-headers": ["u8hdr"],
        "message/rfc822": ["eml", "mime"],
        "model/3mf": ["3mf"],
        "model/gltf+json": ["gltf"],
        "model/gltf-binary": ["glb"],
        "model/iges": ["igs", "iges"],
        "model/mesh": ["msh", "mesh", "silo"],
        "model/mtl": ["mtl"],
        "model/obj": ["obj"],
        "model/stl": ["stl"],
        "model/vrml": ["wrl", "vrml"],
        "model/x3d+binary": ["*x3db", "x3dbz"],
        "model/x3d+fastinfoset": ["x3db"],
        "model/x3d+vrml": ["*x3dv", "x3dvz"],
        "model/x3d+xml": ["x3d", "x3dz"],
        "model/x3d-vrml": ["x3dv"],
        "text/cache-manifest": ["appcache", "manifest"],
        "text/calendar": ["ics", "ifb"],
        "text/coffeescript": ["coffee", "litcoffee"],
        "text/css": ["css"],
        "text/csv": ["csv"],
        "text/html": ["html", "htm", "shtml"],
        "text/jade": ["jade"],
        "text/jsx": ["jsx"],
        "text/less": ["less"],
        "text/markdown": ["markdown", "md"],
        "text/mathml": ["mml"],
        "text/mdx": ["mdx"],
        "text/n3": ["n3"],
        "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
        "text/richtext": ["rtx"],
        "text/rtf": ["*rtf"],
        "text/sgml": ["sgml", "sgm"],
        "text/shex": ["shex"],
        "text/slim": ["slim", "slm"],
        "text/stylus": ["stylus", "styl"],
        "text/tab-separated-values": ["tsv"],
        "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
        "text/turtle": ["ttl"],
        "text/uri-list": ["uri", "uris", "urls"],
        "text/vcard": ["vcard"],
        "text/vtt": ["vtt"],
        "text/xml": ["*xml"],
        "text/yaml": ["yaml", "yml"],
        "video/3gpp": ["3gp", "3gpp"],
        "video/3gpp2": ["3g2"],
        "video/h261": ["h261"],
        "video/h263": ["h263"],
        "video/h264": ["h264"],
        "video/jpeg": ["jpgv"],
        "video/jpm": ["*jpm", "jpgm"],
        "video/mj2": ["mj2", "mjp2"],
        "video/mp2t": ["ts"],
        "video/mp4": ["mp4", "mp4v", "mpg4"],
        "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
        "video/ogg": ["ogv"],
        "video/quicktime": ["qt", "mov"],
        "video/webm": ["webm"] };

    }, function (e, t) {
      e.exports = {
        "application/prs.cww": ["cww"],
        "application/vnd.1000minds.decision-model+xml": ["1km"],
        "application/vnd.3gpp.pic-bw-large": ["plb"],
        "application/vnd.3gpp.pic-bw-small": ["psb"],
        "application/vnd.3gpp.pic-bw-var": ["pvb"],
        "application/vnd.3gpp2.tcap": ["tcap"],
        "application/vnd.3m.post-it-notes": ["pwn"],
        "application/vnd.accpac.simply.aso": ["aso"],
        "application/vnd.accpac.simply.imp": ["imp"],
        "application/vnd.acucobol": ["acu"],
        "application/vnd.acucorp": ["atc", "acutc"],
        "application/vnd.adobe.air-application-installer-package+zip": ["air"],
        "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
        "application/vnd.adobe.fxp": ["fxp", "fxpl"],
        "application/vnd.adobe.xdp+xml": ["xdp"],
        "application/vnd.adobe.xfdf": ["xfdf"],
        "application/vnd.ahead.space": ["ahead"],
        "application/vnd.airzip.filesecure.azf": ["azf"],
        "application/vnd.airzip.filesecure.azs": ["azs"],
        "application/vnd.amazon.ebook": ["azw"],
        "application/vnd.americandynamics.acc": ["acc"],
        "application/vnd.amiga.ami": ["ami"],
        "application/vnd.android.package-archive": ["apk"],
        "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
        "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
        "application/vnd.antix.game-component": ["atx"],
        "application/vnd.apple.installer+xml": ["mpkg"],
        "application/vnd.apple.keynote": ["keynote"],
        "application/vnd.apple.mpegurl": ["m3u8"],
        "application/vnd.apple.numbers": ["numbers"],
        "application/vnd.apple.pages": ["pages"],
        "application/vnd.apple.pkpass": ["pkpass"],
        "application/vnd.aristanetworks.swi": ["swi"],
        "application/vnd.astraea-software.iota": ["iota"],
        "application/vnd.audiograph": ["aep"],
        "application/vnd.balsamiq.bmml+xml": ["bmml"],
        "application/vnd.blueice.multipass": ["mpm"],
        "application/vnd.bmi": ["bmi"],
        "application/vnd.businessobjects": ["rep"],
        "application/vnd.chemdraw+xml": ["cdxml"],
        "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
        "application/vnd.cinderella": ["cdy"],
        "application/vnd.citationstyles.style+xml": ["csl"],
        "application/vnd.claymore": ["cla"],
        "application/vnd.cloanto.rp9": ["rp9"],
        "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
        "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
        "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
        "application/vnd.commonspace": ["csp"],
        "application/vnd.contact.cmsg": ["cdbcmsg"],
        "application/vnd.cosmocaller": ["cmc"],
        "application/vnd.crick.clicker": ["clkx"],
        "application/vnd.crick.clicker.keyboard": ["clkk"],
        "application/vnd.crick.clicker.palette": ["clkp"],
        "application/vnd.crick.clicker.template": ["clkt"],
        "application/vnd.crick.clicker.wordbank": ["clkw"],
        "application/vnd.criticaltools.wbs+xml": ["wbs"],
        "application/vnd.ctc-posml": ["pml"],
        "application/vnd.cups-ppd": ["ppd"],
        "application/vnd.curl.car": ["car"],
        "application/vnd.curl.pcurl": ["pcurl"],
        "application/vnd.dart": ["dart"],
        "application/vnd.data-vision.rdz": ["rdz"],
        "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
        "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
        "application/vnd.dece.unspecified": ["uvx", "uvvx"],
        "application/vnd.dece.zip": ["uvz", "uvvz"],
        "application/vnd.denovo.fcselayout-link": ["fe_launch"],
        "application/vnd.dna": ["dna"],
        "application/vnd.dolby.mlp": ["mlp"],
        "application/vnd.dpgraph": ["dpg"],
        "application/vnd.dreamfactory": ["dfac"],
        "application/vnd.ds-keypoint": ["kpxx"],
        "application/vnd.dvb.ait": ["ait"],
        "application/vnd.dvb.service": ["svc"],
        "application/vnd.dynageo": ["geo"],
        "application/vnd.ecowin.chart": ["mag"],
        "application/vnd.enliven": ["nml"],
        "application/vnd.epson.esf": ["esf"],
        "application/vnd.epson.msf": ["msf"],
        "application/vnd.epson.quickanime": ["qam"],
        "application/vnd.epson.salt": ["slt"],
        "application/vnd.epson.ssf": ["ssf"],
        "application/vnd.eszigno3+xml": ["es3", "et3"],
        "application/vnd.ezpix-album": ["ez2"],
        "application/vnd.ezpix-package": ["ez3"],
        "application/vnd.fdf": ["fdf"],
        "application/vnd.fdsn.mseed": ["mseed"],
        "application/vnd.fdsn.seed": ["seed", "dataless"],
        "application/vnd.flographit": ["gph"],
        "application/vnd.fluxtime.clip": ["ftc"],
        "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
        "application/vnd.frogans.fnc": ["fnc"],
        "application/vnd.frogans.ltf": ["ltf"],
        "application/vnd.fsc.weblaunch": ["fsc"],
        "application/vnd.fujitsu.oasys": ["oas"],
        "application/vnd.fujitsu.oasys2": ["oa2"],
        "application/vnd.fujitsu.oasys3": ["oa3"],
        "application/vnd.fujitsu.oasysgp": ["fg5"],
        "application/vnd.fujitsu.oasysprs": ["bh2"],
        "application/vnd.fujixerox.ddd": ["ddd"],
        "application/vnd.fujixerox.docuworks": ["xdw"],
        "application/vnd.fujixerox.docuworks.binder": ["xbd"],
        "application/vnd.fuzzysheet": ["fzs"],
        "application/vnd.genomatix.tuxedo": ["txd"],
        "application/vnd.geogebra.file": ["ggb"],
        "application/vnd.geogebra.tool": ["ggt"],
        "application/vnd.geometry-explorer": ["gex", "gre"],
        "application/vnd.geonext": ["gxt"],
        "application/vnd.geoplan": ["g2w"],
        "application/vnd.geospace": ["g3w"],
        "application/vnd.gmx": ["gmx"],
        "application/vnd.google-apps.document": ["gdoc"],
        "application/vnd.google-apps.presentation": ["gslides"],
        "application/vnd.google-apps.spreadsheet": ["gsheet"],
        "application/vnd.google-earth.kml+xml": ["kml"],
        "application/vnd.google-earth.kmz": ["kmz"],
        "application/vnd.grafeq": ["gqf", "gqs"],
        "application/vnd.groove-account": ["gac"],
        "application/vnd.groove-help": ["ghf"],
        "application/vnd.groove-identity-message": ["gim"],
        "application/vnd.groove-injector": ["grv"],
        "application/vnd.groove-tool-message": ["gtm"],
        "application/vnd.groove-tool-template": ["tpl"],
        "application/vnd.groove-vcard": ["vcg"],
        "application/vnd.hal+xml": ["hal"],
        "application/vnd.handheld-entertainment+xml": ["zmm"],
        "application/vnd.hbci": ["hbci"],
        "application/vnd.hhe.lesson-player": ["les"],
        "application/vnd.hp-hpgl": ["hpgl"],
        "application/vnd.hp-hpid": ["hpid"],
        "application/vnd.hp-hps": ["hps"],
        "application/vnd.hp-jlyt": ["jlt"],
        "application/vnd.hp-pcl": ["pcl"],
        "application/vnd.hp-pclxl": ["pclxl"],
        "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
        "application/vnd.ibm.minipay": ["mpy"],
        "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
        "application/vnd.ibm.rights-management": ["irm"],
        "application/vnd.ibm.secure-container": ["sc"],
        "application/vnd.iccprofile": ["icc", "icm"],
        "application/vnd.igloader": ["igl"],
        "application/vnd.immervision-ivp": ["ivp"],
        "application/vnd.immervision-ivu": ["ivu"],
        "application/vnd.insors.igm": ["igm"],
        "application/vnd.intercon.formnet": ["xpw", "xpx"],
        "application/vnd.intergeo": ["i2g"],
        "application/vnd.intu.qbo": ["qbo"],
        "application/vnd.intu.qfx": ["qfx"],
        "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
        "application/vnd.irepository.package+xml": ["irp"],
        "application/vnd.is-xpr": ["xpr"],
        "application/vnd.isac.fcs": ["fcs"],
        "application/vnd.jam": ["jam"],
        "application/vnd.jcp.javame.midlet-rms": ["rms"],
        "application/vnd.jisp": ["jisp"],
        "application/vnd.joost.joda-archive": ["joda"],
        "application/vnd.kahootz": ["ktz", "ktr"],
        "application/vnd.kde.karbon": ["karbon"],
        "application/vnd.kde.kchart": ["chrt"],
        "application/vnd.kde.kformula": ["kfo"],
        "application/vnd.kde.kivio": ["flw"],
        "application/vnd.kde.kontour": ["kon"],
        "application/vnd.kde.kpresenter": ["kpr", "kpt"],
        "application/vnd.kde.kspread": ["ksp"],
        "application/vnd.kde.kword": ["kwd", "kwt"],
        "application/vnd.kenameaapp": ["htke"],
        "application/vnd.kidspiration": ["kia"],
        "application/vnd.kinar": ["kne", "knp"],
        "application/vnd.koan": ["skp", "skd", "skt", "skm"],
        "application/vnd.kodak-descriptor": ["sse"],
        "application/vnd.las.las+xml": ["lasxml"],
        "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
        "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
        "application/vnd.lotus-1-2-3": ["123"],
        "application/vnd.lotus-approach": ["apr"],
        "application/vnd.lotus-freelance": ["pre"],
        "application/vnd.lotus-notes": ["nsf"],
        "application/vnd.lotus-organizer": ["org"],
        "application/vnd.lotus-screencam": ["scm"],
        "application/vnd.lotus-wordpro": ["lwp"],
        "application/vnd.macports.portpkg": ["portpkg"],
        "application/vnd.mcd": ["mcd"],
        "application/vnd.medcalcdata": ["mc1"],
        "application/vnd.mediastation.cdkey": ["cdkey"],
        "application/vnd.mfer": ["mwf"],
        "application/vnd.mfmp": ["mfm"],
        "application/vnd.micrografx.flo": ["flo"],
        "application/vnd.micrografx.igx": ["igx"],
        "application/vnd.mif": ["mif"],
        "application/vnd.mobius.daf": ["daf"],
        "application/vnd.mobius.dis": ["dis"],
        "application/vnd.mobius.mbk": ["mbk"],
        "application/vnd.mobius.mqy": ["mqy"],
        "application/vnd.mobius.msl": ["msl"],
        "application/vnd.mobius.plc": ["plc"],
        "application/vnd.mobius.txf": ["txf"],
        "application/vnd.mophun.application": ["mpn"],
        "application/vnd.mophun.certificate": ["mpc"],
        "application/vnd.mozilla.xul+xml": ["xul"],
        "application/vnd.ms-artgalry": ["cil"],
        "application/vnd.ms-cab-compressed": ["cab"],
        "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
        "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
        "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
        "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
        "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
        "application/vnd.ms-fontobject": ["eot"],
        "application/vnd.ms-htmlhelp": ["chm"],
        "application/vnd.ms-ims": ["ims"],
        "application/vnd.ms-lrm": ["lrm"],
        "application/vnd.ms-officetheme": ["thmx"],
        "application/vnd.ms-outlook": ["msg"],
        "application/vnd.ms-pki.seccat": ["cat"],
        "application/vnd.ms-pki.stl": ["*stl"],
        "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
        "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
        "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
        "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
        "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
        "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
        "application/vnd.ms-project": ["mpp", "mpt"],
        "application/vnd.ms-word.document.macroenabled.12": ["docm"],
        "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
        "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
        "application/vnd.ms-wpl": ["wpl"],
        "application/vnd.ms-xpsdocument": ["xps"],
        "application/vnd.mseq": ["mseq"],
        "application/vnd.musician": ["mus"],
        "application/vnd.muvee.style": ["msty"],
        "application/vnd.mynfc": ["taglet"],
        "application/vnd.neurolanguage.nlu": ["nlu"],
        "application/vnd.nitf": ["ntf", "nitf"],
        "application/vnd.noblenet-directory": ["nnd"],
        "application/vnd.noblenet-sealer": ["nns"],
        "application/vnd.noblenet-web": ["nnw"],
        "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
        "application/vnd.nokia.n-gage.data": ["ngdat"],
        "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
        "application/vnd.nokia.radio-preset": ["rpst"],
        "application/vnd.nokia.radio-presets": ["rpss"],
        "application/vnd.novadigm.edm": ["edm"],
        "application/vnd.novadigm.edx": ["edx"],
        "application/vnd.novadigm.ext": ["ext"],
        "application/vnd.oasis.opendocument.chart": ["odc"],
        "application/vnd.oasis.opendocument.chart-template": ["otc"],
        "application/vnd.oasis.opendocument.database": ["odb"],
        "application/vnd.oasis.opendocument.formula": ["odf"],
        "application/vnd.oasis.opendocument.formula-template": ["odft"],
        "application/vnd.oasis.opendocument.graphics": ["odg"],
        "application/vnd.oasis.opendocument.graphics-template": ["otg"],
        "application/vnd.oasis.opendocument.image": ["odi"],
        "application/vnd.oasis.opendocument.image-template": ["oti"],
        "application/vnd.oasis.opendocument.presentation": ["odp"],
        "application/vnd.oasis.opendocument.presentation-template": ["otp"],
        "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
        "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
        "application/vnd.oasis.opendocument.text": ["odt"],
        "application/vnd.oasis.opendocument.text-master": ["odm"],
        "application/vnd.oasis.opendocument.text-template": ["ott"],
        "application/vnd.oasis.opendocument.text-web": ["oth"],
        "application/vnd.olpc-sugar": ["xo"],
        "application/vnd.oma.dd2+xml": ["dd2"],
        "application/vnd.openblox.game+xml": ["obgx"],
        "application/vnd.openofficeorg.extension": ["oxt"],
        "application/vnd.openstreetmap.data+xml": ["osm"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"],
        "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"],
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"],
        "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"],
        "application/vnd.osgeo.mapguide.package": ["mgp"],
        "application/vnd.osgi.dp": ["dp"],
        "application/vnd.osgi.subsystem": ["esa"],
        "application/vnd.palm": ["pdb", "pqa", "oprc"],
        "application/vnd.pawaafile": ["paw"],
        "application/vnd.pg.format": ["str"],
        "application/vnd.pg.osasli": ["ei6"],
        "application/vnd.picsel": ["efif"],
        "application/vnd.pmi.widget": ["wg"],
        "application/vnd.pocketlearn": ["plf"],
        "application/vnd.powerbuilder6": ["pbd"],
        "application/vnd.previewsystems.box": ["box"],
        "application/vnd.proteus.magazine": ["mgz"],
        "application/vnd.publishare-delta-tree": ["qps"],
        "application/vnd.pvi.ptid1": ["ptid"],
        "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
        "application/vnd.realvnc.bed": ["bed"],
        "application/vnd.recordare.musicxml": ["mxl"],
        "application/vnd.recordare.musicxml+xml": ["musicxml"],
        "application/vnd.rig.cryptonote": ["cryptonote"],
        "application/vnd.rim.cod": ["cod"],
        "application/vnd.rn-realmedia": ["rm"],
        "application/vnd.rn-realmedia-vbr": ["rmvb"],
        "application/vnd.route66.link66+xml": ["link66"],
        "application/vnd.sailingtracker.track": ["st"],
        "application/vnd.seemail": ["see"],
        "application/vnd.sema": ["sema"],
        "application/vnd.semd": ["semd"],
        "application/vnd.semf": ["semf"],
        "application/vnd.shana.informed.formdata": ["ifm"],
        "application/vnd.shana.informed.formtemplate": ["itp"],
        "application/vnd.shana.informed.interchange": ["iif"],
        "application/vnd.shana.informed.package": ["ipk"],
        "application/vnd.simtech-mindmapper": ["twd", "twds"],
        "application/vnd.smaf": ["mmf"],
        "application/vnd.smart.teacher": ["teacher"],
        "application/vnd.software602.filler.form+xml": ["fo"],
        "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
        "application/vnd.spotfire.dxp": ["dxp"],
        "application/vnd.spotfire.sfs": ["sfs"],
        "application/vnd.stardivision.calc": ["sdc"],
        "application/vnd.stardivision.draw": ["sda"],
        "application/vnd.stardivision.impress": ["sdd"],
        "application/vnd.stardivision.math": ["smf"],
        "application/vnd.stardivision.writer": ["sdw", "vor"],
        "application/vnd.stardivision.writer-global": ["sgl"],
        "application/vnd.stepmania.package": ["smzip"],
        "application/vnd.stepmania.stepchart": ["sm"],
        "application/vnd.sun.wadl+xml": ["wadl"],
        "application/vnd.sun.xml.calc": ["sxc"],
        "application/vnd.sun.xml.calc.template": ["stc"],
        "application/vnd.sun.xml.draw": ["sxd"],
        "application/vnd.sun.xml.draw.template": ["std"],
        "application/vnd.sun.xml.impress": ["sxi"],
        "application/vnd.sun.xml.impress.template": ["sti"],
        "application/vnd.sun.xml.math": ["sxm"],
        "application/vnd.sun.xml.writer": ["sxw"],
        "application/vnd.sun.xml.writer.global": ["sxg"],
        "application/vnd.sun.xml.writer.template": ["stw"],
        "application/vnd.sus-calendar": ["sus", "susp"],
        "application/vnd.svd": ["svd"],
        "application/vnd.symbian.install": ["sis", "sisx"],
        "application/vnd.syncml+xml": ["xsm"],
        "application/vnd.syncml.dm+wbxml": ["bdm"],
        "application/vnd.syncml.dm+xml": ["xdm"],
        "application/vnd.syncml.dmddf+xml": ["ddf"],
        "application/vnd.tao.intent-module-archive": ["tao"],
        "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
        "application/vnd.tmobile-livetv": ["tmo"],
        "application/vnd.trid.tpt": ["tpt"],
        "application/vnd.triscape.mxs": ["mxs"],
        "application/vnd.trueapp": ["tra"],
        "application/vnd.ufdl": ["ufd", "ufdl"],
        "application/vnd.uiq.theme": ["utz"],
        "application/vnd.umajin": ["umj"],
        "application/vnd.unity": ["unityweb"],
        "application/vnd.uoml+xml": ["uoml"],
        "application/vnd.vcx": ["vcx"],
        "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
        "application/vnd.visionary": ["vis"],
        "application/vnd.vsf": ["vsf"],
        "application/vnd.wap.wbxml": ["wbxml"],
        "application/vnd.wap.wmlc": ["wmlc"],
        "application/vnd.wap.wmlscriptc": ["wmlsc"],
        "application/vnd.webturbo": ["wtb"],
        "application/vnd.wolfram.player": ["nbp"],
        "application/vnd.wordperfect": ["wpd"],
        "application/vnd.wqd": ["wqd"],
        "application/vnd.wt.stf": ["stf"],
        "application/vnd.xara": ["xar"],
        "application/vnd.xfdl": ["xfdl"],
        "application/vnd.yamaha.hv-dic": ["hvd"],
        "application/vnd.yamaha.hv-script": ["hvs"],
        "application/vnd.yamaha.hv-voice": ["hvp"],
        "application/vnd.yamaha.openscoreformat": ["osf"],
        "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
        "application/vnd.yamaha.smaf-audio": ["saf"],
        "application/vnd.yamaha.smaf-phrase": ["spf"],
        "application/vnd.yellowriver-custom-menu": ["cmp"],
        "application/vnd.zul": ["zir", "zirz"],
        "application/vnd.zzazz.deck+xml": ["zaz"],
        "application/x-7z-compressed": ["7z"],
        "application/x-abiword": ["abw"],
        "application/x-ace-compressed": ["ace"],
        "application/x-apple-diskimage": ["*dmg"],
        "application/x-arj": ["arj"],
        "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
        "application/x-authorware-map": ["aam"],
        "application/x-authorware-seg": ["aas"],
        "application/x-bcpio": ["bcpio"],
        "application/x-bdoc": ["*bdoc"],
        "application/x-bittorrent": ["torrent"],
        "application/x-blorb": ["blb", "blorb"],
        "application/x-bzip": ["bz"],
        "application/x-bzip2": ["bz2", "boz"],
        "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
        "application/x-cdlink": ["vcd"],
        "application/x-cfs-compressed": ["cfs"],
        "application/x-chat": ["chat"],
        "application/x-chess-pgn": ["pgn"],
        "application/x-chrome-extension": ["crx"],
        "application/x-cocoa": ["cco"],
        "application/x-conference": ["nsc"],
        "application/x-cpio": ["cpio"],
        "application/x-csh": ["csh"],
        "application/x-debian-package": ["*deb", "udeb"],
        "application/x-dgc-compressed": ["dgc"],
        "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
        "application/x-doom": ["wad"],
        "application/x-dtbncx+xml": ["ncx"],
        "application/x-dtbook+xml": ["dtb"],
        "application/x-dtbresource+xml": ["res"],
        "application/x-dvi": ["dvi"],
        "application/x-envoy": ["evy"],
        "application/x-eva": ["eva"],
        "application/x-font-bdf": ["bdf"],
        "application/x-font-ghostscript": ["gsf"],
        "application/x-font-linux-psf": ["psf"],
        "application/x-font-pcf": ["pcf"],
        "application/x-font-snf": ["snf"],
        "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
        "application/x-freearc": ["arc"],
        "application/x-futuresplash": ["spl"],
        "application/x-gca-compressed": ["gca"],
        "application/x-glulx": ["ulx"],
        "application/x-gnumeric": ["gnumeric"],
        "application/x-gramps-xml": ["gramps"],
        "application/x-gtar": ["gtar"],
        "application/x-hdf": ["hdf"],
        "application/x-httpd-php": ["php"],
        "application/x-install-instructions": ["install"],
        "application/x-iso9660-image": ["*iso"],
        "application/x-java-archive-diff": ["jardiff"],
        "application/x-java-jnlp-file": ["jnlp"],
        "application/x-keepass2": ["kdbx"],
        "application/x-latex": ["latex"],
        "application/x-lua-bytecode": ["luac"],
        "application/x-lzh-compressed": ["lzh", "lha"],
        "application/x-makeself": ["run"],
        "application/x-mie": ["mie"],
        "application/x-mobipocket-ebook": ["prc", "mobi"],
        "application/x-ms-application": ["application"],
        "application/x-ms-shortcut": ["lnk"],
        "application/x-ms-wmd": ["wmd"],
        "application/x-ms-wmz": ["wmz"],
        "application/x-ms-xbap": ["xbap"],
        "application/x-msaccess": ["mdb"],
        "application/x-msbinder": ["obd"],
        "application/x-mscardfile": ["crd"],
        "application/x-msclip": ["clp"],
        "application/x-msdos-program": ["*exe"],
        "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
        "application/x-msmediaview": ["mvb", "m13", "m14"],
        "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
        "application/x-msmoney": ["mny"],
        "application/x-mspublisher": ["pub"],
        "application/x-msschedule": ["scd"],
        "application/x-msterminal": ["trm"],
        "application/x-mswrite": ["wri"],
        "application/x-netcdf": ["nc", "cdf"],
        "application/x-ns-proxy-autoconfig": ["pac"],
        "application/x-nzb": ["nzb"],
        "application/x-perl": ["pl", "pm"],
        "application/x-pilot": ["*prc", "*pdb"],
        "application/x-pkcs12": ["p12", "pfx"],
        "application/x-pkcs7-certificates": ["p7b", "spc"],
        "application/x-pkcs7-certreqresp": ["p7r"],
        "application/x-rar-compressed": ["rar"],
        "application/x-redhat-package-manager": ["rpm"],
        "application/x-research-info-systems": ["ris"],
        "application/x-sea": ["sea"],
        "application/x-sh": ["sh"],
        "application/x-shar": ["shar"],
        "application/x-shockwave-flash": ["swf"],
        "application/x-silverlight-app": ["xap"],
        "application/x-sql": ["sql"],
        "application/x-stuffit": ["sit"],
        "application/x-stuffitx": ["sitx"],
        "application/x-subrip": ["srt"],
        "application/x-sv4cpio": ["sv4cpio"],
        "application/x-sv4crc": ["sv4crc"],
        "application/x-t3vm-image": ["t3"],
        "application/x-tads": ["gam"],
        "application/x-tar": ["tar"],
        "application/x-tcl": ["tcl", "tk"],
        "application/x-tex": ["tex"],
        "application/x-tex-tfm": ["tfm"],
        "application/x-texinfo": ["texinfo", "texi"],
        "application/x-tgif": ["*obj"],
        "application/x-ustar": ["ustar"],
        "application/x-virtualbox-hdd": ["hdd"],
        "application/x-virtualbox-ova": ["ova"],
        "application/x-virtualbox-ovf": ["ovf"],
        "application/x-virtualbox-vbox": ["vbox"],
        "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
        "application/x-virtualbox-vdi": ["vdi"],
        "application/x-virtualbox-vhd": ["vhd"],
        "application/x-virtualbox-vmdk": ["vmdk"],
        "application/x-wais-source": ["src"],
        "application/x-web-app-manifest+json": ["webapp"],
        "application/x-x509-ca-cert": ["der", "crt", "pem"],
        "application/x-xfig": ["fig"],
        "application/x-xliff+xml": ["*xlf"],
        "application/x-xpinstall": ["xpi"],
        "application/x-xz": ["xz"],
        "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
        "audio/vnd.dece.audio": ["uva", "uvva"],
        "audio/vnd.digital-winds": ["eol"],
        "audio/vnd.dra": ["dra"],
        "audio/vnd.dts": ["dts"],
        "audio/vnd.dts.hd": ["dtshd"],
        "audio/vnd.lucent.voice": ["lvp"],
        "audio/vnd.ms-playready.media.pya": ["pya"],
        "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
        "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
        "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
        "audio/vnd.rip": ["rip"],
        "audio/x-aac": ["aac"],
        "audio/x-aiff": ["aif", "aiff", "aifc"],
        "audio/x-caf": ["caf"],
        "audio/x-flac": ["flac"],
        "audio/x-m4a": ["*m4a"],
        "audio/x-matroska": ["mka"],
        "audio/x-mpegurl": ["m3u"],
        "audio/x-ms-wax": ["wax"],
        "audio/x-ms-wma": ["wma"],
        "audio/x-pn-realaudio": ["ram", "ra"],
        "audio/x-pn-realaudio-plugin": ["rmp"],
        "audio/x-realaudio": ["*ra"],
        "audio/x-wav": ["*wav"],
        "chemical/x-cdx": ["cdx"],
        "chemical/x-cif": ["cif"],
        "chemical/x-cmdf": ["cmdf"],
        "chemical/x-cml": ["cml"],
        "chemical/x-csml": ["csml"],
        "chemical/x-xyz": ["xyz"],
        "image/prs.btif": ["btif"],
        "image/prs.pti": ["pti"],
        "image/vnd.adobe.photoshop": ["psd"],
        "image/vnd.airzip.accelerator.azv": ["azv"],
        "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
        "image/vnd.djvu": ["djvu", "djv"],
        "image/vnd.dvb.subtitle": ["*sub"],
        "image/vnd.dwg": ["dwg"],
        "image/vnd.dxf": ["dxf"],
        "image/vnd.fastbidsheet": ["fbs"],
        "image/vnd.fpx": ["fpx"],
        "image/vnd.fst": ["fst"],
        "image/vnd.fujixerox.edmics-mmr": ["mmr"],
        "image/vnd.fujixerox.edmics-rlc": ["rlc"],
        "image/vnd.microsoft.icon": ["ico"],
        "image/vnd.ms-dds": ["dds"],
        "image/vnd.ms-modi": ["mdi"],
        "image/vnd.ms-photo": ["wdp"],
        "image/vnd.net-fpx": ["npx"],
        "image/vnd.tencent.tap": ["tap"],
        "image/vnd.valve.source.texture": ["vtf"],
        "image/vnd.wap.wbmp": ["wbmp"],
        "image/vnd.xiff": ["xif"],
        "image/vnd.zbrush.pcx": ["pcx"],
        "image/x-3ds": ["3ds"],
        "image/x-cmu-raster": ["ras"],
        "image/x-cmx": ["cmx"],
        "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
        "image/x-icon": ["*ico"],
        "image/x-jng": ["jng"],
        "image/x-mrsid-image": ["sid"],
        "image/x-ms-bmp": ["*bmp"],
        "image/x-pcx": ["*pcx"],
        "image/x-pict": ["pic", "pct"],
        "image/x-portable-anymap": ["pnm"],
        "image/x-portable-bitmap": ["pbm"],
        "image/x-portable-graymap": ["pgm"],
        "image/x-portable-pixmap": ["ppm"],
        "image/x-rgb": ["rgb"],
        "image/x-tga": ["tga"],
        "image/x-xbitmap": ["xbm"],
        "image/x-xpixmap": ["xpm"],
        "image/x-xwindowdump": ["xwd"],
        "message/vnd.wfa.wsc": ["wsc"],
        "model/vnd.collada+xml": ["dae"],
        "model/vnd.dwf": ["dwf"],
        "model/vnd.gdl": ["gdl"],
        "model/vnd.gtw": ["gtw"],
        "model/vnd.mts": ["mts"],
        "model/vnd.opengex": ["ogex"],
        "model/vnd.parasolid.transmit.binary": ["x_b"],
        "model/vnd.parasolid.transmit.text": ["x_t"],
        "model/vnd.usdz+zip": ["usdz"],
        "model/vnd.valve.source.compiled-map": ["bsp"],
        "model/vnd.vtu": ["vtu"],
        "text/prs.lines.tag": ["dsc"],
        "text/vnd.curl": ["curl"],
        "text/vnd.curl.dcurl": ["dcurl"],
        "text/vnd.curl.mcurl": ["mcurl"],
        "text/vnd.curl.scurl": ["scurl"],
        "text/vnd.dvb.subtitle": ["sub"],
        "text/vnd.fly": ["fly"],
        "text/vnd.fmi.flexstor": ["flx"],
        "text/vnd.graphviz": ["gv"],
        "text/vnd.in3d.3dml": ["3dml"],
        "text/vnd.in3d.spot": ["spot"],
        "text/vnd.sun.j2me.app-descriptor": ["jad"],
        "text/vnd.wap.wml": ["wml"],
        "text/vnd.wap.wmlscript": ["wmls"],
        "text/x-asm": ["s", "asm"],
        "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
        "text/x-component": ["htc"],
        "text/x-fortran": ["f", "for", "f77", "f90"],
        "text/x-handlebars-template": ["hbs"],
        "text/x-java-source": ["java"],
        "text/x-lua": ["lua"],
        "text/x-markdown": ["mkd"],
        "text/x-nfo": ["nfo"],
        "text/x-opml": ["opml"],
        "text/x-org": ["*org"],
        "text/x-pascal": ["p", "pas"],
        "text/x-processing": ["pde"],
        "text/x-sass": ["sass"],
        "text/x-scss": ["scss"],
        "text/x-setext": ["etx"],
        "text/x-sfv": ["sfv"],
        "text/x-suse-ymp": ["ymp"],
        "text/x-uuencode": ["uu"],
        "text/x-vcalendar": ["vcs"],
        "text/x-vcard": ["vcf"],
        "video/vnd.dece.hd": ["uvh", "uvvh"],
        "video/vnd.dece.mobile": ["uvm", "uvvm"],
        "video/vnd.dece.pd": ["uvp", "uvvp"],
        "video/vnd.dece.sd": ["uvs", "uvvs"],
        "video/vnd.dece.video": ["uvv", "uvvv"],
        "video/vnd.dvb.file": ["dvb"],
        "video/vnd.fvt": ["fvt"],
        "video/vnd.mpegurl": ["mxu", "m4u"],
        "video/vnd.ms-playready.media.pyv": ["pyv"],
        "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
        "video/vnd.vivo": ["viv"],
        "video/x-f4v": ["f4v"],
        "video/x-fli": ["fli"],
        "video/x-flv": ["flv"],
        "video/x-m4v": ["m4v"],
        "video/x-matroska": ["mkv", "mk3d", "mks"],
        "video/x-mng": ["mng"],
        "video/x-ms-asf": ["asf", "asx"],
        "video/x-ms-vob": ["vob"],
        "video/x-ms-wm": ["wm"],
        "video/x-ms-wmv": ["wmv"],
        "video/x-ms-wmx": ["wmx"],
        "video/x-ms-wvx": ["wvx"],
        "video/x-msvideo": ["avi"],
        "video/x-sgi-movie": ["movie"],
        "video/x-smv": ["smv"],
        "x-conference/x-cooltalk": ["ice"] };

    }, function (e, t, n) {
      function i(e, t) {
        var n = this;
        if (!x.canFileSlice()) return e.SkipTask = !0, void n.postObject(e, t);
        var i,
        o,
        r = new v(),
        c = e.TaskId,
        p = e.Bucket,
        u = e.Region,
        d = e.Key,
        m = e.FilePath,
        f = e.ChunkSize || e.SliceSize || n.options.ChunkSize,
        g = e.AsyncLimit,
        y = e.StorageClass,
        C = e.ServerSideEncryption,
        k = e.onHashProgress;
        r.on("error", function (e) {
          if (n._isRunningTask(c)) return t(e);
        }), r.on("upload_complete", function (e) {
          t(null, e);
        }), r.on("upload_slice_complete", function (e) {
          l.call(n, {
            Bucket: p,
            Region: u,
            Key: d,
            UploadId: e.UploadId,
            SliceList: e.SliceList },
          function (t, a) {
            if (n._isRunningTask(c)) {
              if (h.removeUsing(e.UploadId), t) return o(null, !0), r.emit("error", t);
              h.removeUploadId(e.UploadId), o({
                loaded: i,
                total: i },
              !0), r.emit("upload_complete", a);
            }
          });
        }), r.on("get_upload_data_finish", function (t) {
          var a = h.getFileId(e.FileStat, e.ChunkSize, p, d);
          a && h.saveUploadId(a, t.UploadId, n.options.UploadIdCacheLimit), h.setUsing(t.UploadId), o(null, !0), s.call(n, {
            TaskId: c,
            Bucket: p,
            Region: u,
            Key: d,
            FilePath: m,
            FileSize: i,
            SliceSize: f,
            AsyncLimit: g,
            ServerSideEncryption: C,
            UploadData: t,
            onProgress: o },
          function (e, t) {
            if (n._isRunningTask(c)) return e ? (o(null, !0), r.emit("error", e)) : void r.emit("upload_slice_complete", t);
          });
        }), r.on("get_file_size_finish", function () {
          if (o = x.throttleOnProgress.call(n, i, e.onProgress), e.UploadData.UploadId) r.emit("get_upload_data_finish", e.UploadData);else {
            var t = x.extend({
              TaskId: c,
              Bucket: p,
              Region: u,
              Key: d,
              Headers: e.Headers,
              StorageClass: y,
              FilePath: m,
              FileSize: i,
              SliceSize: f,
              onHashProgress: k },
            e);
            a.call(n, t, function (t, i) {
              if (n._isRunningTask(c)) {
                if (t) return r.emit("error", t);
                e.UploadData.UploadId = i.UploadId, e.UploadData.PartList = i.PartList, r.emit("get_upload_data_finish", e.UploadData);
              }
            });
          }
        }), i = e.ContentLength, delete e.ContentLength, !e.Headers && (e.Headers = {}), x.each(e.Headers, function (t, n) {
          "content-length" === n.toLowerCase() && delete e.Headers[n];
        }), function () {
          for (var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], a = 1048576, o = 0; o < t.length && (a = 1024 * t[o] * 1024, !(i / a <= n.options.MaxPartNumber)); o++) {;}

          e.ChunkSize = e.SliceSize = f = Math.max(f, a);
        }(), 0 === i ? (e.Body = "", e.ContentLength = 0, e.SkipTask = !0, n.putObject(e, function (e, n) {
          if (e) return t(e);
          t(null, n);
        })) : r.emit("get_file_size_finish");
      }

      function a(e, t) {
        var n = e.TaskId,
        i = e.Bucket,
        a = e.Region,
        s = e.Key,
        c = e.StorageClass,
        l = this,
        p = {},
        u = e.FileSize,
        d = e.SliceSize,
        m = Math.ceil(u / d),
        f = 0,
        y = 0,
        C = x.throttleOnProgress.call(l, u, e.onHashProgress),
        k = function k(t, n) {
          var i = d * (t - 1),
          a = Math.min(i + d, u),
          o = a - i;
          p[t] ? n(null, {
            PartNumber: t,
            ETag: p[t],
            Size: o }) :
          x.fileSlice(e.FilePath, i, a, function (e) {
            try {
              var i = x.getFileMd5(e);
            } catch (e) {
              return n(e);
            }

            var a = '"' + i + '"';
            p[t] = a, f += 1, y += o, n(null, {
              PartNumber: t,
              ETag: a,
              Size: o }),
            C({
              loaded: y,
              total: u });

          });
        },
        b = function b(e, t) {
          var n = e.length;
          if (0 === n) return t(null, !0);
          if (n > m) return t(null, !1);

          if (n > 1) {
            if (Math.max(e[0].Size, e[1].Size) !== d) return t(null, !1);
          }

          var i = function i(a) {
            if (a < n) {
              var o = e[a];
              k(o.PartNumber, function (e, n) {
                n && n.ETag === o.ETag && n.Size === o.Size ? i(a + 1) : t(null, !1);
              });
            } else t(null, !0);
          };

          i(0);
        },
        S = new v();

        S.on("error", function (e) {
          if (l._isRunningTask(n)) return t(e);
        }), S.on("upload_id_available", function (e) {
          var n = {},
          i = [];
          x.each(e.PartList, function (e) {
            n[e.PartNumber] = e;
          });

          for (var a = 1; a <= m; a++) {
            var o = n[a];
            o ? (o.PartNumber = a, o.Uploaded = !0) : o = {
              PartNumber: a,
              ETag: null,
              Uploaded: !1 },
            i.push(o);
          }

          e.PartList = i, t(null, e);
        }), S.on("no_available_upload_id", function () {
          if (l._isRunningTask(n)) {
            var o = x.extend({
              Bucket: i,
              Region: a,
              Key: s,
              Headers: x.clone(e.Headers),
              Query: x.clone(e.Query),
              StorageClass: c },
            e);
            l.multipartInit(o, function (e, i) {
              if (l._isRunningTask(n)) {
                if (e) return S.emit("error", e);
                var a = i.UploadId;
                if (!a) return t({
                  Message: "no upload id" });

                S.emit("upload_id_available", {
                  UploadId: a,
                  PartList: [] });

              }
            });
          }
        }), S.on("has_and_check_upload_id", function (e) {
          e = e.reverse(), g.eachLimit(e, 1, function (e, t) {
            if (l._isRunningTask(n)) return h.using[e] ? void t() : void r.call(l, {
              Bucket: i,
              Region: a,
              Key: s,
              UploadId: e },
            function (i, a) {
              if (l._isRunningTask(n)) {
                if (i) return h.removeUsing(e), S.emit("error", i);
                var o = a.PartList;
                o.forEach(function (e) {
                  e.PartNumber *= 1, e.Size *= 1, e.ETag = e.ETag || "";
                }), b(o, function (i, a) {
                  if (l._isRunningTask(n)) return i ? S.emit("error", i) : void (a ? t({
                    UploadId: e,
                    PartList: o }) :
                  t());
                });
              }
            });
          }, function (e) {
            l._isRunningTask(n) && (C(null, !0), e && e.UploadId ? S.emit("upload_id_available", e) : S.emit("no_available_upload_id"));
          });
        }), S.on("seek_local_avail_upload_id", function (t) {
          var o = h.getFileId(e.FileStat, e.ChunkSize, i, s),
          c = h.getUploadIdList(o);
          if (!o || !c) return void S.emit("has_and_check_upload_id", t);

          var p = function p(e) {
            if (e >= c.length) return void S.emit("has_and_check_upload_id", t);
            var o = c[e];
            return x.isInArray(t, o) ? h.using[o] ? void p(e + 1) : void r.call(l, {
              Bucket: i,
              Region: a,
              Key: s,
              UploadId: o },
            function (t, i) {
              l._isRunningTask(n) && (t ? (h.removeUploadId(o), p(e + 1)) : S.emit("upload_id_available", {
                UploadId: o,
                PartList: i.PartList }));

            }) : (h.removeUploadId(o), void p(e + 1));
          };

          p(0);
        }), S.on("get_remote_upload_id_list", function () {
          o.call(l, {
            Bucket: i,
            Region: a,
            Key: s },
          function (t, a) {
            if (l._isRunningTask(n)) {
              if (t) return S.emit("error", t);
              var o = x.filter(a.UploadList, function (e) {
                return e.Key === s && (!c || e.StorageClass.toUpperCase() === c.toUpperCase());
              }).reverse().map(function (e) {
                return e.UploadId || e.UploadID;
              });
              if (o.length) S.emit("seek_local_avail_upload_id", o);else {
                var r,
                p = h.getFileId(e.FileStat, e.ChunkSize, i, s);
                p && (r = h.getUploadIdList(p)) && x.each(r, function (e) {
                  h.removeUploadId(e);
                }), S.emit("no_available_upload_id");
              }
            }
          });
        }), S.emit("get_remote_upload_id_list");
      }

      function o(e, t) {
        var n = this,
        i = [],
        a = {
          Bucket: e.Bucket,
          Region: e.Region,
          Prefix: e.Key },

        o = function o() {
          n.multipartList(a, function (e, n) {
            if (e) return t(e);
            i.push.apply(i, n.Upload || []), "true" === n.IsTruncated ? (a.KeyMarker = n.NextKeyMarker, a.UploadIdMarker = n.NextUploadIdMarker, o()) : t(null, {
              UploadList: i });

          });
        };

        o();
      }

      function r(e, t) {
        var n = this,
        i = [],
        a = {
          Bucket: e.Bucket,
          Region: e.Region,
          Key: e.Key,
          UploadId: e.UploadId },

        o = function o() {
          n.multipartListPart(a, function (e, n) {
            if (e) return t(e);
            i.push.apply(i, n.Part || []), "true" === n.IsTruncated ? (a.PartNumberMarker = n.NextPartNumberMarker, o()) : t(null, {
              PartList: i });

          });
        };

        o();
      }

      function s(e, t) {
        var n = this,
        i = e.TaskId,
        a = e.Bucket,
        o = e.Region,
        r = e.Key,
        s = e.UploadData,
        l = e.FileSize,
        p = e.SliceSize,
        u = Math.min(e.AsyncLimit || n.options.ChunkParallelLimit || 1, 256),
        d = e.FilePath,
        m = Math.ceil(l / p),
        f = 0,
        h = e.ServerSideEncryption,
        v = x.filter(s.PartList, function (e) {
          return e.Uploaded && (f += e.PartNumber >= m ? l % p || p : p), !e.Uploaded;
        }),
        y = e.onProgress;
        g.eachLimit(v, u, function (e, t) {
          if (n._isRunningTask(i)) {
            var u = e.PartNumber,
            m = Math.min(l, e.PartNumber * p) - (e.PartNumber - 1) * p,
            g = 0;
            c.call(n, {
              TaskId: i,
              Bucket: a,
              Region: o,
              Key: r,
              SliceSize: p,
              FileSize: l,
              PartNumber: u,
              ServerSideEncryption: h,
              FilePath: d,
              UploadData: s,
              onProgress: function onProgress(e) {
                f += e.loaded - g, g = e.loaded, y({
                  loaded: f,
                  total: l });

              } },
            function (a, o) {
              n._isRunningTask(i) && (a ? f -= g : (f += m - g, e.ETag = o.ETag), y({
                loaded: f,
                total: l }),
              t(a || null, o));
            });
          }
        }, function (e) {
          if (n._isRunningTask(i)) return e ? t(e) : void t(null, {
            UploadId: s.UploadId,
            SliceList: s.PartList });

        });
      }

      function c(e, t) {
        var n = this,
        i = e.TaskId,
        a = e.Bucket,
        o = e.Region,
        r = e.Key,
        s = e.FileSize,
        c = e.FilePath,
        l = 1 * e.PartNumber,
        p = e.SliceSize,
        u = e.ServerSideEncryption,
        d = e.UploadData,
        m = n.options.ChunkRetryTimes + 1,
        f = p * (l - 1),
        h = p,
        v = f + p;
        v > s && (v = s, h = v - f), x.fileSlice(c, f, v, function (s) {
          var c = x.getFileMd5(s),
          p = c ? x.binaryBase64(c) : null,
          f = d.PartList[l - 1];
          g.retry(m, function (t) {
            n._isRunningTask(i) && n.multipartUpload({
              TaskId: i,
              Bucket: a,
              Region: o,
              Key: r,
              ContentLength: h,
              PartNumber: l,
              UploadId: d.UploadId,
              ServerSideEncryption: u,
              Body: s,
              onProgress: e.onProgress,
              ContentMD5: p },
            function (e, a) {
              if (n._isRunningTask(i)) return e ? t(e) : (f.Uploaded = !0, t(null, a));
            });
          }, function (e, a) {
            if (n._isRunningTask(i)) return t(e, a);
          });
        });
      }

      function l(e, t) {
        var n = e.Bucket,
        i = e.Region,
        a = e.Key,
        o = e.UploadId,
        r = e.SliceList,
        s = this,
        c = this.options.ChunkRetryTimes + 1,
        l = r.map(function (e) {
          return {
            PartNumber: e.PartNumber,
            ETag: e.ETag };

        });
        g.retry(c, function (e) {
          s.multipartComplete({
            Bucket: n,
            Region: i,
            Key: a,
            UploadId: o,
            Parts: l },
          e);
        }, function (e, n) {
          t(e, n);
        });
      }

      function p(e, t) {
        var n = e.Bucket,
        i = e.Region,
        a = e.Key,
        r = e.UploadId,
        s = e.Level || "task",
        c = e.AsyncLimit,
        l = this,
        p = new v();
        if (p.on("error", function (e) {
          return t(e);
        }), p.on("get_abort_array", function (o) {
          u.call(l, {
            Bucket: n,
            Region: i,
            Key: a,
            Headers: e.Headers,
            AsyncLimit: c,
            AbortArray: o },
          function (e, n) {
            if (e) return t(e);
            t(null, n);
          });
        }), "bucket" === s) o.call(l, {
          Bucket: n,
          Region: i },
        function (e, n) {
          if (e) return t(e);
          p.emit("get_abort_array", n.UploadList || []);
        });else if ("file" === s) {
          if (!a) return t({
            error: "abort_upload_task_no_key" });

          o.call(l, {
            Bucket: n,
            Region: i,
            Key: a },
          function (e, n) {
            if (e) return t(e);
            p.emit("get_abort_array", n.UploadList || []);
          });
        } else {
          if ("task" !== s) return t({
            error: "abort_unknown_level" });

          if (!r) return t({
            error: "abort_upload_task_no_id" });

          if (!a) return t({
            error: "abort_upload_task_no_key" });

          p.emit("get_abort_array", [{
            Key: a,
            UploadId: r }]);

        }
      }

      function u(e, t) {
        var n = e.Bucket,
        i = e.Region,
        a = e.Key,
        o = e.AbortArray,
        r = e.AsyncLimit || 1,
        s = this,
        c = 0,
        l = new Array(o.length);
        g.eachLimit(o, r, function (t, o) {
          var r = c;
          if (a && a !== t.Key) return l[r] = {
            error: {
              KeyNotMatch: !0 } },

          void o(null);
          var p = t.UploadId || t.UploadID;
          s.multipartAbort({
            Bucket: n,
            Region: i,
            Key: t.Key,
            Headers: e.Headers,
            UploadId: p },
          function (e) {
            var a = {
              Bucket: n,
              Region: i,
              Key: t.Key,
              UploadId: p };

            l[r] = {
              error: e,
              task: a },
            o(null);
          }), c++;
        }, function (e) {
          if (e) return t(e);

          for (var n = [], i = [], a = 0, o = l.length; a < o; a++) {
            var r = l[a];
            r.task && (r.error ? i.push(r.task) : n.push(r.task));
          }

          return t(null, {
            successList: n,
            errorList: i });

        });
      }

      function d(e, t) {
        var n = this,
        i = void 0 === e.SliceSize ? n.options.SliceSize : e.SliceSize,
        a = 0,
        o = 0,
        r = x.throttleOnProgress.call(n, o, e.onProgress),
        s = e.files.length,
        c = e.onFileFinish,
        l = Array(s),
        p = function p(e, n, i) {
          r(null, !0), c && c(e, n, i), l[i.Index] = {
            options: i,
            error: e,
            data: n },
          --s <= 0 && t && t(null, {
            files: l });

        },
        u = [];

        x.each(e.files, function (e, t) {
          var n = e.FileSize,
          s = {
            Index: t,
            TaskId: "" };

          a += n, x.each(e, function (e, t) {
            "object" != typeof e && "function" != typeof e && (s[t] = e);
          });
          var c = e.onTaskReady;

          e.onTaskReady = function (e) {
            s.TaskId = e, c && c(e);
          };

          var l = 0,
          d = e.onProgress;

          e.onProgress = function (e) {
            o = o - l + e.loaded, l = e.loaded, d && d(e), r({
              loaded: o,
              total: a });

          };

          var m = e.onFileFinish,
          f = function f(e, t) {
            m && m(e, t), p && p(e, t, s);
          },
          h = n > i ? "sliceUploadFile" : "postObject";

          u.push({
            api: h,
            params: e,
            callback: f });

        }), n._addTasks(u);
      }

      function m(e, t) {
        var n = new v(),
        i = this,
        a = e.Bucket,
        o = e.Region,
        r = e.Key,
        s = e.CopySource,
        c = s.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^\/]+\/(.+)$/);
        if (!c) return void t({
          error: "CopySource format error" });

        var l = c[1],
        p = c[3],
        u = decodeURIComponent(c[4]),
        d = void 0 === e.CopySliceSize ? i.options.CopySliceSize : e.CopySliceSize;
        d = Math.max(0, d);
        var m,
        h,
        y = e.CopyChunkSize || this.options.CopyChunkSize,
        C = this.options.CopyChunkParallelLimit,
        k = 0;
        n.on("copy_slice_complete", function (e) {
          i.multipartComplete({
            Bucket: a,
            Region: o,
            Key: r,
            UploadId: e.UploadId,
            Parts: e.PartList },
          function (e, n) {
            if (e) return h(null, !0), t(e);
            h({
              loaded: m,
              total: m },
            !0), t(null, n);
          });
        }), n.on("get_copy_data_finish", function (e) {
          g.eachLimit(e.PartList, C, function (t, n) {
            var c = t.PartNumber,
            l = t.CopySourceRange,
            p = t.end - t.start,
            u = 0;
            f.call(i, {
              Bucket: a,
              Region: o,
              Key: r,
              CopySource: s,
              UploadId: e.UploadId,
              PartNumber: c,
              CopySourceRange: l,
              onProgress: function onProgress(e) {
                k += e.loaded - u, u = e.loaded, h({
                  loaded: k,
                  total: m });

              } },
            function (e, i) {
              if (e) return n(e);
              h({
                loaded: k,
                total: m }),
              k += p - u, t.ETag = i.ETag, n(e || null, i);
            });
          }, function (i) {
            if (i) return h(null, !0), t(i);
            n.emit("copy_slice_complete", e);
          });
        }), n.on("get_file_size_finish", function (s) {
          !function () {
            for (var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], n = 1048576, a = 0; a < t.length && (n = 1024 * t[a] * 1024, !(m / n <= i.options.MaxPartNumber)); a++) {;}

            e.ChunkSize = y = Math.max(y, n);

            for (var o = Math.ceil(m / y), r = [], s = 1; s <= o; s++) {
              var c = (s - 1) * y,
              l = s * y < m ? s * y - 1 : m - 1,
              p = {
                PartNumber: s,
                start: c,
                end: l,
                CopySourceRange: "bytes=" + c + "-" + l };

              r.push(p);
            }

            e.PartList = r;
          }();
          var c;

          if (c = "Replaced" === e.Headers["x-cos-metadata-directive"] ? e.Headers : s, c["x-cos-storage-class"] = e.Headers["x-cos-storage-class"] || s["x-cos-storage-class"], c = x.clearKey(c), "ARCHIVE" === s["x-cos-storage-class"] || "DEEP_ARCHIVE" === s["x-cos-storage-class"]) {
            var l = s["x-cos-restore"];
            if (!l || 'ongoing-request="true"' === l) return void t({
              error: "Unrestored archive object is not allowed to be copied" });

          }

          delete c["x-cos-copy-source"], delete c["x-cos-metadata-directive"], delete c["x-cos-copy-source-If-Modified-Since"], delete c["x-cos-copy-source-If-Unmodified-Since"], delete c["x-cos-copy-source-If-Match"], delete c["x-cos-copy-source-If-None-Match"], i.multipartInit({
            Bucket: a,
            Region: o,
            Key: r,
            Headers: c },
          function (i, a) {
            if (i) return t(i);
            e.UploadId = a.UploadId, n.emit("get_copy_data_finish", e);
          });
        }), i.headObject({
          Bucket: l,
          Region: p,
          Key: u },
        function (a, o) {
          if (a) return void t(a.statusCode && 404 === a.statusCode ? {
            ErrorStatus: u + " Not Exist" } :
          a);
          if (void 0 === (m = e.FileSize = o.headers["content-length"]) || !m) return void t({
            error: 'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.' });

          if (h = x.throttleOnProgress.call(i, m, e.onProgress), m <= d) e.Headers["x-cos-metadata-directive"] || (e.Headers["x-cos-metadata-directive"] = "Copy"), i.putObjectCopy(e, function (e, n) {
            if (e) return h(null, !0), t(e);
            h({
              loaded: m,
              total: m },
            !0), t(e, n);
          });else {
            var r = o.headers,
            s = {
              "Cache-Control": r["cache-control"],
              "Content-Disposition": r["content-disposition"],
              "Content-Encoding": r["content-encoding"],
              "Content-Type": r["content-type"],
              Expires: r.expires,
              "x-cos-storage-class": r["x-cos-storage-class"] };

            x.each(r, function (e, t) {
              0 === t.indexOf("x-cos-meta-") && t.length > "x-cos-meta-".length && (s[t] = e);
            }), n.emit("get_file_size_finish", s);
          }
        });
      }

      function f(e, t) {
        var n = e.TaskId,
        i = e.Bucket,
        a = e.Region,
        o = e.Key,
        r = e.CopySource,
        s = e.UploadId,
        c = 1 * e.PartNumber,
        l = e.CopySourceRange,
        p = this.options.ChunkRetryTimes + 1,
        u = this;
        g.retry(p, function (t) {
          u.uploadPartCopy({
            TaskId: n,
            Bucket: i,
            Region: a,
            Key: o,
            CopySource: r,
            UploadId: s,
            PartNumber: c,
            CopySourceRange: l,
            onProgress: e.onProgress },
          function (e, n) {
            t(e || null, n);
          });
        }, function (e, n) {
          return t(e, n);
        });
      }

      var h = n(5),
      g = n(24),
      v = n(4).EventProxy,
      x = n(0),
      y = {
        sliceUploadFile: i,
        abortUploadTask: p,
        uploadFiles: d,
        sliceCopyFile: m };


      e.exports.init = function (e, t) {
        t.transferToTaskMethod(y, "sliceUploadFile"), x.each(y, function (t, n) {
          e.prototype[n] = x.apiWrapper(n, t);
        });
      };
    }, function (e, t) {
      var n = function n(e, t, _n, i) {
        if (i = i || function () {}, !e.length || t <= 0) return i();
        var a = 0,
        o = 0,
        r = 0;
        !function s() {
          if (a >= e.length) return i();

          for (; r < t && o < e.length;) {o += 1, r += 1, _n(e[o - 1], function (t) {
              t ? (i(t), i = function i() {}) : (a += 1, r -= 1, a >= e.length ? i() : s());
            });}
        }();
      },
      i = function i(e, t, n) {
        var i = function i(a) {
          t(function (t, o) {
            t && a < e ? i(a + 1) : n(t, o);
          });
        };

        e < 1 ? n() : i(1);
      },
      a = {
        eachLimit: n,
        retry: i };


      e.exports = a;
    }]);
  });

  /***/},
/* 2 */
/***/function (module, exports) {

  var vodUtil = {
    getType: function getType(a) {
      if (a === null) {
        return "null";
      }

      if (a === undefined) {
        return "undefined";
      }

      return Object.prototype.toString.call(a).slice(8, -1).toLowerCase();
    },
    isFunction: function isFunction(para) {
      if (para && this.getType(para) !== "function") {
        return false;
      }

      return true;
    },
    getFileMessage: function getFileMessage(file, fileName) {
      var fileMsg = {};
      fileMsg.tempFilePath = file.tempFilePath;
      fileMsg.type = file.tempFilePath.substring(file.tempFilePath.lastIndexOf(".") + 1);

      if (typeof fileName === "string") {
        fileMsg.name = fileName;
      } else {
        fileMsg.name = "来自小程序";
      }

      fileMsg.size = file.size;
      return fileMsg;
    },
    noop: function noop() {} };

  module.exports = vodUtil;

  /***/},
/* 3 */
/***/function (module, exports) {

  var UploaderEvent = {
    video_progress: "video_progress",
    media_progress: "media_progress" };

  exports.UploaderEvent = UploaderEvent;

  /***/},
/* 4 */
/***/function (module, exports, __webpack_require__) {

  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.


  var R = typeof Reflect === 'object' ? Reflect : null;
  var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;

  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }

  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }

  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  };

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  module.exports = EventEmitter; // Backwards-compat with node 0.10.x

  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.

  var defaultMaxListeners = 10;
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function get() {
      return defaultMaxListeners;
    },
    set: function set(arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }

      defaultMaxListeners = arg;
    } });


  EventEmitter.init = function () {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  }; // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.


  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }

    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  EventEmitter.prototype.emit = function emit(type) {
    var args = [];

    for (var i = 1; i < arguments.length; i++) {args.push(arguments[i]);}

    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

    if (doError) {
      var er;
      if (args.length > 0) er = args[0];

      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      } // At least give some kind of context to the user


      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    var handler = events[type];
    if (handler === undefined) return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {ReflectApply(listeners[i], this, args);}
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    events = target._events;

    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object

        events = target._events;
      }

      existing = events[type];
    }

    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      } // Check for listener leak


      m = $getMaxListeners(target);

      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true; // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax

        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

  function onceWrapper() {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {args.push(arguments[i]);}

    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      ReflectApply(this.listener, this.target, args);
    }
  }

  function _onceWrap(target, type, listener) {
    var state = {
      fired: false,
      wrapFn: undefined,
      target: target,
      type: type,
      listener: listener };

    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  }; // Emits a 'removeListener' event if and only if the listener was removed.


  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;

    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;
      if (position === 0) list.shift();else {
        spliceOne(list, position);
      }
      if (list.length === 1) events[type] = list[0];
      if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this; // not listening for removeListener, no need to emit

    if (events.removeListener === undefined) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== undefined) {
        if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
      }

      return this;
    } // emit removeListener for all listeners on all events


    if (arguments.length === 0) {
      var keys = Object.keys(events);
      var key;

      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }

      this.removeAllListeners('removeListener');
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
      // LIFO order
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }

    return this;
  };

  function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }

  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };

  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };

  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;

  function listenerCount(type) {
    var events = this._events;

    if (events !== undefined) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };

  function arrayClone(arr, n) {
    var copy = new Array(n);

    for (var i = 0; i < n; ++i) {copy[i] = arr[i];}

    return copy;
  }

  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++) {list[index] = list[index + 1];}

    list.pop();
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);

    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }

    return ret;
  }

  /***/},
/* 5 */
/***/function (module, exports, __webpack_require__) {

  var _temp;

  function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}

  function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

  function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

  function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}

  function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

  function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

  var Uploader = __webpack_require__(0);

  var pkg = __webpack_require__(6);

  var VodReportEvent = {
    report_prepare: "report_prepare",
    report_apply: "report_apply",
    report_cos_upload: "report_cos_upload",
    report_commit: "report_commit",
    report_done: "report_done" };

  var ReqType = {
    prepare: 10000,
    apply: 10001,
    cos_upload: 20001,
    commit: 10002,
    done: 40001 };

  exports.reportEvent = VodReportEvent;
  exports.VodReporter = (_temp = /*#__PURE__*/function () {
    // only partial data when created
    function _temp(uploader, options) {
      _classCallCheck(this, _temp);

      _defineProperty(this, "uploader", undefined);

      _defineProperty(this, "options", undefined);

      _defineProperty(this, "baseReportData", {
        version: pkg.version,
        platform: 4000,
        device: function () {
          var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
          brand = _wx$getSystemInfoSync.brand,
          model = _wx$getSystemInfoSync.model,
          version = _wx$getSystemInfoSync.version;

          return "".concat(brand, "-").concat(model, "-wx").concat(version);
        }() });


      _defineProperty(this, "reportUrl", "https://vodreport.qcloud.com/ugcupload_new");

      this.uploader = uploader;
      this.options = options;
      this.init();
    }

    _createClass(_temp, [{
      key: "init",
      value: function init() {
        this.uploader.on(VodReportEvent.report_prepare, this.onPrepare.bind(this));
        this.uploader.on(VodReportEvent.report_apply, this.onApply.bind(this));
        this.uploader.on(VodReportEvent.report_cos_upload, this.onCosUpload.bind(this));
        this.uploader.on(VodReportEvent.report_commit, this.onCommit.bind(this));
        this.uploader.on(VodReportEvent.report_done, this.onDone.bind(this));
      } // PrepareUpload
    },
    {
      key: "onPrepare",
      value: function onPrepare(reportObj) {
        var uploader = this.uploader;

        try {
          var customReportData = {
            appId: uploader.appId,
            reqType: ReqType.prepare,
            errCode: 0,
            vodErrCode: 0,
            errMsg: "",
            reqTimeCost: Number(new Date()) - Number(reportObj.requestStartTime),
            reqTime: Number(reportObj.requestStartTime) };


          if (reportObj.err) {
            customReportData.errCode = 1;
            customReportData.vodErrCode = reportObj.err.code;
            customReportData.errMsg = reportObj.err.message;
          }

          if (reportObj.data) {
            customReportData.cosRegion = reportObj.data.region;
          }

          this.report(customReportData);
        } catch (e) {
          console.log("onPrepare", e);
        }
      } // ApplyUploadUGC
    },
    {
      key: "onApply",
      value: function onApply(reportObj) {
        try {
          var uploader = this.uploader;

          if (!uploader.videoFileMessage) {
            return;
          }

          var file = uploader.videoFileMessage;
          Object.assign(this.baseReportData, {
            appId: uploader.appId,
            fileSize: file.size,
            fileName: file.name,
            fileType: file.type,
            vodSessionKey: uploader.vodSessionKey,
            reqKey: uploader.reqKey,
            reportId: uploader.reportId });

          var customReportData = {
            reqType: ReqType.apply,
            errCode: 0,
            vodErrCode: 0,
            errMsg: "",
            reqTimeCost: Number(new Date()) - Number(reportObj.requestStartTime),
            reqTime: Number(reportObj.requestStartTime) };


          if (reportObj.err) {
            customReportData.errCode = 1;
            customReportData.vodErrCode = reportObj.err.code;
            customReportData.errMsg = reportObj.err.message;
          }

          if (reportObj.data) {
            this.baseReportData.cosRegion = reportObj.data.storageRegion;
          }

          this.report(customReportData);
        } catch (e) {
          console.error("onApply", e);
        }
      } // upload to cos
    },
    {
      key: "onCosUpload",
      value: function onCosUpload(reportObj) {
        try {
          var customReportData = {
            reqType: ReqType.cos_upload,
            errCode: 0,
            cosErrCode: "",
            errMsg: "",
            reqTimeCost: Number(new Date()) - Number(reportObj.requestStartTime),
            reqTime: Number(reportObj.requestStartTime) };


          if (reportObj.err) {
            customReportData.errCode = 1;
            customReportData.cosErrCode = reportObj.err.error ? reportObj.err.error.Code : reportObj.err;

            if (reportObj.err && reportObj.err.error === "error") {
              customReportData.cosErrCode = "cors error";
            }

            customReportData.errMsg = JSON.stringify(reportObj.err);
          }

          this.report(customReportData);
        } catch (e) {
          console.error("onCosUpload", e);
        }
      } // CommitUploadUGC
    },
    {
      key: "onCommit",
      value: function onCommit(reportObj) {
        try {
          var customReportData = {
            reqType: ReqType.commit,
            errCode: 0,
            vodErrCode: 0,
            errMsg: "",
            reqTimeCost: Number(new Date()) - Number(reportObj.requestStartTime),
            reqTime: Number(reportObj.requestStartTime) };


          if (reportObj.err) {
            customReportData.errCode = 1;
            customReportData.vodErrCode = reportObj.err.code;
            customReportData.errMsg = reportObj.err.message;
          }

          if (reportObj.data) {
            this.baseReportData.fileId = reportObj.data.fileId;
          }

          this.report(customReportData);
        } catch (e) {
          console.error("onCommit", e);
        }
      } },
    {
      key: "onDone",
      value: function onDone(reportObj) {
        try {
          var customReportData = {
            reqType: ReqType.done,
            errCode: reportObj.err && reportObj.err.code,
            reqTimeCost: Number(new Date()) - Number(reportObj.requestStartTime),
            reqTime: Number(reportObj.requestStartTime) };

          this.report(customReportData);
        } catch (e) {
          console.error("onDone", e);
        }
      } },
    {
      key: "report",
      value: function report(reportData) {
        reportData = _objectSpread(_objectSpread({}, this.baseReportData), reportData);
        this.send(reportData);
      } },
    {
      key: "send",
      value: function send(reportData) {
        if (false) {}

        console.log("上报: ", reportData);
        wx.request({
          method: "POST",
          url: this.reportUrl,
          data: reportData,
          dataType: "json",
          fail: function fail(err) {
            console.log(err);
          } });

      } }]);


    return _temp;
  }(), _temp);

  /***/},
/* 6 */
/***/function (module) {

  module.exports = JSON.parse("{\"name\":\"vod-wx-sdk-v2\",\"version\":\"1.0.3\",\"description\":\"Tencent cloud vod sdk for wechat mini program\",\"main\":\"dist/vod-wx-sdk-v2.js\",\"miniprogram\":\"dist\",\"scripts\":{\"build\":\"webpack --config webpack.config.js\",\"dev\":\"webpack --config webpack.dev.js --watch\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/tencentyun/vod-wx-sdk-v2.git\"},\"keywords\":[\"vod\",\"tencentcloud\",\"qcloud\",\"wechat\"],\"author\":\"alsotang <alsotang@gmail.com>\",\"contributors\":[\"_windmill <l20122005@live.com>\"],\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/tencentyun/vod-wx-sdk-v2/issues\"},\"homepage\":\"https://github.com/tencentyun/vod-wx-sdk-v2#readme\",\"devDependencies\":{\"@babel/core\":\"^7.12.10\",\"@babel/plugin-proposal-class-properties\":\"^7.12.1\",\"@babel/preset-env\":\"^7.12.11\",\"babel-loader\":\"^8.2.2\",\"eslint\":\"^5.16.0\",\"eslint-config-airbnb-base\":\"^13.2.0\",\"eslint-config-prettier\":\"^5.1.0\",\"eslint-plugin-import\":\"^2.22.1\",\"eslint-plugin-prettier\":\"^3.3.1\",\"webpack\":\"^4.46.0\",\"webpack-cli\":\"^3.3.12\"},\"dependencies\":{\"cos-wx-sdk-v5\":\"^1.0.5\"}}");

  /***/}
/******/]));

/***/ }),

/***/ 12:
/*!*************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/promise.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ./utils */ 13);


var _internal = __webpack_require__(/*! ./-internal */ 14);





var _asap = __webpack_require__(/*! ./asap */ 15);





var _all = _interopRequireDefault(__webpack_require__(/*! ./promise/all */ 20));
var _race = _interopRequireDefault(__webpack_require__(/*! ./promise/race */ 22));
var _resolve = _interopRequireDefault(__webpack_require__(/*! ./promise/resolve */ 19));
var _reject = _interopRequireDefault(__webpack_require__(/*! ./promise/reject */ 23));
var _then = _interopRequireDefault(__webpack_require__(/*! ./then */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise's eventual value or the reason
    why the promise cannot be fulfilled.
  
    Terminology
    -----------
  
    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.
  
    A promise can be in one of three states: pending, fulfilled, or rejected.
  
    Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.
  
    Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.
  
  
    Basic Usage:
    ------------
  
    ```js
    let promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);
  
      // on failure
      reject(reason);
    });
  
    promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Advanced Usage:
    ---------------
  
    Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.
  
    ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
  
        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
  
        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }
  
    getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Unlike callbacks, promises are great composable primitives.
  
    ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON
  
      return values;
    });
    ```
  
    @class Promise
    @param {Function} resolver
    Useful for tooling.
    @constructor
  */var

Promise = /*#__PURE__*/function () {
  function Promise(resolver) {_classCallCheck(this, Promise);
    this[_internal.PROMISE_ID] = (0, _internal.nextId)();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (_internal.noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? (0, _internal.initializePromise)(this, resolver) : needsNew();
    }
  }

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
     ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
     Chaining
    --------
     The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
     ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
     findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
     ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
     Assimilation
    ------------
     Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
     ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
     If the assimliated promise rejects, then the downstream promise will also reject.
     ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
     Simple Example
    --------------
     Synchronous Example
     ```javascript
    let result;
     try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
     Errback Example
     ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
     Promise Example;
     ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
     Advanced Example
    --------------
     Synchronous Example
     ```javascript
    let author, books;
     try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
     Errback Example
     ```js
     function foundBooks(books) {
     }
     function failure(reason) {
     }
     findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
     Promise Example;
     ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
     @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
    */


































  /**
       `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
       as the catch block of a try/catch statement.
       ```js
       function findAuthor(){
       throw new Error('couldn't find that author');
       }
       // synchronous
       try {
       findAuthor();
       } catch(reason) {
       // something went wrong
       }
       // async with promises
       findAuthor().catch(function(reason){
       // something went wrong
       });
       ```
       @method catch
       @param {Function} onRejection
       Useful for tooling.
       @return {Promise}
       */_createClass(Promise, [{ key: "catch", value: function _catch(




    onRejection) {
      return this.then(null, onRejection);
    }

    /**
        `finally` will be invoked regardless of the promise's fate just as native
        try/catch/finally behaves
      
        Synchronous example:
      
        ```js
        findAuthor() {
          if (Math.random() > 0.5) {
            throw new Error();
          }
          return new Author();
        }
      
        try {
          return findAuthor(); // succeed or fail
        } catch(error) {
          return findOtherAuther();
        } finally {
          // always runs
          // doesn't affect the return value
        }
        ```
      
        Asynchronous example:
      
        ```js
        findAuthor().catch(function(reason){
          return findOtherAuther();
        }).finally(function(){
          // author was either found, or not
        });
        ```
      
        @method finally
        @param {Function} callback
        @return {Promise}
      */ }, { key: "finally", value: function _finally(
    callback) {
      var promise = this;
      var constructor = promise.constructor;

      if ((0, _utils.isFunction)(callback)) {
        return promise.then(function (value) {return constructor.resolve(callback()).then(function () {return value;});},
        function (reason) {return constructor.resolve(callback()).then(function () {throw reason;});});
      }

      return promise.then(callback, callback);
    } }]);return Promise;}();


Promise.prototype.then = _then.default;var _default =
Promise;exports.default = _default;
Promise.all = _all.default;
Promise.race = _race.default;
Promise.resolve = _resolve.default;
Promise.reject = _reject.default;
Promise._setScheduler = _asap.setScheduler;
Promise._setAsap = _asap.setAsap;
Promise._asap = _asap.asap;

/***/ }),

/***/ 13:
/*!***********************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/utils.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.objectOrFunction = objectOrFunction;exports.isFunction = isFunction;exports.isMaybeThenable = isMaybeThenable;exports.isArray = void 0;function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

function isMaybeThenable(x) {
  return x !== null && typeof x === 'object';
}

var _isArray;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function _isArray(x) {return Object.prototype.toString.call(x) === '[object Array]';};
}

var isArray = _isArray;exports.isArray = isArray;

/***/ }),

/***/ 14:
/*!***************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/-internal.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.nextId = nextId;exports.makePromise = makePromise;exports.noop = noop;exports.resolve = resolve;exports.reject = reject;exports.fulfill = fulfill;exports.subscribe = subscribe;exports.publish = publish;exports.publishRejection = publishRejection;exports.initializePromise = initializePromise;exports.invokeCallback = invokeCallback;exports.handleMaybeThenable = handleMaybeThenable;exports.PENDING = exports.REJECTED = exports.FULFILLED = exports.PROMISE_ID = void 0;var _utils = __webpack_require__(/*! ./utils */ 13);




var _asap = __webpack_require__(/*! ./asap */ 15);



var _then = _interopRequireDefault(__webpack_require__(/*! ./then */ 18));
var _resolve = _interopRequireDefault(__webpack_require__(/*! ./promise/resolve */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var PROMISE_ID = Math.random().toString(36).substring(2);exports.PROMISE_ID = PROMISE_ID;

function noop() {}

var PENDING = void 0;exports.PENDING = PENDING;
var FULFILLED = 1;exports.FULFILLED = FULFILLED;
var REJECTED = 2;exports.REJECTED = REJECTED;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  (0, _asap.asap)(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {return;}
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {return;}
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {return resolve(promise, value);},
    function (reason) {return reject(promise, reason);});
  }
}

function handleMaybeThenable(promise, maybeThenable, then) {
  if (maybeThenable.constructor === promise.constructor &&
  then === _then.default &&
  maybeThenable.constructor.resolve === _resolve.default) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then === undefined) {
      fulfill(promise, maybeThenable);
    } else if ((0, _utils.isFunction)(then)) {
      handleForeignThenable(promise, maybeThenable, then);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if ((0, _utils.objectOrFunction)(value)) {
    var then;
    try {
      then = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {return;}

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    (0, _asap.asap)(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {return;}
  promise._state = REJECTED;
  promise._result = reason;

  (0, _asap.asap)(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {var
  _subscribers = parent._subscribers;var
  length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    (0, _asap.asap)(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {return;}

  var child,callback,detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = (0, _utils.isFunction)(callback),
  value,error,succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

/***/ }),

/***/ 15:
/*!**********************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/asap.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.setScheduler = setScheduler;exports.setAsap = setAsap;exports.asap = void 0;var len = 0;
var vertxNext;
var customSchedulerFn;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};exports.asap = asap;

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  exports.asap = asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' &&
typeof importScripts !== 'undefined' &&
typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {return process.nextTick(flush);};
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {return channel.port2.postMessage(0);};
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {return globalSetTimeout(flush, 1);};
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 16)))

/***/ }),

/***/ 16:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 17);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 17:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 16)))

/***/ }),

/***/ 18:
/*!**********************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/then.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = then;var _internal = __webpack_require__(/*! ./-internal */ 14);









var _asap = __webpack_require__(/*! ./asap */ 15);

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(_internal.noop);

  if (child[_internal.PROMISE_ID] === undefined) {
    (0, _internal.makePromise)(child);
  }var

  _state = parent._state;

  if (_state) {
    var callback = arguments[_state - 1];
    (0, _asap.asap)(function () {return (0, _internal.invokeCallback)(_state, child, callback, parent._result);});
  } else {
    (0, _internal.subscribe)(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/***/ }),

/***/ 19:
/*!*********************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/promise/resolve.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = resolve;var _internal = __webpack_require__(/*! ../-internal */ 14);




/**
                                                                                                                                                `Promise.resolve` returns a promise that will become resolved with the
                                                                                                                                                passed `value`. It is shorthand for the following:
                                                                                                                                              
                                                                                                                                                ```javascript
                                                                                                                                                let promise = new Promise(function(resolve, reject){
                                                                                                                                                  resolve(1);
                                                                                                                                                });
                                                                                                                                              
                                                                                                                                                promise.then(function(value){
                                                                                                                                                  // value === 1
                                                                                                                                                });
                                                                                                                                                ```
                                                                                                                                              
                                                                                                                                                Instead of writing the above, your code now simply becomes the following:
                                                                                                                                              
                                                                                                                                                ```javascript
                                                                                                                                                let promise = Promise.resolve(1);
                                                                                                                                              
                                                                                                                                                promise.then(function(value){
                                                                                                                                                  // value === 1
                                                                                                                                                });
                                                                                                                                                ```
                                                                                                                                              
                                                                                                                                                @method resolve
                                                                                                                                                @static
                                                                                                                                                @param {Any} value value that the returned promise will be resolved with
                                                                                                                                                Useful for tooling.
                                                                                                                                                @return {Promise} a promise that will become fulfilled with the given
                                                                                                                                                `value`
                                                                                                                                              */
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(_internal.noop);
  (0, _internal.resolve)(promise, object);
  return promise;
}

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!*****************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/promise/all.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = all;var _enumerator = _interopRequireDefault(__webpack_require__(/*! ../enumerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                    `Promise.all` accepts an array of promises, and returns a new promise which
                                                                                                                                                                                                                                                                    is fulfilled with an array of fulfillment values for the passed promises, or
                                                                                                                                                                                                                                                                    rejected with the reason of the first passed promise to be rejected. It casts all
                                                                                                                                                                                                                                                                    elements of the passed iterable to promises as it runs this algorithm.
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    Example:
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    ```javascript
                                                                                                                                                                                                                                                                    let promise1 = resolve(1);
                                                                                                                                                                                                                                                                    let promise2 = resolve(2);
                                                                                                                                                                                                                                                                    let promise3 = resolve(3);
                                                                                                                                                                                                                                                                    let promises = [ promise1, promise2, promise3 ];
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    Promise.all(promises).then(function(array){
                                                                                                                                                                                                                                                                      // The array here would be [ 1, 2, 3 ];
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                    ```
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    If any of the `promises` given to `all` are rejected, the first promise
                                                                                                                                                                                                                                                                    that is rejected will be given as an argument to the returned promises's
                                                                                                                                                                                                                                                                    rejection handler. For example:
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    Example:
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    ```javascript
                                                                                                                                                                                                                                                                    let promise1 = resolve(1);
                                                                                                                                                                                                                                                                    let promise2 = reject(new Error("2"));
                                                                                                                                                                                                                                                                    let promise3 = reject(new Error("3"));
                                                                                                                                                                                                                                                                    let promises = [ promise1, promise2, promise3 ];
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    Promise.all(promises).then(function(array){
                                                                                                                                                                                                                                                                      // Code here never runs because there are rejected promises!
                                                                                                                                                                                                                                                                    }, function(error) {
                                                                                                                                                                                                                                                                      // error.message === "2"
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                    ```
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    @method all
                                                                                                                                                                                                                                                                    @static
                                                                                                                                                                                                                                                                    @param {Array} entries array of promises
                                                                                                                                                                                                                                                                    @param {String} label optional string for labeling the promise.
                                                                                                                                                                                                                                                                    Useful for tooling.
                                                                                                                                                                                                                                                                    @return {Promise} promise that is fulfilled when all `promises` have been
                                                                                                                                                                                                                                                                    fulfilled, or rejected if any of them become rejected.
                                                                                                                                                                                                                                                                    @static
                                                                                                                                                                                                                                                                  */
function all(entries) {
  return new _enumerator.default(this, entries).promise;
}

/***/ }),

/***/ 21:
/*!****************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/enumerator.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ./utils */ 13);



var _internal = __webpack_require__(/*! ./-internal */ 14);










var _then2 = _interopRequireDefault(__webpack_require__(/*! ./then */ 18));
var _promise = _interopRequireDefault(__webpack_require__(/*! ./promise */ 12));
var _resolve = _interopRequireDefault(__webpack_require__(/*! ./promise/resolve */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}



function validationError() {
  return new Error('Array Methods must be provided an Array');
};var

Enumerator = /*#__PURE__*/function () {
  function Enumerator(Constructor, input) {_classCallCheck(this, Enumerator);
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(_internal.noop);

    if (!this.promise[_internal.PROMISE_ID]) {
      (0, _internal.makePromise)(this.promise);
    }

    if ((0, _utils.isArray)(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        (0, _internal.fulfill)(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          (0, _internal.fulfill)(this.promise, this._result);
        }
      }
    } else {
      (0, _internal.reject)(this.promise, validationError());
    }
  }_createClass(Enumerator, [{ key: "_enumerate", value: function _enumerate(
    input) {
      for (var i = 0; this._state === _internal.PENDING && i < input.length; i++) {
        this._eachEntry(input[i], i);
      }
    } }, { key: "_eachEntry", value: function _eachEntry(

    entry, i) {
      var c = this._instanceConstructor;var
      resolve = c.resolve;

      if (resolve === _resolve.default) {
        var _then;
        var error;
        var didError = false;
        try {
          _then = entry.then;
        } catch (e) {
          didError = true;
          error = e;
        }

        if (_then === _then2.default &&
        entry._state !== _internal.PENDING) {
          this._settledAt(entry._state, i, entry._result);
        } else if (typeof _then !== 'function') {
          this._remaining--;
          this._result[i] = entry;
        } else if (c === _promise.default) {
          var promise = new c(_internal.noop);
          if (didError) {
            (0, _internal.reject)(promise, error);
          } else {
            (0, _internal.handleMaybeThenable)(promise, entry, _then);
          }
          this._willSettleAt(promise, i);
        } else {
          this._willSettleAt(new c(function (resolve) {return resolve(entry);}), i);
        }
      } else {
        this._willSettleAt(resolve(entry), i);
      }
    } }, { key: "_settledAt", value: function _settledAt(

    state, i, value) {var
      promise = this.promise;

      if (promise._state === _internal.PENDING) {
        this._remaining--;

        if (state === _internal.REJECTED) {
          (0, _internal.reject)(promise, value);
        } else {
          this._result[i] = value;
        }
      }

      if (this._remaining === 0) {
        (0, _internal.fulfill)(promise, this._result);
      }
    } }, { key: "_willSettleAt", value: function _willSettleAt(

    promise, i) {
      var enumerator = this;

      (0, _internal.subscribe)(
      promise, undefined,
      function (value) {return enumerator._settledAt(_internal.FULFILLED, i, value);},
      function (reason) {return enumerator._settledAt(_internal.REJECTED, i, reason);});

    } }]);return Enumerator;}();exports.default = Enumerator;
;

/***/ }),

/***/ 22:
/*!******************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/promise/race.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = race;var _utils = __webpack_require__(/*! ../utils */ 13);



/**
                                                                                                                                      `Promise.race` returns a new promise which is settled in the same way as the
                                                                                                                                      first passed promise to settle.
                                                                                                                                    
                                                                                                                                      Example:
                                                                                                                                    
                                                                                                                                      ```javascript
                                                                                                                                      let promise1 = new Promise(function(resolve, reject){
                                                                                                                                        setTimeout(function(){
                                                                                                                                          resolve('promise 1');
                                                                                                                                        }, 200);
                                                                                                                                      });
                                                                                                                                    
                                                                                                                                      let promise2 = new Promise(function(resolve, reject){
                                                                                                                                        setTimeout(function(){
                                                                                                                                          resolve('promise 2');
                                                                                                                                        }, 100);
                                                                                                                                      });
                                                                                                                                    
                                                                                                                                      Promise.race([promise1, promise2]).then(function(result){
                                                                                                                                        // result === 'promise 2' because it was resolved before promise1
                                                                                                                                        // was resolved.
                                                                                                                                      });
                                                                                                                                      ```
                                                                                                                                    
                                                                                                                                      `Promise.race` is deterministic in that only the state of the first
                                                                                                                                      settled promise matters. For example, even if other promises given to the
                                                                                                                                      `promises` array argument are resolved, but the first settled promise has
                                                                                                                                      become rejected before the other promises became fulfilled, the returned
                                                                                                                                      promise will become rejected:
                                                                                                                                    
                                                                                                                                      ```javascript
                                                                                                                                      let promise1 = new Promise(function(resolve, reject){
                                                                                                                                        setTimeout(function(){
                                                                                                                                          resolve('promise 1');
                                                                                                                                        }, 200);
                                                                                                                                      });
                                                                                                                                    
                                                                                                                                      let promise2 = new Promise(function(resolve, reject){
                                                                                                                                        setTimeout(function(){
                                                                                                                                          reject(new Error('promise 2'));
                                                                                                                                        }, 100);
                                                                                                                                      });
                                                                                                                                    
                                                                                                                                      Promise.race([promise1, promise2]).then(function(result){
                                                                                                                                        // Code here never runs
                                                                                                                                      }, function(reason){
                                                                                                                                        // reason.message === 'promise 2' because promise 2 became rejected before
                                                                                                                                        // promise 1 became fulfilled
                                                                                                                                      });
                                                                                                                                      ```
                                                                                                                                    
                                                                                                                                      An example real-world use case is implementing timeouts:
                                                                                                                                    
                                                                                                                                      ```javascript
                                                                                                                                      Promise.race([ajax('foo.json'), timeout(5000)])
                                                                                                                                      ```
                                                                                                                                    
                                                                                                                                      @method race
                                                                                                                                      @static
                                                                                                                                      @param {Array} promises array of promises to observe
                                                                                                                                      Useful for tooling.
                                                                                                                                      @return {Promise} a promise which settles in the same way as the first passed
                                                                                                                                      promise to settle.
                                                                                                                                    */
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!(0, _utils.isArray)(entries)) {
    return new Constructor(function (_, reject) {return reject(new TypeError('You must pass an array to race.'));});
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/***/ }),

/***/ 23:
/*!********************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/promise/reject.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = reject;var _internal = __webpack_require__(/*! ../-internal */ 14);




/**
                                                                                                                                               `Promise.reject` returns a promise rejected with the passed `reason`.
                                                                                                                                               It is shorthand for the following:
                                                                                                                                             
                                                                                                                                               ```javascript
                                                                                                                                               let promise = new Promise(function(resolve, reject){
                                                                                                                                                 reject(new Error('WHOOPS'));
                                                                                                                                               });
                                                                                                                                             
                                                                                                                                               promise.then(function(value){
                                                                                                                                                 // Code here doesn't run because the promise is rejected!
                                                                                                                                               }, function(reason){
                                                                                                                                                 // reason.message === 'WHOOPS'
                                                                                                                                               });
                                                                                                                                               ```
                                                                                                                                             
                                                                                                                                               Instead of writing the above, your code now simply becomes the following:
                                                                                                                                             
                                                                                                                                               ```javascript
                                                                                                                                               let promise = Promise.reject(new Error('WHOOPS'));
                                                                                                                                             
                                                                                                                                               promise.then(function(value){
                                                                                                                                                 // Code here doesn't run because the promise is rejected!
                                                                                                                                               }, function(reason){
                                                                                                                                                 // reason.message === 'WHOOPS'
                                                                                                                                               });
                                                                                                                                               ```
                                                                                                                                             
                                                                                                                                               @method reject
                                                                                                                                               @static
                                                                                                                                               @param {Any} reason value that the returned promise will be rejected with.
                                                                                                                                               Useful for tooling.
                                                                                                                                               @return {Promise} a promise rejected with the given `reason`.
                                                                                                                                             */
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(_internal.noop);
  (0, _internal.reject)(promise, reason);
  return promise;
}

/***/ }),

/***/ 230:
/*!*************************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/subPackages/components/hch-poster/utils/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.drawSquarePic = drawSquarePic;exports.getSystem = getSystem;exports.drawTextReturnH = drawTextReturnH; /*
                                                                                                                                                                                           * @Description: 公共方法
                                                                                                                                                                                           * @Version: 1.0.0
                                                                                                                                                                                           * @Autor: hch
                                                                                                                                                                                           * @Date: 2021-07-22 00:01:09
                                                                                                                                                                                           */
/**
                                                                                                                                                                                               * @description: 绘制正方形（可以定义圆角），并且有图片地址的话填充图片
                                                                                                                                                                                               * @param {CanvasContext} ctx canvas上下文
                                                                                                                                                                                               * @param {number} x 圆角矩形选区的左上角 x坐标
                                                                                                                                                                                               * @param {number} y 圆角矩形选区的左上角 y坐标
                                                                                                                                                                                               * @param {number} w 圆角矩形选区的宽度
                                                                                                                                                                                               * @param {number} h 圆角矩形选区的高度
                                                                                                                                                                                               * @param {number} r 圆角的半径
                                                                                                                                                                                               * @param {String} url 图片的url地址
                                                                                                                                                                                               */
function drawSquarePic(ctx, x, y, w, h, r, url) {
  ctx.save();
  ctx.beginPath();
  // 绘制左上角圆弧
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
  // 绘制border-top
  // 画一条线 x终点、y终点
  ctx.lineTo(x + w - r, y);
  // 绘制右上角圆弧
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
  // 绘制border-right
  ctx.lineTo(x + w, y + h - r);
  // 绘制右下角圆弧
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
  // 绘制左下角圆弧
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
  // 绘制border-left
  ctx.lineTo(x, y + r);
  // 填充颜色(需要可以自行修改)
  ctx.setFillStyle('#ffffff');
  ctx.fill();
  // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore 这个很重要 不然没办法保存
  ctx.clip();

  // 绘制图片
  return new Promise(function (resolve, reject) {
    if (url) {
      wx.getImageInfo({
        src: url,
        success: function success(res) {
          ctx.drawImage(res.path, x, y, w, h);
          ctx.restore(); //恢复之前被切割的canvas，否则切割之外的就没办法用
          ctx.draw(true);
          resolve();
        },
        fail: function fail(res) {
          console.log('fail -> res', res);
          uni.showToast({
            title: '图片下载异常',
            duration: 2000,
            icon: 'none' });

        } });

    } else {
      ctx.draw(true);
      resolve();
    }
  });
}

/**
   * @description: 获取设备信息
   * @param {type}
   * @return {type}
   * @author: hch
   */
function getSystem() {
  var system = wx.getSystemInfoSync();
  var scale = system.windowWidth / 375; //按照苹果留 375*667比例 其他型号手机等比例缩放 显示
  return { w: system.windowWidth, h: system.windowHeight, scale: scale };
}

/**
   * @description: 绘制文本时文本的总体高度
   * @param {Object} ctx canvas上下文
   * @param {String} text 需要输入的文本
   * @param {Number} x X轴起始位置
   * @param {Number} y Y轴起始位置
   * @param {Number} maxWidth 单行最大宽度
   * @param {Number} fontSize 字体大小
   * @param {String} color 字体颜色
   * @param {Number} lineHeight 行高
   * @param {String} textAlign 字体对齐方式
   */
function drawTextReturnH(
ctx,
text,
x,
y)





{var maxWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 375;var fontSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 14;var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '#000';var lineHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 30;var textAlign = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'left';
  if (textAlign) {
    ctx.setTextAlign(textAlign); //设置文本的水平对齐方式  ctx.setTextAlign这个可以兼容百度小程序 ，注意：ctx.textAlign百度小程序有问题
    switch (textAlign) {
      case 'center':
        x = getSystem().w / 2;
        break;

      case 'right':
        x = (getSystem().w - maxWidth) / 2 + maxWidth;
        break;

      default:
        // 左对齐
        x = (getSystem().w - maxWidth) / 2;
        break;}

  }
  var arrText = text.split('');
  var line = '';
  for (var n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n];
    ctx.font = fontSize + 'px sans-serif'; //设置字体大小，注意：百度小程序 用ctx.setFontSize设置字体大小后，计算字体宽度会无效
    ctx.setFillStyle(color); //设置字体颜色
    var metrics = ctx.measureText(testLine); //measureText() 方法返回包含一个对象，该对象包含以像素计的指定字体宽度。
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = arrText[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  ctx.draw(true); //本次绘制是否接着上一次绘制。即 reserve 参数为 false，则在本次调用绘制之前 native 层会先清空画布再继续绘制；若 reserve 参数为 true，则保留当前画布上的内容，本次调用 drawCanvas 绘制的内容覆盖在上面，默认 false。
  return y;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 238:
/*!*********************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/components/uni-forms/validate.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      // TODO
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum || rule.minimum) {
        result = 'rangeNumber';
      } else if (rule.maxLength || rule.minLength) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var
    range = rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var

    minimum = rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ? 'exclusiveMinimum' : 'minimum']);
    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ? 'exclusiveMaximum' : 'maximum']);
    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {return keys2.indexOf(key) < 0;});
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 24:
/*!**************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/promise/es6-promise/polyfill.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = polyfill;
var _promise = _interopRequireDefault(__webpack_require__(/*! ./promise */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*global self*/

function polyfill() {
  var local;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = _promise.default;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 25:
/*!*****************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/service.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {






var _util = __webpack_require__(/*! ./util.js */ 26);



var _es6Promise = _interopRequireDefault(__webpack_require__(/*! ./promise/es6-promise */ 11));

var _index = _interopRequireDefault(__webpack_require__(/*! ../store/index */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var baseUrl = "https://tailup.love"; // 生产环境--public
var videoDataAppId = "1305387564";var postBackUrl = "http://1305387564.vod2.myqcloud.com/6b095ff3vodsh1305387564/cee1cd50387702304954623462/PynoKA7N67wA.png"; // const baseUrl = "http://test.tailup.love" // 测试环境--public
// const videoDataAppId = "1500007875"
// const postBackUrl = "http://1500007875.vod2.myqcloud.com/6c9b6a63vodcq1500007875/551e12b4387702304925577532/VgYY045euu4A.png"
// console.log(store)
var headers = { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' };


function dealResponse(res) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var resolve = arguments.length > 2 ? arguments[2] : undefined;var reject = arguments.length > 3 ? arguments[3] : undefined;var url = arguments.length > 4 ? arguments[4] : undefined;
  if (res.statusCode === 200) {
    // console.log('axios--res', res)
    if (res.header && res.header['Access-Token']) {
      _index.default.commit('user/login', res.header['Access-Token']);
    }
    if (res.data.code !== 200) {
      uni.showToast({
        title: res.data.msg || "请求失败，请核对后重试！",
        icon: 'none',
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false //是否显示透明蒙层，防止触摸穿透，默认：false
      });
      reject(res);
    } else {
      // uni.hideToast({
      //   success: () => { },
      //   fail: () => { }
      // });
      resolve(res.data);
    }
  } else if (res.statusCode === 404) {
    uni.showToast({
      title: "网络故障，请稍后再试！",
      icon: 'none',
      duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
      mask: true //是否显示透明蒙层，防止触摸穿透，默认：false
    });
    throwError('网络错误404:' + url);
    reject(res);
  }
}

function throwError(str) {
  setTimeout(function () {
    throw new Error(str);
  });
}

module.exports = {
  baseUrl: baseUrl,
  videoDataAppId: videoDataAppId,
  get: function get(url, payload) {var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var token = _index.default.state.user.token;
    if (token && token.length > 0) {
      headers['Access-Token'] = "".concat(token);
    }
    // headers['Content-Type'] = 'x-www-form-urlencoded';
    headers['Content-Type'] = 'application/json';


    var params = (0, _util.getParam)(payload);
    return new _es6Promise.default(function (resolve, reject) {
      uni.request({
        url: baseUrl + url + (params ? "?".concat(params) : ""),
        method: "GET",
        header: headers,
        timeout: 60000,
        success: function success(res) {
          dealResponse(res, config, resolve, reject, url);
        },
        fail: function fail(err) {
          uni.showToast({
            title: "网络故障，请稍后再试！",
            icon: 'none',
            duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
            mask: false //是否显示透明蒙层，防止触摸穿透，默认：false
          });
          console.log(err);
          reject(err);
          // dealResponse(res, config, resolve, reject)
        } });

    });
  },
  post: function post(url, payload) {var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var token = _index.default.state.user.token;
    if (token && token.length > 0) {
      headers['Access-Token'] = "".concat(token);
    }
    if (config['Content-Type']) {
      headers['Content-Type'] = config['Content-Type'];
    } else {
      headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    return new _es6Promise.default(function (resolve, reject) {
      uni.request({
        url: baseUrl + url,
        method: "POST",
        data: payload,
        timeout: 60000,
        header: headers,
        success: function success(res) {
          dealResponse(res, config, resolve, reject, url);
        },
        fail: function fail(err) {
          uni.showToast({
            title: "网络故障，请稍后再试！",
            icon: 'none',
            duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
            mask: false //是否显示透明蒙层，防止触摸穿透，默认：false
          });
          console.log(err);
          reject(err);
          // dealResponse(res, config, resolve, reject)
        } });

    });
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 251:
/*!******************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/components/uni-icons/icons.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 26:
/*!**************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/util.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * 将日期转为字符串
 * @param {Date} date date类型的时间
 * @param {String} devide 分隔符
 * @return {String} 默认 YYYY/MM/DD hh:mm:ss 
 */
var formatTime = function formatTime() {var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();var devide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join(devide) + ' ' + [hour, minute, second].map(formatNumber).join(
  ':');
};
// 获得格式化的日期
var getDate = function getDate(type) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (type === "startDate") {
    year = year - 20;
  } else if (type === "endDate") {
    year = year + 2;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return "".concat(year, "-").concat(month, "-").concat(day);
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

/**
    * 把json对象拆成url参数格式的方法
    * @data 需要处理的json对象
    */
var getParam = function getParam(data) {
  var url = '';
  for (var k in data) {
    var value = data[k] !== undefined ? data[k] : '';
    url += "&".concat(k, "=").concat(encodeURIComponent(value));
  }
  return url ? url.substring(1) : '';
};

// 判断数据类型
function type(x) {
  return Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
}

// Object.create(null) 的对象，没有hasOwnProperty方法
function hasOwnProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// 仅对对象和数组进行深拷贝，其他类型，直接返回
function isClone(x) {
  var t = type(x);
  return t === 'object' || t === 'array';
}

// 递归
function cloneDeep(x) {
  if (!isClone(x)) return x;

  var t = type(x);

  var res;

  if (t === 'array') {
    res = [];
    for (var i = 0; i < x.length; i++) {
      // 避免一层死循环 a.b = a
      res[i] = x[i] === x ? res : cloneDeep(x[i]);
    }
  } else if (t === 'object') {
    res = {};
    for (var key in x) {
      if (hasOwnProp(x, key)) {
        // 避免一层死循环 a.b = a
        res[key] = x[key] === x ? res : cloneDeep(x[key]);
      }
    }
  }

  return res;
}

function chooseImageFormat(string) {
  var resType = string.slice(-3).toLowerCase();
  var resType2 = string.slice(-4).toLowerCase();
  var imageTypeList = ['bmp', 'png', 'jpg', 'jpeg'];
  if (!(imageTypeList.includes(resType) || imageTypeList.includes(resType2))) {
    uni.showToast({
      title: "图片必须是bmp, png,jpg或jpeg类型",
      icon: "none",
      duration: 2000,
      mask: true });

    return false;
  } else
  {
    return true;
  }
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isArray(arr) {
  return Array.isArray(arr);
}
// 合并
function merge(target) {for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {arg[_key - 1] = arguments[_key];}
  return arg.reduce(function (acc, cur) {
    return Object.keys(cur).reduce(function (subAcc, key) {
      var srcVal = cur[key];
      if (isObject(srcVal)) {
        subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal);
      } else if (isArray(srcVal)) {
        // series: []，下层数组直接赋值
        subAcc[key] = srcVal.map(function (item, idx) {
          if (isObject(item)) {
            var curAccVal = subAcc[key] ? subAcc[key] : [];
            return merge(curAccVal[idx] ? curAccVal[idx] : {}, item);
          } else {
            return item;
          }
        });
      } else {
        subAcc[key] = srcVal;
      }
      return subAcc;
    }, acc);
  }, target);
}

// const cloneDeep = function (params) {
//   return JSON.parse(JSON.stringify(params))
// }

function isEmpty(val) {
  if ([null, undefined, ''].includes(val)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  formatTime: formatTime,
  getParam: getParam,
  cloneDeep: cloneDeep,
  merge: merge,
  isEmpty: isEmpty,
  getDate: getDate,
  chooseImageFormat: chooseImageFormat };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 266:
/*!******************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/components/uni-popup/popup.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  data: function data() {
    return {};


  },
  created: function created() {
    this.popup = this.getParent();
  },
  methods: {
    /**
              * 获取父元素实例
              */
    getParent: function getParent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'uniPopup';
      var parent = this.$parent;
      var parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    } } };exports.default = _default;

/***/ }),

/***/ 27:
/*!***************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/store/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 28));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 9));
var _user = _interopRequireDefault(__webpack_require__(/*! ./modules/user */ 31));
var _tags = _interopRequireDefault(__webpack_require__(/*! ./modules/tags */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  modules: {
    user: _user.default,
    tags: _tags.default },

  state: {
    isUniverifyLogin: false,
    testvuex: false,
    colorIndex: 0,
    colorList: ['#FF0000', '#00FF00', '#0000FF'],
    noMatchLeftWindow: true,
    active: 'componentPage',
    leftWinActive: '/pages/component/view/view',
    activeOpen: '',
    menu: [],
    univerifyErrorMsg: '' },

  mutations: {
    setTestTrue: function setTestTrue(state) {
      state.testvuex = true;
    },
    setTestFalse: function setTestFalse(state) {
      state.testvuex = false;
    },
    setColorIndex: function setColorIndex(state, index) {
      state.colorIndex = index;
    },
    setMatchLeftWindow: function setMatchLeftWindow(state, matchLeftWindow) {
      state.noMatchLeftWindow = !matchLeftWindow;
    },
    setActive: function setActive(state, tabPage) {
      state.active = tabPage;
    },
    setLeftWinActive: function setLeftWinActive(state, leftWinActive) {
      state.leftWinActive = leftWinActive;
    },
    setActiveOpen: function setActiveOpen(state, activeOpen) {
      state.activeOpen = activeOpen;
    },
    setMenu: function setMenu(state, menu) {
      state.menu = menu;
    },
    setUniverifyLogin: function setUniverifyLogin(state, payload) {
      typeof payload !== 'boolean' ? payload = !!payload : '';
      state.isUniverifyLogin = payload;
    },
    setUniverifyErrorMsg: function setUniverifyErrorMsg(state) {var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      state.univerifyErrorMsg = payload;
    } },

  getters: {
    currentColor: function currentColor(state) {
      return state.colorList[state.colorIndex];
    } },

  actions: {
    // lazy loading openid
    getUserOpenId: function () {var _getUserOpenId = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {var commit, state;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                commit = _ref.commit,
                state = _ref.state;_context.next = 3;return (

                  new Promise(function (resolve, reject) {
                    if (state.openid) {
                      resolve(state.openid);
                    } else {
                      uni.login({
                        success: function success(data) {
                          commit('login');
                          setTimeout(function () {//模拟异步请求服务器获取 openid
                            var openid = '123456789';
                            console.log('uni.request mock openid[' + openid + ']');
                            commit('setOpenid', openid);
                            resolve(openid);
                          }, 1000);
                        },
                        fail: function fail(err) {
                          console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err);
                          reject(err);
                        } });

                    }
                  }));case 3:return _context.abrupt("return", _context.sent);case 4:case "end":return _context.stop();}}}, _callee);}));function getUserOpenId(_x) {return _getUserOpenId.apply(this, arguments);}return getUserOpenId;}(),

    getPhoneNumber: function getPhoneNumber(_ref2,

    univerifyInfo) {var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        uni.request({
          url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
          method: 'POST',
          data: univerifyInfo,
          success: function success(res) {
            var data = res.data;
            if (data.success) {
              resolve(data.phoneNumber);
            } else {
              reject(res);
            }

          },
          fail: function fail(err) {
            reject(res);
          } });

      });
    } } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 28:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 29);

/***/ }),

/***/ 29:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 30);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 295:
/*!*********************************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/components/uni-transition/createAnimation.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"尾巴翘","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"尾巴翘","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"尾巴翘","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"尾巴翘","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 30:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 31:
/*!**********************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/store/modules/user.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  hasLogin: false,
  hasFirstLogin: true,
  wxUserInfo: {}, // 微信用户信息
  provider: "", // 服务商
  userInfo: {}, // 用户信息
  token: '' // 用户token
};

var mutations = {
  login: function login(state, token) {
    state.hasLogin = true;
    state.token = token;
  },
  setFirstLogin: function setFirstLogin(state, firstLogin) {
    state.hasFirstLogin = firstLogin;
  },
  setProvider: function setProvider(state, provider) {
    state.provider = provider;
  },
  logout: function logout(state) {
    state.hasLogin = false;
    state.openid = null;
  },
  setOpenid: function setOpenid(state, openid) {
    state.openid = openid;
  },
  setUserInfo: function setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setWxUserInfo: function setWxUserInfo(state, userInfo) {
    state.wxUserInfo = userInfo;
  } };var _default =


{
  namespaced: true,
  state: state,
  mutations: mutations };exports.default = _default;

/***/ }),

/***/ 32:
/*!**********************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/store/modules/tags.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _tags = _interopRequireDefault(__webpack_require__(/*! ../../utils/api/tags */ 33));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var state = {
  sexList: [{
    name: "女孩",
    value: 0 },

  {
    name: "男孩",
    value: 1 }],


  ageList: [
  "0～3个月",
  "3～6个月",
  "6～12个月",
  "1～2岁",
  "3岁",
  "4岁",
  "5岁",
  "6岁",
  "7岁",
  "8岁",
  "9岁",
  "10岁",
  "11岁",
  "12岁",
  "13岁",
  "14岁",
  "15岁",
  "16岁",
  "17岁",
  "18岁",
  "19岁",
  "20岁"],

  experienceVaccineList: [{
    name: "已接种",
    value: 0 },

  {
    name: "接种中",
    value: 1 },

  {
    name: "未接种",
    value: 0 }],


  experienceList: [{
    name: "已经",
    value: 0 },

  {
    name: "没有",
    value: 1 }

  // {
  // 	name: "不详",
  // 	value: 3
  // },
  ],
  typeList: [{
    name: "汪汪",
    value: 1 },

  {
    name: "喵喵",
    value: 0 }

  // {
  // 	name: "其他",
  // 	value: 2
  // },
  ],
  duringList: [{
    name: "流浪",
    value: 0 },

  {
    name: "救助",
    value: 1 },

  {
    name: "就医",
    value: 2 },

  {
    name: "康护",
    value: 3 },

  {
    name: "中途",
    value: 4 },

  {
    name: "领养",
    value: 5 },

  {
    name: "培训",
    value: 6 },

  {
    name: "在家",
    value: 7 },

  {
    name: "外星",
    value: 8 }],


  bodyTypeList: [{
    name: "大型",
    value: 0 },

  {
    name: "中型",
    value: 1 },

  {
    name: "小型",
    value: 2 },

  {
    name: "迷你",
    value: 3 }],


  featherList: [{
    name: "长毛",
    value: 0 },

  {
    name: "短毛",
    value: 1 },

  {
    name: "卷毛",
    value: 2 },

  {
    name: "无毛",
    value: 3 }],


  adoptList: [{
    name: "等待领养",
    value: 0 },

  {
    name: "不领养",
    value: 1 }],


  limitSameCityList: [{
    name: "限同城",
    value: 1 },

  {
    name: "不限",
    value: 0 }],


  characterList: [{
    name: "平静",
    value: 0 },

  {
    name: "温柔",
    value: 1 },

  {
    name: "活泼",
    value: 2 },

  {
    name: "聪明",
    value: 3 },

  {
    name: "谨慎",
    value: 4 },

  {
    name: "会看家",
    value: 5 },

  {
    name: "不挑食",
    value: 6 },

  {
    name: "讲卫生",
    value: 7 },

  {
    name: "小甜心",
    value: 8 },

  {
    name: "爱运动",
    value: 9 },

  {
    name: "高冷",
    value: 10 },

  {
    name: "亲人",
    value: 11 }],


  // 动物健康标签
  healthTag: ['绝育', '驱虫', '免疫'],
  // 动物外形标签
  shapeTag: ['卷毛', '长毛', '短毛', '黑色', '黄色', '棕色', '白色', '花色'],
  // 动物性格标签
  characterTag: ['安静', '温柔', '活泼', '易怒', '孤僻', '聪明', '不挑食', '会看家', '无攻击性', '胆小', '高冷', '不乱叫', '亲人'],
  // 动物救助标签
  succorTag: ['流浪', '救助', '就医', '康复', '培训', '中途', '领养', '在家', '外星'],
  // 动物视频发布状态
  videoPublicStatus: ['审核中', '审核通过', '审核不通过', '发布中', '发布失败', '发布通过'],

  // 动物性别
  animalSex: [{
    id: 0,
    label: '女孩' },

  {
    id: 1,
    label: '男孩' }],


  // 动物类型
  animalTypes: [{
    id: 0,
    label: '喵喵' },

  {
    id: 1,
    label: '汪汪' }],


  // 是否限制本地领养
  sameOrigin: [{
    id: true,
    label: '是' },

  {
    id: false,
    label: '否' }],


  // 是否被领养
  isAdopted: [{
    id: 0,
    label: '等待领养' },

  {
    id: 1,
    label: '正在被领养' },

  {
    id: 2,
    label: '已被领养' },

  {
    id: 3,
    label: '不需要领养' }] };




var mutations = {
  updateHealthTag: function updateHealthTag(state, params) {
    state.healthTag = params;
  },
  updateShapeTag: function updateShapeTag(state, params) {
    state.shapeTag = params;
  },
  updateCharacterTag: function updateCharacterTag(state, params) {
    state.characterTag = params;
  },
  updateSuccorTag: function updateSuccorTag(state, params) {
    state.succorTag = params;
  } };


var actions = {
  getTags: function getTags(_ref)

  {var commit = _ref.commit;
    _tags.default.getHealthyList().then(function (res) {
      commit.updateHealthTag(res.result);
    });
    _tags.default.getShapeList().then(function (res) {
      commit.updateShapeTag(res.result);
    });
    _tags.default.getCharacterList().then(function (res) {
      commit.updateCharacterTag(res.result);
    });
    _tags.default.getSuccorList().then(function (res) {
      commit.updateSuccorTag(res.result);
    });
  } };var _default =


{
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 33:
/*!******************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/api/tags.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _es6Promise = _interopRequireDefault(__webpack_require__(/*! ../promise/es6-promise */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var http = __webpack_require__(/*! ../service.js */ 25);

module.exports = {
  /** -----------------------标签start--------------------- */
  // 动物健康标签
  getHealthyList: function getHealthyList() {
    return http.get.apply(http, ["/healthTag/list"].concat(Array.prototype.slice.call(arguments)));
  },
  // 动物外形标签
  getShapeList: function getShapeList() {
    return http.get.apply(http, ["/shapeTag/list"].concat(Array.prototype.slice.call(arguments)));
  },
  // 动物性格标签
  getCharacterList: function getCharacterList() {
    return http.get.apply(http, ["/characterTag/list"].concat(Array.prototype.slice.call(arguments)));
  },
  // 动物救助标签
  getSuccorList: function getSuccorList() {
    return http.get.apply(http, ["/succorTag/list"].concat(Array.prototype.slice.call(arguments)));
  } };

/***/ }),

/***/ 36:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 43:
/*!********************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/api/animal.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _es6Promise = _interopRequireDefault(__webpack_require__(/*! ../promise/es6-promise */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var http = __webpack_require__(/*! ../service.js */ 25);

module.exports = {
  /** -----------------------标签start--------------------- */
  /**
                                                              * 当前用户（非负责人）关注动物
                                                              * @param {animalId} string 动物id 
                                                              * @returns 
                                                              */
  animalFocus: function animalFocus(_ref)

  {var animalId = _ref.animalId;
    return http.get("/animal/focus", {
      animalId: animalId });

  },
  /**
      * 获取动物基本信息--(组织才能使用此接口)
      * @param {animalId} string 动物id 
      * @returns 
      */
  getAnimalBasicInfo: function getAnimalBasicInfo() {
    return http.get.apply(http, ["/animal/getAnimalBasicInfo"].concat(Array.prototype.slice.call(arguments)));
  },
  /**
      * 获取动物主页信息
      * @param {animalId} string 动物id 
      * @returns 
      */
  getAnimalHomeInfo: function getAnimalHomeInfo() {
    return http.get.apply(http, ["/animal/getAnimalHomeInfo"].concat(Array.prototype.slice.call(arguments)));
  },
  // 创建-更新动物基本信息
  postAnimalBasicInfo: function postAnimalBasicInfo() {
    return http.post.apply(http, ["/animal/updateAnimalBasicInfo"].concat(Array.prototype.slice.call(arguments)));
  },

  // 上传动物背景图
  uploadAnimalImage: function uploadAnimalImage() {
    return http.post.apply(http, ['/upload/animal/image'].concat(Array.prototype.slice.call(arguments)));
  },

  // 打赏动物
  getCreateAnimalOrder: function getCreateAnimalOrder() {
    return http.get.apply(http, ['/order/createAnimalOrder'].concat(Array.prototype.slice.call(arguments)));
  },

  // 打赏返回
  getMiniNotify: function getMiniNotify() {
    return http.get.apply(http, ['/order/miniNotify'].concat(Array.prototype.slice.call(arguments)));
  },

  // 创建动物身份号
  postIdentify: function postIdentify() {
    return http.post.apply(http, ["/animal/identify"].concat(Array.prototype.slice.call(arguments)));
  },

  // 上传动物视频回调
  postFinishUpload: function postFinishUpload() {
    return http.post.apply(http, ["/media/finishUpload"].concat(Array.prototype.slice.call(arguments)));
  },
  // 上传回调信息
  getSignature: function getSignature() {
    return http.get.apply(http, ["/media/getSignature"].concat(Array.prototype.slice.call(arguments)));
  },
  // 获取当前指定页和数目的短视频
  animalOrderMedias: function animalOrderMedias() {
    return http.post.apply(http, ["/animal/animalMedias"].concat(Array.prototype.slice.call(arguments)));
  },
  // 删除动物视频
  deletAnimalOneVideo: function deletAnimalOneVideo()
  {
    return http.get.apply(http, ["/media/remove"].concat(Array.prototype.slice.call(arguments)));
  },
  // 删除动物
  deleteAnimal: function deleteAnimal(_ref2)

  {var animalId = _ref2.animalId;
    return http.get("/animal/remove", {
      animalId: animalId });

  },
  // 修改指定视频名称
  /**
   * 更新视频名称，视频ID和视频名称
   * @param "animalId": 0,
            "name": "",
   * @returns
   */
  changeName: function changeName(param)
  {
    return http.get("/media/changeName", param);
  } };

/***/ }),

/***/ 5:
/*!***********************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 58:
/*!**********************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/config.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  baseImageUrl: 'https://xcx-1305387564.cos.ap-nanjing.myqcloud.com/' };


// module.exports = {  
// css: {  
//     loaderOptions: {  
//         sass: {  
//             data: '@import '@/common/uni-nvue.scss'',
//         }  
//     }  
// }  
// }
exports.default = _default;

/***/ }),

/***/ 9:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(item =>String.fromCharCode(item)).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 91:
/*!**************************************************************************!*\
  !*** /Users/chenping/7 kalastar/tailup/uniapp/utils/api/organization.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var http = __webpack_require__(/*! ../service.js */ 25);
module.exports = {
  /** -----------------------基地相关start--------------------- */
  /**
                                                                * 关注基地
                                                                * @params baseId string 基地id
                                                                * @returns 
                                                                */
  baseFocus: function baseFocus(_ref) {var baseId = _ref.baseId;
    return http.get('/base/focus', { baseId: baseId });
  },
  /**
      * 获取基地主页信息
      * @params baseId string 基地id
      * @returns 
      */
  getBaseHomeInfo: function getBaseHomeInfo(_ref2) {var baseId = _ref2.baseId;
    return http.get('/base/getBaseHomeInfo', { baseId: baseId });
  },
  /**
      * 获取基地基本信息
      * @params baseId string 基地id
      * @returns 
      */
  getBaseInfo: function getBaseInfo(_ref3) {var baseId = _ref3.baseId;
    return http.get('/base/getBaseInfo', { baseId: baseId });
  },
  /**
      * 新增、修改基地信息
      * @params baseId string 基地id
      * @returns 
      */
  postBase: function postBase() {
    return http.post.apply(http, ['/base/updateBase'].concat(Array.prototype.slice.call(arguments)));
  },
  /** -----------------------基地相关end--------------------- */

  // 获取答疑列表
  getFaqList: function getFaqList(_ref4) {var baseId = _ref4.baseId;
    return http.get('/baseQa/list', { baseId: baseId });
  },
  /**
      * 添加、修改答疑
      * @param {*} baseId string 基地id
      * @param {*} list   array  答疑列表
      * @returns 
      */
  postFaqItem: function postFaqItem(_ref5) {var baseId = _ref5.baseId,list = _ref5.list;
    return http.post('/baseQa/updateBaseQas?baseId=' + baseId, list);
  } };

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map