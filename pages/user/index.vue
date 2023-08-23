<template>
	<view class="container user-page">
		<view class="user-header">
			<view class="user-section user-section-spacing swiper">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="height: 345rpx;">
					<block v-for="(item, index) in banners" :key="index">
						<swiper-item class="swiper-item">
							<!-- <view class="image_wrapper"> -->
								<image bindtap="tapBanner" :data-id="item" :src="item" :mode="center"
									class="slide-image" />
							<!-- </view> -->
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="user-body">
			<image class="avatar" :src="userInfo.headImgUrl" />
			<view class="w-block user-body-info-block">
				<view class="user-body-navbar" hover-class="none" hover-stop-propagation="false">
					<button v-if="isSelf" @click="toEdit" class="button-middle" size="mini" type="default">
						<text>编辑</text>
					</button>
					<button v-else @click="toFocus" class="button-middle" size="mini"
						:type="userHomeData.focused ? 'default' : 'primary'">
						<text v-if="!userHomeData.focused" class="iconfont icon-add"></text>
						<text>{{ userHomeData.focused ? "已" : "" }}关注</text>
					</button>
					<!-- <button class="button-right color-text3" size="mini" type="default">
            <text class="iconfont icon-share"></text>分享
          </button> -->
					<!-- <button class="button-right color-text3" size="mini" type="default">
						积分<text>{{ userInfo.score }}</text>
					</button>-->
				</view>
				<view class="user-body-info">
					<view class="user-body-user">
						<text class="user-name">{{ userInfo.nickName?userInfo.nickName:"未登录" }}</text>
						<view class="user-help color-warning">
							<image class="user-cake" src="/static/images/cake/cake.png" />
							<text>已送稀罕·{{ userHomeData.canNum }}</text>
						</view>
					</view>
					<view class="user-body-fence">
						<view class="fence-container">
							<text class="font-bold">{{ userHomeData.followNum }}</text>
							<text class="font12 color-text2">关注</text>
						</view>
						<view class="fence-container">
							<text class="font-bold">{{ userHomeData.fanNum }}</text>
							<text class="font12 color-text2">粉丝</text>
						</view>
					</view>
				</view>
			</view>
			<van-tabs :active="active" @change="onChange">
				<van-tab title="负责毛窝" v-if="userHomeData.user.type == '1'">
					<view class="tab-content">
						<view class="w-block list-wrapper" @click="toAddBase">
							<view class="is-add-container add-box">
								<view class="is-add">
									<view class="add-line"></view>
									<view class="add-line rotate"></view>
								</view>
								<text class="add-text">新增</text>
							</view>
						</view>
						<block v-for="(item, index) in reverseChargeBriefsList" :key="index">
							<view class="w-block list-wrapper" @click="toOrganization(item)">
								<view class="list-image-wrapper">
									<image class="list-image" :src="item.headImgUrl" />
								</view>
								<view class="list-info-wrapper" hover-class="none" hover-stop-propagation="false">
									<view class="list-info-top">
										<text class="list-info-tilte">{{ item.name }}</text>
									</view>
				
									<view class="list-info-age">
										<icon class="w-icon w-icon-medium icon-cat"></icon>
										<text style="margin-left: 4rpx;margin-right: 32rpx;">{{ item.catNum }}喵喵</text>
										<icon class="w-icon w-icon-medium icon-dog"></icon>
										<text style="margin-left: 4rpx;">{{ item.dogNum }}汪汪</text>
									</view>
									<view class="list-info-cake color-warning">
										<image class="user-cake" src="/static/images/cake/cake.png" />
										<text class="cakes">收到稀罕</text>·
										<text>{{ item.canNum }}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
				</van-tab>			
				<van-tab title="关注毛孩子">
					<view class="tab-content">
						<block v-for="(item, index) in userHomeData.animalBriefs" :key="index">
							<view class="w-block list-wrapper">
								<view class="list-image-wrapper">
									<image class="list-image" :src="item.headImageId" @click="toAnimal(item)" />
								</view>
								<view class="list-info-wrapper" hover-class="none" hover-stop-propagation="false">
									<view class="list-info-top">
										<text class="list-info-tilte">{{ item.name }}</text>
										<!-- <text
                      :class="{
                        'list-info-tag': true,
                        'primary-box': tag.status == '1',
                        'default-box': tag.status == '0',
                      }"
                      v-for="(tag, index) in item.succorStatus"
                      :key="index"
                      >{{ tag.tag }}</text
                    > -->
										<text class="list-info-tag, default-box">{{
                      item.succorStatus
                    }}</text>
									</view>

									<view class="list-info-age">
										<text>{{ item.age }}</text>
										<text v-if="item.succorTime">{{ item.succorTime }}救助</text>
									</view>
									<view class="list-info-cake color-warning">
										<image class="user-cake" src="/static/images/cake/cake.png" />
										<text class="cakes">收到稀罕</text>·
										<text>{{ item.canNum }}</text>
									</view>
								</view>
								<button class="list-info-button" @click="toAnimal(item)">
									成长记录
								</button>
							</view>
						</block>
					</view>
				</van-tab>
				<van-tab title="关注毛窝">
					<view class="tab-content">
						<block v-for="(item, index) in userHomeData.baseBriefs" :key="index">
							<view class="w-block list-wrapper" @click="toOrganization(item)">
								<view class="list-image-wrapper">
									<image class="list-image" :src="item.headImgUrl" />
								</view>
								<view class="list-info-wrapper" hover-class="none" hover-stop-propagation="false">
									<view class="list-info-top">
										<text class="list-info-tilte">{{ item.name }}</text>
									</view>

									<view class="list-info-age">
										<icon class="w-icon w-icon-medium icon-cat"></icon>
										<text style="margin-right: 16rpx;margin-left: 2rpx">{{ item.catNum }}喵喵</text>
										<icon class="w-icon w-icon-medium icon-dog"></icon>
										<text style="margin-left: 2rpx">{{ item.dogNum }}汪汪</text>
									</view>
									<view class="list-info-cake color-warning">
										<image class="user-cake" src="/static/images/cake/cake.png" />
										<text class="cakes">收到稀罕</text>·
										<text>{{ item.canNum }}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
				</van-tab>
			</van-tabs>
		</view>
		<!--    <view
      v-if="isSelf && userHomeData.user && !userHomeData.user.donate"
      class="button-wrapper"
    >
      <button class="bottom-btn" @click="toDonateMonth">成为月捐人</button>
    </view> -->
	</view>
