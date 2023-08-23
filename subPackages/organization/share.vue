<template>
	<view>
		<!-- <web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html" style="height: 600px;"></web-view> -->
		<!-- <canvas canvasId="firstCanvas"> -->
		<view class="container page-base-share">
			<view class="page-header">
				<view class="page-section page-section-spacing swiper">
					<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration" style="height: 345rpx;">
						<block v-for="(item, index) in orgHomeData.imageIds" :key="index">
							<swiper-item>
								<!-- <view class="image_wrapper"> -->
								<image bindtap="tapBanner" :data-id="item" :src="item" class="slide-image"
									:mode="center" />
								<!-- </view> -->
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
			<view class="page-body">
				<image class="avatar" :src="orgHomeData.headImgUrl" />
				<view class="w-block page-body-info-block">
					<view class="page-body-info">
						<view class="page-body-user">
							<text class="user-name">{{ baseInfo.name }}</text>
							<text class="user-status font10 color-text2">
								<text>{{ orgHomeData.canNum}}稀罕</text>
								<text>{{ orgHomeData.followNum }}关注</text>
								<text>{{ orgHomeData.fanNum }}喜欢</text>
							</text>
						</view>
						<!-- <view class="user-sub-des">
            <text>3小时前来过</text>
          </view> -->
						<view class="primary-box replay-box">
							<view class="flex-column replay-item">
								<text class="replay-number">100%</text>
								<text>留言回复率</text>
							</view>
							<view class="flex-column replay-item">
								<text class="replay-number">{{orgHomeData.catNum+orgHomeData.dogNum}}</text>
								<text>待领养数量</text>
							</view>
							<view class="flex-column replay-item">
								<text class="replay-number">0</text>
								<text>已领养数量</text>
							</view>
						</view>
					</view>
				</view>
				<view class="w-content">
					<view class="page-bottom-btns-share">
						<button class="w-btn" @click="enterPrograme">
							打开小程序❤️查看更多毛窝信息！
						</button>
					</view>
					<view class="w-blk">
						<uni-section title="收养组织简介" type="line"></uni-section>
						{{baseInfo.intro}}
					</view>
				</view>
				<view v-if="hasFirstLogin" class="page-bottom-btns-login">
					<button class="btn" type="primary" plain="true">
						更多生命故事❤请点击左上角登录！
					</button>
				</view>
				<!-- <view v-else class="page-bottom-btns"> -->
				<view v-else class="page-bottom-btns">
					<!-- <view class="w-link" @click="toCollect">
          <image class="w-icon" src="../../static/icons/collect.png" />
          <text>收藏</text>
        </view> -->
					<button class="w-link" open-type="share">
						<image class="w-icon" src="../../static/icons/share.png" />
						<text>分享</text>
					</button>
				</view>
			</view>
		</view>
		<!-- </canvas> -->
	</view>
