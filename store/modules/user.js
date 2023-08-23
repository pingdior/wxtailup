const state = {
  hasLogin: false,
  hasFirstLogin:true,
  wxUserInfo: {}, // 微信用户信息
  provider: "", // 服务商
  userInfo: {}, // 用户信息
  token: '', // 用户token
}

const mutations = {
  login: (state, token) => {
    state.hasLogin = true;
    state.token = token;
  },
  setFirstLogin:(state,firstLogin)=>{
	state.hasFirstLogin =  firstLogin;
  },
  setProvider(state, provider) {
    state.provider = provider
  },
  logout: (state) => {
    state.hasLogin = false
    state.openid = null
  },
  setOpenid(state, openid) {
    state.openid = openid
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setWxUserInfo(state, userInfo) {
    state.wxUserInfo = userInfo;
  }
}

export default {
  namespaced: true,
  state,
  mutations
}