</template>
<script>
	// import wBreadcrumb from "../components/breadcrumb";
	const api = require("../../utils/api/index");
	import {
		mapState
	} from "vuex";
	export default {
		name: "Details",
		components: {
			// wBreadcrumb,
		},
		data() {
			return {
				userId: 0, // 用户id 如果和store一样，就是本人， 否则是其他人
				userInfo: {
					createTime: "2021-08-01 20:53:51",
					donate: false,
					headImgUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
					id: 5,
					ip: "223.85.176.189",
					isEnable: true,
					latitude: null,
					longitude: null,
					nickName: "微信测试用户",
					openId: "oH14d427JdkiMcPqDYkZF9StI8_M",
					phone: null,
					score: 0,
					sex: 0,
					type: 0,
					unionId: null,
					updateTime: "2021-08-01 20:53:51",
					wxNumber: null,
				},
				userExtraData: {
					imageIds: [],
					phone: "",
					wxNumber: "",
				},
				defaultBanners: ["../../static/images/banner/banner1.jpg"],

				indicatorDots: true,
				vertical: false,
				autoplay: false,
				interval: 2000,
				duration: 500,

				active: 0,

				userHomeData: {
					animalBriefs: [],
					baseBriefs: [],
					chargeBriefs: [],
					canNum: 0,
					focused: false, // 关注
					imageIds: [],
					user: {},
					fanNum: 0,
					followNum: 0,
				},
			};
		},
		computed: {
			...mapState({
				appUserInfo: (state) => state.user.userInfo,
			}),
			banners() {
				return this.userExtraData.imageIds.length ?
					this.userExtraData.imageIds :
					this.defaultBanners;
				// return this.userHomeData.imageIds.length
				//   ? this.userHomeData.imageIds
				//   : this.defaultBanners;
			},
			// 是否是本人
			// 没有传入userId 或者传了且和store一样 都是本人
			isSelf() {
				return (
					!this.userId || (this.userId && this.userId === this.appUserInfo.id)
				);
			},
			reverseChargeBriefsList() {
				if (this.userHomeData && this.userHomeData.chargeBriefs) {
					return this.userHomeData.chargeBriefs.reverse();
				}
			},
		},
		methods: {
			initData() {
				this.getUserHomeInfo();
				this.getUserInfo();
			},

			onChange(event) {
				if (event.target.title == "毛窝") {
					console.log("enter onchange", event);
					this.getUserHomeInfo();
				}
			},
			toFocus() {
				api
					.userFocus({
						userId: this.userId,
					})
					.then((res) => {
						console.log("关注", res);
						this.userHomeData.focused = !this.userHomeData.focused;
						uni.showToast({
							title: this.userHomeData.focused ? "关注成功" : "取消关注",
						});
					});
			},
			toEdit(item) {
				console.log(item);
				uni.navigateTo({
					url: `/pages/user/editForm`,
					success: (s) => {
						console.log("s", s);
					},
					error: (e) => {
						console.log("e", e);
					},
					complete: (c) => {
						console.log("c", c);
					},
				});
			},
			// methods
			// 获取用户主页信息
			// 如果有userId
			getUserHomeInfo() {
				console.log("get user home");
				let params = {};
				if (!this.isSelf) {
					params.userId = this.userId;
				}
				api.getUserHomeInfo(params).then((res) => {
					this.userHomeData = res.result;
					console.log("getUserHomeData:", this.userHomeData);
					this.userInfo = this.userHomeData.user;
				});
			},
			// 获取用户其他信息
			getUserInfo() {
				api.getUserInfo().then((res) => {
					let result = res.result;
					console.log("用户信息", result);
					if (result.imageIds.length) {
						result.imageIds = res.result.imageIds.map((item) => {
							return item;
						});
					}
					this.userExtraData = result;
				});
			},
			// 去动物详情
			toAnimal(item) {
				uni.navigateTo({
					url: "/subPackages/animal/details?id=" + item.id,
				});
			},
			// 组织详情页
			toOrganization(item) {
				console.log("org", item);
				uni.navigateTo({
					url: "/subPackages/organization/details?id=" + item.id,
				});
			},
			// 成为月捐人
			toDonateMonth() {
				uni.showToast({
					title: "设置成功",
				});
			},

			// 新增机构
			toAddBase() {
				console.log(1);
				uni.navigateTo({
					url: "/subPackages/organization/editForm",
				});
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		mounted: function() {
			this.initData();
		},
		onShow() {
			this.getUserHomeInfo();
		},
		onLoad: function(options) {
			if (options.userId) {
				this.userId = options.userId;
			}
		},
	};
</script>


<style>
	/**index.wxss**/
	.container {
		/* background-color: #f2f2f2; */
		min-height: 100%;
		display: block;
		padding-bottom: 100rpx;
	}

	.swiper-container {
		width: 750rpx;
		position: relative;
	}

	.swiper_box {
		width: 100%;
		height: 100%;
	}

	/* .swiper-item .slide-image {
		width: 100%;
		display: inline-block;
		overflow: hidden;
		height: 100%;
	} */

	.swiper-container .dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 20rpx;
		display: flex;
		justify-content: center;
	}

	.swiper-container .dots .dot {
		margin: 0 8rpx;
		width: 14rpx;
		height: 14rpx;
		background: #fff;
		border-radius: 50%;
		transition: all 0.6s;
		opacity: 0.5;
	}

	.swiper-container .dots .dot.active {
		width: 14rpx;
		opacity: 1;
	}

	.user-body {
		position: relative;
	}

	.avatar {
		height: 160rpx;
		width: 160rpx;
		border-radius: 50%;
		top: -80rpx;
		left: 32rpx;
		position: absolute;
	}

	.user-body .user-body-navbar {
		padding-left: 200rpx;
	}

	.user-body-navbar .button-middle,
	.user-body-navbar .button-right {
		border-radius: 18px;
		font-size: 12px;
		height: 72rpx;
		line-height: 72rpx;
		border: 1rpx solid #dbdbdc;
	}

	.user-body-navbar .button-middle {
		width: 320rpx;
	}

	.user-body-navbar .button-right {
		width: 132rpx;
		padding: 0;
		margin-left: 32rpx;
		border: 1px solid #dbdbdc;
	}

	.user-body-info-block {
		background-color: #fff;
	}

	.user-body-info {
		font-size: 18px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.user-body-info__top {
		display: flex;
	}

	.user-body-user {
		display: flex;
		flex-direction: column;
		margin-top: 35px;
	}

	.user-body-user .user-name {
		font-size: 18px;
		font-weight: 600;
		color: #303741;
	}

	.user-help {
		font-size: 14px;
		display: flex;
		align-items: center;
	}

	.user-cake {
		width: 36rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}

	.user-healthy {
		padding: 2rpx 10rpx;
	}

	.user-body-fence {
		display: flex;
	}

	.user-body-fence .fence-container {
		margin-right: 18rpx;
	}

	.user-body-fence .fence-container:last-child {
		margin-right: 0;
	}

	.user-body-fence .font-bold {
		margin-right: 8rpx;
	}

	.tab-content {
		padding: 16rpx;
		background-color: #f5f5f5;
	}

	.tab-content .list-wrapper {
		display: flex;
		align-items: center;
		padding: 20rpx 16rpx;
	}

	.list-wrapper .list-image-wrapper {
		position: relative;
	}

	.list-wrapper .list-image {
		display: block;
		width: 160rpx;
		height: 160rpx;
		border-radius: 4px;
	}

	.list-wrapper .list-info-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 24rpx;
		padding-top: 6rpx;
		padding-bottom: 1rpx;
	}

	.list-wrapper .list-info-tilte {
		height: 21px;
		font-size: 15px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303741;
		line-height: 21px;
	}

	.list-wrapper .list-info-tag {
		font-size: 10px;
		margin-left: 14rpx;
	}

	.list-wrapper .list-info-age {
		color: #545966;
	}

	.list-wrapper .list-info-cakes {
		font-size: 14px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
	}

	.list-wrapper .list-info-cakes .cakes {
		margin-left: 4rpx;
	}

	.list-info-button {
		font-size: 12px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #fff;
		width: 154rpx;
		height: 50rpx;
		line-height: 50rpx;
		background: #64c8b3;
		border-radius: 40rpx;
		margin: 0;
		padding: 0;
	}

	.tab-content .w-block {
		margin-bottom: 16rpx;
		background-color: #fff;
		border-radius: 8px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #545966;
		line-height: 21px;
	}

	.tab-content .warning-box {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 14px;
	}

	.uni-border-bottom:after {
		display: none;
	}

	.content-box-text {
		color: #9ba1aa;
	}

	.footer-box {
		height: 80rpx;
		line-height: 80rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;
		text-align: center;

		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #545966;
	}

	.footer-box__item {
		flex: 1;
		position: relative;
	}

	.footer-box__item+.footer-box__item::after {
		content: "";
		width: 1rpx;
		background-color: #ece7e7;
		position: absolute;
		left: 0;
		top: 25rpx;
		height: 34rpx;
	}

	.user-page .button-wrapper {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 112rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
	}

	.user-page .button-wrapper .bottom-btn {
		color: #fff;
		font-size: 16px;
		width: 686rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #64c8b3;
		border-radius: 40rpx;
		margin: 0 32rpx;
	}
</style>