</template>
<script>
	const api = require("../../utils/api/organization");
	import {
		mapState,
	} from "vuex";

	export default {
		name: "Details",
		data() {
			return {
				indicatorDots: true,
				vertical: false,
				autoplay: false,
				interval: 2000,
				duration: 500,

				baseName: "",
				animalInfo: {
					name: "聪聪",
					age: '3岁',
					sex: '男',
					tags: [{
						tag: "康复中",
						status: "1",
					}, ],
					status: ['已免疫', '已驱虫', '未绝育'],
					cakeNum: 25,
					fenceNum: 39,
					likeNum: 195,
				},

				focus: false, // 关注

				baseId: 0,
				orgHomeData: {},
				baseInfo: {},
				upShareFileUrl: "", // 上传地址
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				hasFirstLogin: false,
			};
		},
		computed: {
			...mapState({
				appUserInfoFirst: (state) => state.user.userInfo,
				isAuthed: (state) => state.user.hasLogin,
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
		methods: {
			initData() {
				this.getOrgHomeInfo();
				this.getOrgInfo();
			},
			// 获取首页信息--基地
			getOrgHomeInfo() {
				console.log("enter getBaseHomeInfo-share!");
				api
					.getBaseHomeInfo({
						baseId: this.baseId,
					})
					.then((res) => {
						this.orgHomeData = res.result;
						this.orgHomeData.imageIds = res.result.imageIds.map(item => item);
						console.log("enter getOrgHomeInfo success:", res);
					});
			},
			// 获取信息--基地
			getOrgInfo() {
				console.log("enter getBaseInfo!");
				api
					.getBaseInfo({
						baseId: this.baseId,
					})
					.then((res) => {
						this.baseInfo = res.result;
						console.log("enter getorgInfo success:", res);
					});
			},
			enterPrograme()
			{
				console.log("enter miniPrograme!");
				if(this.isAuthed)
				{
					uni.navigateTo({
						url: "/subPackages/organization/details?id=" + this.baseId,
					});
				}
				else
				{
					try {
						uni.setStorageSync('shareBaseId', this.baseId);
					} catch (e) {
						console.log("onChange setStorageSync shareBaseId fail!");
					};
					uni.switchTab({url: "../../pages/tabBar/main/index"});
				}
			},
			// 去捐赠
			toCollect() {
				console.log('收藏/取消')
			},
			// 关注、取消
			toFocus() {
				this.focus = !this.focus;
				uni.showToast({
					title: this.focus ? "关注成功" : "取消关注",
				});
			},
			onChange(event) {
				// uni.showToast({
				//   title: `切换到标签 ${event.detail.name}`,
				//   icon: "none",
				// });
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log("entor onload options:", options);
			this.baseId = options.baseId;
			this.baseName = options.name;
			this.upShareFileUrl = "/subPackages/organization/share?baseId=" + this.baseId + "&name=" + this.baseName;

			if (!this.appUserInfoFirst.nickName || this.appUserInfoFirst.nickName.length < 1) {
				this.hasFirstLogin = true;
			}
		},
		onShow() {
			console.log("enter onShow!");
			if (this.isAuthed) {
				this.initData();
			}
		},
		// mounted() {
		// 	console.log("enter mounted!");
		// 	if (this.isAuthed) {
		// 		this.initData();
		// 	}
		// },
		// 分享到聊天窗
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log("enter onShareAppMessage:", res);
				console.log("enter onShareAppMessage upShareFileUrl:", this.upShareFileUrl);
			}
			return {
				title: this.baseName + '的故事分享',
				path: this.upShareFileUrl,
			}
		},
		//发送到朋友圈，目前微信只支持单页模式，无数据权限限制
		// onShareTimeline(res) {
		// 	if (res.from === 'button') { // 来自页面内分享按钮
		// 		console.log("enter onShareTimeline:", res);
		// 		console.log("enter onShareTimeline upShareFileUrl:", this.upShareFileUrl);
		// 	}
		// 	return {
		// 		title: this.baseName + '的故事分享', //字符串 自定义标题
		// 		path: this.upShareFileUrl, //图片地址
		// 	}
		// },
	};
</script>


<style>
	/**index.wxss**/
	Page {
		padding-bottom: 112rpx;
	}

	.page-base-share {
		background: #f5f5f5;
		z-index: 9999;
	}

	.container {
		/* background-color: #f2f2f2; */
		min-height: 100%;
		padding-bottom: 100rpx;
		display: block;
	}

	.swiper-container {
		width: 750rpx;
		position: relative;
	}

	.swiper_box {
		width: 100%;
		height: 100%;
	}

	swiper-item image {
		width: 100%;
		display: inline-block;
		overflow: hidden;
		height: 100%;
	}

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

	.page-body {
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

	.page-base-share .replay-box {
		display: flex;
		padding-top: 28rpx;
		padding-bottom: 28rpx;
	}

	.page-base-share .replay-item {
		flex: 1;
		font-size: 12px;
		color: #9BA1AA;
		text-align: center;
	}

	.page-base-share .replay-number {
		font-size: 16px;
		font-size: 16px;
		font-weight: 600;
		color: #303741;
	}

	.page-body .page-body-navbar {
		padding-left: 200rpx;
	}

	.page-body-navbar button {
		border-radius: 18px;
		font-size: 12px;
		height: 72rpx;
		line-height: 72rpx;
	}

	.page-body-navbar .button-middle {
		width: 320rpx;
	}

	.page-body-navbar .button-right {
		width: 132rpx;
		padding: 0;
		margin-left: 32rpx;
		border: 1px solid #dbdbdc;
	}

	.page-body-info-block {
		background-color: #fff;
		padding-top: 68rpx;
	}

	.page-body-info {
		font-size: 18px;
		display: flex;
		flex-direction: column;
		padding-top: 20rpx;
	}

	.page-body-info__top {
		display: flex;
	}

	.page-body-user {
		display: flex;
		align-items: center;
	}

	.page-body-user>text+text {
		margin-left: 12rpx;
	}

	.page-base-share .user-sub-des {
		font-size: 12px;
		color: #9BA1AA;
	}

	.user-healthy {
		padding: 2rpx 10rpx;
	}

	.user-status {
		border-radius: 12px;
		border: 1px solid #dbdbdc;
	}

	.user-status text {
		position: relative;
		display: inline-block;
		padding: 2rpx 10rpx;
	}

	.user-status text+text::after {
		display: inline-block;
		position: absolute;
		content: "";
		width: 1rpx;
		height: 18rpx;
		background-color: #dbdbdc;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.w-content {
		padding: 16rpx;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	.author-wrapper {
		display: flex;
	}

	.author-avator {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}

	.author-name-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.author-name {
		font-size: 14px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303741;
	}

	.author-des {
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9BA1AA;
	}

	.author-des text+text {
		margin-left: 8rpx;
	}

	.author-part {
		display: flex;
	}

	.feature-box {
		font-size: 14px;
		color: #545966;
		line-height: 21px;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.feature-name {
		font-weight: 600;
		margin-right: 32rpx;
	}

	.uni-section {
		font-family: PingFangSC-Semibold, PingFang SC;
		color: #303741;
		height: auto !important;
		padding: 0 !important;
		background-color: #fff !important;
		margin-top: 8rpx;
		margin-bottom: 10rpx;
	}

	.uni-section__content-title {
		font-weight: 600;
		font-size: 18px !important;
	}

	.uni-section__head-tag {
		background-color: #64C8B3 !important;
	}

	.page-base-share .w-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.page-base-share .page-bottom-btns {
		padding: 16rpx 32rpx;
		position: fixed;
		background-color: #64c8b3;
		box-shadow: 1px 1px 1px #000;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
	}

	.page-base-share .page-bottom-btns .w-link {
		flex: 0.25;
		font-size: 16px;
		color: #545966;
		background: initial;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page-bottom-btns button {
		flex: 1;
		font-size: 16px;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20px;
		/* font-family: PingFangSC-Semibold, PingFang SC; */
	}

	.page-base-share .page-bottom-btns .w-link+.w-link {
		margin-left: 60rpx;
	}
</style>
