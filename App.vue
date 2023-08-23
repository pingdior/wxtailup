<script>
	import {
		mapMutations,
		mapActions,
		mapState,
	} from "vuex";
	import api from "./utils/api/index";
	
	export default {
		computed: {
			...mapState({
				isAuthed: (state) => state.user.hasLogin,
			}),
		},
		data() {
			return {
				hasFirstLogin: true,
			};
		},
		// onLoad: async function(options) {
		// onLaunch: async function(options) {
		onLaunch: function() {
			console.log('App Launch');
			// 登录授权
			// await this.isGetUserInfo();
			// await this.getWxLogin();
			// await this.toSeverLogin();
			this.isGetUserInfo();
			this.getWxLogin();
			this.toSeverLogin();
			
			// #ifdef APP-PLUS
			// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=2226
			if (plus.runtime.appid !== 'HBuilder') { // 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
				uni.request({
					url: 'https://7a3e3fa9-7820-41d0-be80-11927ac2026c.bspapp.com/http/update', //检查更新的服务器地址
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version,
						imei: plus.device.imei
					},
					success: (res) => {
						console.log("enter onLaunch!");

						if (res.statusCode == 200 && res.data.isUpdate) {
							// 提醒用户更新
							uni.showModal({
								title: '更新提示',
								content: res.data.note ? res.data.note : '是否选择更新',
								success: (ee) => {
									if (ee.confirm) {
										plus.runtime.openURL(res.data.url);
									}
								}
							})
						}
					}
				})
			}

			// 一键登录预登陆，可以显著提高登录速度
			uni.preLogin({
				provider: 'univerify',
				success: (res) => {
					console.log(1);
					// 成功
					this.setUniverifyErrorMsg();
					console.log("preLogin success: ", res);
				},
				fail: (res) => {
					console.log(2);
					this.setUniverifyLogin(false);
					this.setUniverifyErrorMsg(res.errMsg);
					// 失败
					console.log("preLogin fail res: ", res);
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show');
			// this.$refs.fatherLoginRef.isGetUserInfo("scope.userInfo");
			// this.$refs.fatherLoginRef.getWxLogin();
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			test: ''
		},
		methods: {
			...mapMutations(['setUniverifyErrorMsg', 'setUniverifyLogin']),
			...mapMutations("user", [
				"login",
				"setProvider",
				"setUserInfo",
				"setWxUserInfo",
				"setFirstLogin",
			]),
			isGetUserInfo(a = "scope.userInfo") {
				// return new Promise((resolve, reject) => {
					// setTimeout(() => {
					// 	console.log("enter loginApp!");
						// 3. 检查当前是否已经授权访问scope属性，参考下截图
						var _this = this;
						uni.getSetting({
							success(res) {
								console.log(res, "getSetting success");
								if (!res.authSetting[a]) {
									//3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取用户信息
									console.log("getSetting  first auth success");
									_this.getAuthorizeInfo();
								} else {
									console.log("getSetting  has authed success");
									// _this.isAuthed = true;
									// try {
									// 	uni.setStorageSync({
									// 		key: "isAuthed",
									// 		data: true,
									// 	});
									// } catch (e) {
									// 	//TODO handle the exception
									// 	console.log("setStorageSync authed exception!");
									// }
								}
							},
							fail(err) {
								console.log(err, 'fail')
							},
							finally() {
								console.log('finally')
							}
						});
				// 		resolve("isGetUserInfo success!");
				// 		reject("isGetUserInfo fail!");
				// 	}, 1000);
				// });
			},
			// 获取授权认证
			getAuthorizeInfo(a = "scope.userInfo") {
				//1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				// return new Promise((resolve, reject) => {
				// 	setTimeout(() => {
						var _this = this;
						uni.authorize({
							scope: a,
							success() {
								//1.1 允许授权
								// _this.isAuthed = true;
								// // 存在本地
								// try {
								// 	uni.setStorageSync({
								// 		key: "isAuthed",
								// 		data: true,
								// 	});
								// } catch (e) {
								// 	//TODO handle the exception
								// 	console.log("setStorageSync isAuthed exception!");
								// }
								console.log("微信环境授权成功了！");
							},
							fail() {
								//1.2 拒绝授权
								console.log("你拒绝了授权，无法获得周边信息");
							},
						});
				// 		resolve("isGetUserInfo success!");
				// 		reject("isGetUserInfo fail!");
				// 	}, 1000);
				// });
			},
			// 应用登陆
			toSeverLogin(code) {
				// return new Promise((resolve, reject) => {
				// 	setTimeout(() => {
						console.log('enter toSeverLogin');
						if (!code) {
							console.log('toLogin fail! login is null');
							return;
						}
						api // 应用登录
							.login({
								code: code,
							})
							.then((res) => {
								const {
									token,
									userInfo
								} = res.result;
								console.log('loginTailup res token userInfo', res, token, userInfo);
								try {
									uni.setStorageSync({
										key: "token",
										data: token,
									});
									this.login(token); // 设置token
								} catch (e) {
									//TODO handle the exception
									console.log("setStorageSync token exception!", e);
								}
								this.setUserInfo(userInfo);
								
								// try {
								// 	uni.setStorageSync({
								// 		key: "isAuthed",
								// 		data: true,
								// 	});
								// 	console.log("enter getAuthorizeInfo isAuthed success!");
									
								// } catch (e) {
								// 	//TODO handle the exception
								// 	console.log("setStorageSync isAuthed exception!");
								// }
								console.log("服务器环境登录成功了！");
							});
				// 		resolve("toSeverLogin success!");
				// 		reject("toSeverLogin fail!");
				// 	}, 1000);
				// });
			},
			// 获取服务供应商相关信息
			getWxLogin() {
				// return new Promise((resolve, reject) => {
				// 	setTimeout(() => {
						//2. 获取用户信息
						var _this = this;
						uni.getProvider({
							// 获取服务供应商
							service: "oauth",
							success: function(res) {
								console.log(res.provider);
								if (~res.provider.indexOf("weixin")) {
									_this.setProvider("weixin");
									uni.login({
										// 获取code
										provider: "weixin",
										success: function(loginRes) {
											console.log('loginRes',
												loginRes);
											_this.toSeverLogin(loginRes
												.code);
										},
									});
								}
							},
							fail: function(err) {
								console.log(err);
							},
						});
				// 		resolve("getWxLogin success!");
				// 		reject("getWxLogin fail!");
				// 	}, 1000);
				// });
			},
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import './static/styles/weui.css';
	@import "./static/styles/common.css";
	@import './static/fonts/iconfont.css';
	@import "./wxcomponents/vant/common/index.wxss";

	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}

	/* #endif */

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #f5f5f5;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.8;
	}

	.fix-pc-padding {
		padding: 0 50px;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/
</style>
