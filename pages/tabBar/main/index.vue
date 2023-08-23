<template>
	<view class="w-page page-main">
		<!-- <fatherLogin ref="fatherLoginRef" /> -->
		<van-tabs id="tabs" class="tab-content" :active="isFocusTab" @change="onChange">
			<van-tab v-for="itemTab in tabs" :title="itemTab.name" :key="itemTab.id" :name="itemTab.id">
			</van-tab>
		</van-tabs>
		<swiper v-if="!isFocusTab&&videoRecommendList.length>0" class="swiper-container" vertical @change="swiperchange"
			@animationfinish="swiperanimateend" duration="600" :current="currIndex">
			<swiper-item v-for="(item, index) in videoRecommendList" :key="index">
				<view v-if="item" class="video-container">
					<view class="right-side">
						<view @click="toAnimalDetails(item)" class="right-side-item">
							<view class="right-side-item-icon-wrapper">
								<image class="animal-avator" :src="item.headImageId" />
								<view @click.stop="toFocus(item)" v-if="!item.focused" class="focus-wrapper">
									<icon class="focus-icon iconfont icon-add" />
								</view>
							</view>
							<text class="right-side-item-text"
								style="height: 35rpx;overflow: hidden">{{ item.animalName }}</text>
						</view>
						<view @tap.stop="toDonate(item)" class="right-side-item">
							<view>
								<image class="donate-cake" src="/static/images/cake/cake.png" />
							</view>
							<text class="right-side-item-text">稀罕</text>
						</view>
						<view @click.stop="toLike(item)" class="right-side-item">
							<view>
								<icon :class="{
                    'iconfont icon-heart': true,
                    'color-fail': item.like,
                  }" />
							</view>
							<text class="right-side-item-text">点赞</text>
						</view>
						<view @click.stop="toShare(item)" class="right-side-item">
							<view>
								<icon class="iconfont icon-share" />
							</view>
							<text class="right-side-item-text">分享</text>
						</view>
					</view>
					<view class="bottom-side">
						<view class="bottom-item">
							<view class="bottom-avator-wrapper">
								<image class="avator-image" :src="item.baseImgUrl" />
							</view>
							<view class="bottom-name-wrapper" @click="toBaseDetails(item)">
								<text class="bottom-name">@{{ item.baseName }}</text>
								<icon class="iconfont icon-right" />
							</view>
						</view>
						<view v-if="item.succorStatus" class="bottom-side-description">
							{{ item.name }}({{item.succorStatus}})
						</view>
						<view v-else class="bottom-side-description">{{ item.name }}</view>
					</view>
					<my-player v-if="currIndex == index" class="my-player" :appid="videoID" :fileid="item.fileId"
						:playerid="playerid" :controls="false" autoplay="true" :loop="true" width="100%" height="100%"
						:object-fit="isVerticalShow(item.height,item.width)" @bindplay="bindplay"
						@bindtimeupdate="bindtimeupdate" @binderror="binderror" :title="item.title"
						:showCenterPlayBtn="false" />
					<image v-else :src="item.coverImage" style="width:100%;height:100%;z-index=10"></image>
				</view>
			</swiper-item>
		</swiper>
		<swiper v-else-if="videoFocusList.length>0" class="swiper-container" vertical @change="swiperchange"
			@animationfinish="swiperanimateend" duration="600" :current="currIndex">
			<swiper-item v-for="(item, indexFocus) in videoFocusList" :key="indexFocus">
				<view v-if="item" class="video-container">
					<view class="right-side">
						<view @click="toAnimalDetails(item)" class="right-side-item">
							<view class="right-side-item-icon-wrapper">
								<image class="animal-avator" :src="item.headImageId" />
								<view @click.stop="toFocus(item)" v-if="!item.focused" class="focus-wrapper">
									<icon class="focus-icon iconfont icon-add" />
								</view>
							</view>
							<text class="right-side-item-text"
								style="height: 35rpx;overflow: hidden">{{ item.animalName }}</text>
						</view>
						<view @tap.stop="toDonate(item)" class="right-side-item">
							<view>
								<image class="donate-cake" src="/static/images/cake/cake.png" />
							</view>
							<text class="right-side-item-text">稀罕</text>
						</view>
						<view @click.stop="toLike(item)" class="right-side-item">
							<view>
								<icon :class="{
			        'iconfont icon-heart': true,
			        'color-fail': item.like,
			      }" />
							</view>
							<text class="right-side-item-text">点赞</text>
						</view>
						<view @click.stop="toShare(item)" class="right-side-item">
							<view>
								<icon class="iconfont icon-share" />
							</view>
							<text class="right-side-item-text">分享</text>
						</view>
					</view>
					<view class="bottom-side">
						<view class="bottom-item">
							<view class="bottom-avator-wrapper">
								<image class="avator-image" :src="item.baseImgUrl" />
							</view>
							<view class="bottom-name-wrapper" @click="toBaseDetails(item)">
								<text class="bottom-name">@{{ item.baseName }}</text>
								<icon class="iconfont icon-right" />
							</view>
						</view>
						<view v-if="item.succorStatus" class="bottom-side-description">
							{{ item.name }}({{item.succorStatus}})
						</view>
						<view v-else class="bottom-side-description">{{ item.name }}</view>
					</view>
					<my-player v-if="currIndex == indexFocus" class="my-player" :appid="videoID" :fileid="item.fileId"
						:playerid="playerid" width="100%" height="100%" :controls="false" autoplay="true" :loop="true"
						:object-fit="isVerticalShow(item.height,item.width)" @bindplay="bindplay"
						@bindtimeupdate="bindtimeupdate" @binderror="binderror" :title="item.title"
						:showCenterPlayBtn="false" />
					<image v-else :src="item.coverImage" style="width:100%;height:100%;z-index=10"></image>
				</view>
			</swiper-item>
		</swiper>
		<view v-if="hasFirstLogin" class="page-bottom-btns">
			<button class="btn" type="primary" plain="true" @click="getUserProfile">
				看见生命看见爱❤请点击登录授权
			</button>
		</view>
		<button v-if="hasFirstLogin" @click="getUserProfile" class='get-info'>请授权！</button>
	</view>
