const http = require("../service.js")
import MyPromise from "../promise/es6-promise"

module.exports = {
  /** -----------------------用户信息start--------------------- */
  // 微信login接口做注册和登录
  login() {
    return http.get("/user/login", ...arguments)
  },
  // 获取当前用户信息
  getUserInfo() {
    return http.get('/user/getUserBasicInfo')
  },

  /**
   * 更新微信用户信息，包括用户的头像、昵称等,wx.getUserProfile 用户确认调用此接口
   * @param "imageIds": [],
            "phone": "",
            "wxNumber": ""
   * @returns
   */
    updateUserBasicInfo(params) {
      return http.post('/user/updateUserBasicInfo', params)
    },
  /* 获取关注列表
   * userId
   */
  getUserFocus(params) {
    return http.get('/user/focus', params)
  },
  /**
   * 获取用户主页信息，当userId不传时就为当前用户信息
   * userId
   */
  getUserHomeInfo(params) {
    return http.get('/user/getUserHomeInfo', params)
  },
  /**
   * 更新微信用户信息，包括用户的头像、昵称等,wx.getUserProfile 用户确认调用此接口
   * @param encryptedData	加密数据		false	 string
            iv	加密向量		false	 string
            rawData	原始数据		false	 string
            signature	签名		false	 string
   * @returns 
   */
  updateProfile(params) {
    return http.post('/user/updateProfile', params)
  },

  // 关注用户
  userFocus() {
    return http.get('/user/focus', ...arguments)
  },
  /** -----------------------用户信息end--------------------- */

  /** -----------------------其他start--------------------- */
  // 获取视频
  getHomeVideo() {
    return http.get('/home/next', ...arguments)
  },
  /** -----------------------其他end--------------------- */

  /** -----------------------其他start 关于领养--------------------- */
  // 领养申请
  applyAdopt() {
    return http.post('/adoptApply/apply', ...arguments)
  },
  
  // 通过领养申请号，获取领养单详情
  applyAdoptDetail() {
    return http.get('/adoptApply/get', ...arguments)
  },
  
  // 
  getAdoptListOnBase() {
    return http.post('/adoptApply/getBaseApplies', ...arguments)
  },
  // 
  /** -----------------------其他end--------------------- */




  testPost() {
    return http.post('/post/url', ...arguments)
  },
  testGet() {
    return http.get('/get/url', ...arguments)
  },
}