</template>

<script>
	import api from "../../../utils/api/index";
	import animalApi from "../../../utils/api/animal";
	const globalConst = require("../../../utils/service");
	import {
		mapMutations,
		mapActions,
		mapState,
	} from "vuex";
	const plugin = requirePlugin("myPlugin");
	export default {
		computed: {
			...mapState({
				isAuthed: (state) => state.user.hasLogin,
				appUserInfoFirst: (state) => state.user.userInfo,
			}),
			getAuthed: function() {
				return this.isAuthed;
			}
		},
		watch: {
			getAuthed: {
				handler: function() {
					if (this.isAuthed) {
						console.log("initOnloadData use!");
						this.initData();
					}
				},
			}
		},
		data() {
			return {
				isFocusTab: false,
				tabs: [{
						name: "最新",
						value: true
					},
					{
						name: "关注",
						value: false
					},
				],
				playerid: "video",
				videoRecommendList: [], // 推荐视频列表
				videoFocusList: [], // 关注视频列表
				videoFocusBackList: [1], // 空关注视频显示写定视频

				currIndex: 0,
				currTimeStr: "00:00",
				endTimeStr: "00:00",
				duration: 0,
				sliderValue: 0,
				showPlayBtn: false,
				defaultFocusBackPic: ["../../../static/images/focusBack.jpeg"],

				hasFirstLogin: false,
				bSwipeDown: false,
				isClickSide: false, // 是否点击侧边栏
				loginCode: "",
				// bAfterLoad: false, // 登陆之后表示为true
				bFromshare: false, // 是否来自分享页
				// ddanmulist: ["test1","test2","test3"],
				videoID: globalConst.videoDataAppId,
				
				shareBaseId:0, 				// 分享页的基地ID
				shareAnamalId:0, 			// 分享页的动物ID
			};
		},
		methods: {
			...mapMutations("user", [
				"login",
				"setProvider",
				"setUserInfo",
				"setWxUserInfo",
				"setFirstLogin",
			]),
			initSingleFlowData() {
				console.log("enter initSingleFlowData!");
				this.selectComponent("#tabs").resize();
				// 需要请求多条可以是swiper有滑动
				for (let i = 0; i < 2; i++) {
					this.getRecommendVideo();
				}
			},
			initDoubleFlowData() {
				console.log("enter initDoubleFlowData!");
				this.selectComponent("#tabs").resize();
				// 需要请求多条可以是swiper有滑动
				for (let i = 0; i < 2; i++) {
					this.getRecommendVideo();
					this.getFocusVideo();
				}
			},
			initFocusFlowData() {
				console.log("enter initFocusFlowData!");
				this.selectComponent("#tabs").resize();
				try {
					uni.setStorageSync({
						key: "hasFirstLogin",
						data: true,
					});
					this.hasFirstLogin = true;
				} catch (e) {
					//TODO handle the exception
					console.log("setStorageSync hasFirstLogin exception!");
				}
				// 需要请求多条可以是swiper有滑动
				for (let i = 0; i < 2; i++) {
					this.getFocusVideo();
				}
			},
			isVerticalShow(height = 1.0, width = 1.0) {
				var hwValue = 1.0;
				if (height && width) {
					hwValue = height / width;
					console.log("isVerticalShow hwValue:", hwValue);
				} else {
					console.log("isVerticalShow hwValue none");
					return "cover"
				}

				if (hwValue > 1) {
					console.log("isVerticalShow hwValue cover hwValue > 1");
					return "cover";
				} else {
					console.log("isVerticalShow hwValue contain");
					return "contain";
				}
			},
			hasFirstLoginInit() {
				if (!this.appUserInfoFirst.nickName || this.appUserInfoFirst.nickName.length < 1) {
					console.log("appUserInfoFirst not exict!");
					this.hasFirstLogin = true;
					try {
						uni.setStorageSync({
							key: "hasFirstLogin",
							data: true,
						});
					} catch (e) {
						//TODO handle the exception
						console.log("setStorageSync hasFirstLogin exception!");
					}
				}
			},
			setTabBarStyle() {
				uni.setTabBarStyle({
					color: "#ACB2BA",
					selectedColor: "#64C8B3",
					backgroundColor: "#282930",
					borderStyle: "black", // 否	tabBar上边框的颜色， 仅支持 black/white
				});
			},
			// 推荐和关注切换
			onChange(e) {
				if (!this.isFocusTab) {
					console.log("enter onChange !isFocus :", this.isFocusTab);
					// 登陆成功后，拉取数据
					if (!this.appUserInfoFirst.nickName || this.appUserInfoFirst.nickName.length < 1) {
						console.log("appUserInfoFirst not exict!");
						this.initFocusFlowData();
					}
				} else {
					console.log("enter onChange isFocus :", this.isFocusTab);
					// 登陆成功后，拉取数据
					if (!this.appUserInfoFirst.nickName || this.appUserInfoFirst.nickName.length < 1) {
						console.log("appUserInfoFirst not exict!");
						this.initSingleFlowData();
					}
				}
				this.isFocusTab = !this.isFocusTab;
				console.log("enter onChange focusTab state:", this.isFocusTab);

				if (this.isFocusTab) {
					//存最新，取关注索引
					try {
						uni.setStorageSync('mainPageCommitIndex', this.currIndex);
					} catch (e) {
						console.log("onChange setStorageSync mainPageCommitIndex fail!");
					};
					try {
						//从本地缓存中 同步获取指定 key 对应的内容
						uni.getStorageSync({
							key: 'mainPageFocusIndex',
							success: (res) => {
								console.log('onChange mainFocusIndex异步获取 = ' + res.data);
								this.currIndex = res.data;
							}
						});
					} catch (e) {
						//TODO handle the exception
						console.log("getStorageSync mainPageFocusIndex exception!");
					}
				} else {
					try {
						uni.setStorageSync('mainPageFocusIndex', this.currIndex);
					} catch (e) {
						console.log("onChange setStorageSync mainPageFocusIndex fail!");
					};
					try {
						uni.getStorageSync({
							key: 'mainPageCommitIndex',
							success: (res) => {
								console.log('onChange mainPageCommitIndex异步获取 = ' + res.data);
								this.currIndex = res.data;
							}
						});
					} catch (e) {
						//TODO handle the exception
						console.log("getStorageSync mainPageCommitIndex exception!");
					}
				}

				if (this.isFocusTab) {
					if (this.currIndex >= this.videoFocusList.length - 1) {
						if (this.videoFocusList.length == 0) {
							this.currIndex = 0;
						} else {
							this.currIndex = this.videoFocusList.length - 1;
						}
						this.getFocusVideo();
					}
				} else {
					if (this.currIndex >= this.videoRecommendList.length - 1) {
						this.currIndex = this.videoRecommendList.length - 1;
						this.getRecommendVideo();
					}
				}
			},
			//获取形如 xx:xx 的时间格式
			getSMPTEbySeconds(seconds) {
				let s = Math.floor(seconds);
				let m = Math.floor(s / 60);

				m = m % 60;
				s = s % 60;

				if (s < 10) {
					s = 0 + "" + s;
				}
				if (m < 10) {
					m = 0 + "" + m;
				}

				return m + ":" + s;
			},
			//video时间更新触发
			bindtimeupdate(e) {
				console.log(e);
				if (this.data.canUpdateSlider) {
					//判断拖拽完成后才触发更新，避免拖拽失效
					let d = e.detail.detail.duration;
					let sliderValue = (e.detail.detail.currentTime / d) * 100;
					let ct = this.getSMPTEbySeconds(parseInt(d * (sliderValue / 100)));
					let et = this.getSMPTEbySeconds(parseInt(d));
					this.currTimeStr = ct;
					this.endTimeStr = et;
					this.sliderValue = sliderValue;
					this.duration = duration;
				}
			},
			//错误处理
			binderror(e) {
				console.log("catch video error:");
				console.log(e);
				wx.showToast({
					title: "视频播放错误",
					icon: "none",
				});
			},

			//播放时的处理
			bindplay(e) {
				let hc = this.hiddenCover;

				this.playing = true;

				if (hc === false) {
					setTimeout(() => {
						this.hiddenCover = true;
					}, 200);
				}
			},
			swiperchange(e) {
				this.currIndex = e.detail.current;
				console.log("swiperchange", e);
				if (this.isFocusTab) {
					if (this.currIndex >= this.videoFocusList.length - 1) {
						if (this.videoFocusList.length == 0) {
							this.currIndex = 0;
						} else {
							this.currIndex = this.videoFocusList.length - 1;
						}
						this.getFocusVideo();
					}
				} else {
					if (this.currIndex >= this.videoRecommendList.length - 1) {
						this.currIndex = this.videoRecommendList.length - 1;
						this.getRecommendVideo();
					}
				}
			},

			//滑动屏幕结束时加载下一个视频
			swiperanimateend(e) {
				console.log("anima", e);
				const ci = e.detail.current;
			},

			// 获取推荐视频 false
			getRecommendVideo() {
				api
					.getHomeVideo({
						focus: false,
					})
					.then((res) => {
						console.log("enter getRecommendVideo res:", res);
						if (res.result) {
							this.videoRecommendList.push(res.result);
						}
					});
			},
			// 获取关注视频 true，,之先判断是否login
			getFocusVideo() {
				api
					.getHomeVideo({
						focus: true,
					})
					.then((res) => {
						console.log("enter getFocusVideo res:", res);
						if (res.result) {
							this.videoFocusList.push(res.result);
						}
						console.log("enter getFocusVideo videoFocusList's length:", this.videoFocusList);
					});
			},
			// 去动物详情页,之先判断是否login
			toAnimalDetails(item) {
				uni.navigateTo({
					url: "/subPackages/animal/details?id=" +
						item.animalId +
						"&baseId=" +
						item.baseId,
				});
			},
			// 去基地详情页，,之先判断是否login
			toBaseDetails(item) {
				uni.navigateTo({
					url: "/subPackages/organization/details?id=" + item.baseId
				});
			},
			// 关注，,之先判断是否login
			toFocus(item) {
				animalApi
					.animalFocus({
						animalId: item.animalId,
					})
					.then(() => {
						item.focused = true;
						for(let index in this.videoRecommendList )
						{
							if(item.animalId === this.videoRecommendList[index].animalId)
							{
								this.videoRecommendList[index].focused = true;
							}
						}
					});
			},
			// 默认关注小黑妹 id=5 在正式环境
			toDefaultFocus() {
				animalApi
					.animalFocus({
						animalId: 5,
					})
					.then(() => {
						console.log("enter toDefaultFocus OK!");
					});
			},
			// 去捐赠，,之先判断是否login
			toDonate(item) {
				console.log("enter toDonate item", item);
				uni.navigateTo({
					url: "/subPackages/animal/donate?animalId=" +
						item.animalId +
						"&name=" +
						item.animalName,
				});
			},
			// 点赞 需要有like参数，不然不能动态更新，,之先判断是否login
			toLike(item) {
				this.$set(item, "like", !item.like);
				this.isClickSide = true;
				setTimeout(() => {
					this.isClickSide = false;
				}, 200)
			},
			// 去分享，,之先判断是否login
			toShare(item) {
				console.log(item);
				uni.navigateTo({
					url: "/subPackages/animal/share?id=" + item.animalId + "&baseId=" + item.baseId,
				});
			},
			// 登陆获取数据
			initData() {
				// 登陆成功后，拉取数据
				if (!this.appUserInfoFirst.nickName || this.appUserInfoFirst.nickName.length < 1) {
					console.log("appUserInfoFirst not exict!");
					this.hasFirstLogin = true;
					try {
						uni.setStorageSync({
							key: "hasFirstLogin",
							data: this.hasFirstLogin,
						});
					} catch (e) {
						//TODO handle the exception
						console.log("setStorageSync token exception!", e);
					}

					this.initSingleFlowData();
				} else {
					this.hasFirstLogin = false;
					try {
						uni.setStorageSync({
							key: "hasFirstLogin",
							data: this.hasFirstLogin,
						});
					} catch (e) {
						//TODO handle the exception
						console.log("setStorageSync token exception!", e);
					}
					this.initDoubleFlowData();
				}
			},
			getUserProfile() {
				let that = this;
				uni.getUserProfile({
					desc: "登陆注册", // desc 字段必填
					success: (res) => {
						console.log(res, "wx.getUserProfile res:");
						const wxUserInfo = uni.getStorageSync('wxUserInfo');
						this.wxUserData = res;
						console.log(wxUserInfo, "uni getStorageSync wxUserInfo");
						if (wxUserInfo == null || wxUserInfo != this.wxUserData.userInfo) {
							this.setWxUserInfo(this.wxUserData.userInfo);
							try {
								// 存在本地
								uni.setStorageSync({
									key: "wxUserInfo",
									data: this.wxUserData.userInfo,
								});
							} catch (e) {
								//TODO handle the exception
								console.log("setStorageSync wxUserInfo exception!");
							}
						}
						this.updateUserInfo();
						this.changeSharePage();
					},
					fail: (res) => {
						console.log(res, "getUserProfile信息获取失败原因");
					},
				});
			},
			changeSharePage()
			{
				console.log("enter changeSharePage!");
				if (this.isAuthed) {
					if(this.shareAnamalId>0&&this.shareBaseId>0)
					{
						uni.navigateTo({
							url: "/subPackages/animal/details?id=" +
								this.shareAnamalId +
								"&baseId=" +
								this.shareBaseId,
						});
					}
					else if(this.shareBaseId>0)
					{
						uni.navigateTo({
							url: "/subPackages/organization/details?id=" + this.shareBaseId
						});
					}
				}
			},
			updateUserInfo() {
				console.log('需要更新用户信息', this.wxUserData);
				api.updateProfile({
					encryptedData: this.wxUserData.encryptedData,
					iv: this.wxUserData.iv,
					rawData: this.wxUserData.rawData,
					signature: this.wxUserData.signature
				}).then((res) => {
					if (res.code == 200) {
						this.setUserInfo(res.result);
						try {
							uni.setStorageSync({
								key: "hasFirstLogin",
								data: false,
							});
							this.hasFirstLogin = false;
							this.toDefaultFocus();
							
							this.initData();
						} catch (e) {
							//TODO handle the exception
							console.log("setStorageSync hasFirstLogin exception!");
						}
					};
					console.log("result updateProfile,hasFirstLogin:", res);
				});
			},
			getShareId()
			{
				console.log("enter getShareId!");
				//从本地缓存中 同步获取指定 key 对应的内容
				uni.getStorageSync({
					key: 'shareAnamalId',
					success: (res) => {
						console.log('onChange shareAnamalId异步获取 = ' + res.data);
						this.shareAnamalId = res.data;
					}
				});
				uni.getStorageSync({
					key: 'shareBaseId',
					success: (res) => {
						console.log('onChange shareBaseId异步获取 = ' + res.data);
						this.shareBaseId = res.data;
					}
				});
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad() {
			console.log("enter onLoad !");
		},

		onShow() {
			console.log("enter onShow videoID!", this.videoID);
			this.setTabBarStyle();
			if (this.isAuthed) {
				this.initData();
				this.changeSharePage();
			}
		},
	};
</script>

<style>
	/* --------- */
	page {
		height: 100%;
	}

	.page-main {
		padding: 0;
	}

	.page-main .page-content {
		position: fixed;
	}

	.page-main .tab-content {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 88rpx;
		z-index: 999;
	}

	.page-main .van-tabs__scroll.van-tabs__scroll--line {
		background-color: transparent;
	}

	.page-main .vab-tab,
	.page-main .van-tab--active .van-ellipsis {
		color: #64C8B3;
	}

	.page-main .van-tabs__line {
		background-color: #64C8B3 !important;
	}

	.page-main van-tab {
		width: 750rpx;
		height: 100px;
	}

	.page-main .van-ellipsis {
		color: #FFB30D;
	}

	.page-main video {
		height: 100%;
		width: 100%;
	}

	.page-main .swiper-container {
		height: 100%;
		overflow: hidden;
	}

	.page-main .video-container {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.page-main .my-player {
		position: absolute;
		z-index: -1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.page-main .right-side {
		width: 100rpx;
		position: absolute;
		z-index: 9999;
		top: 335rpx;
		right: 23rpx;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		color: #fff;
	}

	.page-main .right-side icon {
		line-height: 16px;
		font-size: 34px;
	}

	.page-main .animal-avator {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		border: 1px solid #fff;
	}

	.page-main .donate-cake {
		width: 80rpx;
		height: 80rpx;
	}

	.page-main .right-side-item {
		display: flex;
		z-index: 9999;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10rpx;
		margin-top: 10rpx;
	}

	.page-main .right-side-item-icon-wrapper {
		position: relative;
	}

	.page-main .right-side-item-icon-wrapper .focus-wrapper {
		position: absolute;
		bottom: 0;
		left: 22rpx;
		background-color: #64c8b3;
		/* border-radius: ; */
		height: 28rpx;
		width: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8rpx;
	}

	.page-main .right-side-item-icon-wrapper .focus-icon {
		position: relative;
		top: -12rpx;
		font-size: 10px;
	}

	.page-main .bottom-side {
		position: absolute;
		z-index: 9999;
		bottom: 0;
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-bottom: 40rpx;
		color: #fff;
	}

	.page-main .bottom-side .bottom-item {
		height: 58rpx;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		font-size: 14px;
		margin-bottom: 20rpx;
		max-width: 360rpx;
	}

	.page-main .bottom-side .bottom-item .bottom-avator-wrapper {
		height: 48rpx;
		width: 48rpx;
		margin-right: 12rpx;
	}

	.page-main .bottom-side .bottom-item .avator-image {
		height: 48rpx;
		width: 48rpx;
		border-radius: 50%;
	}

	.page-main .bottom-side .bottom-item .bottom-name-wrapper {
		display: flex;
		align-items: center;
	}

	.page-main .bottom-side .bottom-side-description {
		height: 200rpx;
		font-size: 14px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFB30D;
		line-height: 17px;
		text-shadow: 0px 1px 2px rgba(102, 102, 102, 0.5);
	}

	.page-main .bottom-side .bottom-name {
		white-space: nowrap;
		display: inline-block;
		max-width: 260rpx;
		overflow: hidden;
	}

	.page-main .bottom-side .icon-right {
		font-size: 14px;
		position: relative;
		top: -2rpx;
	}

	.get-info {
		position: fixed;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		text-align: center;
		opacity: 0;
		/* z-index: 9999; */
	}

	.page-bottom-btns {
		padding: 24rpx 32rpx;
		position: fixed;
		background-color: #FFFFFF;
		box-shadow: 1px 1px 1px #000;
		bottom: 400rpx;
		left: 0;
		right: 0;
		display: flex;
	}

	.page-bottom-btns button {
		flex: 1;
		font-size: 16px;
		height: 100rpx;
		line-height: 80rpx;
		border-radius: 20px;
		/* font-family: PingFangSC-Semibold, PingFang SC; */
	}

	.page-bottom-btns button+button {
		margin-left: 30rpx;
	}
</style>
