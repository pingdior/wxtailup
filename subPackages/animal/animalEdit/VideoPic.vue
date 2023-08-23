<template>
	<view class="w-page page-main">
		<swiper class="swiper-container" vertical @touchstart="bindtouchstart" @touchend="bindtouchend"
			:current="currIndex" @change="swiperchange" @animationfinish="swiperanimateend" duration="600">
			<swiper-item v-for="(item,index) in orderMedias" :key="index">
				<view class="video-container">
					<my-player v-if="currIndex==index" class="my-player" :appid="videoID" :fileid="item.fileId" :playerid="playerid"
						width="100%" height="100%" :controls="false" autoplay="true" :loop="true" @bindplay="bindplay"
						:object-fit="isVerticalShow(item.height,item.width)"
						@bindtimeupdate="bindtimeupdate" @binderror="binderror" :title="item.name"
						:showCenterPlayBtn="false" />
					<image v-else :src="item.coverImage" style="width:100%;height:100%;z-index=10"></image>
					<view class="bottom-side">
						<view class="bottom-item">
							<view class="bottom-name-wrapper" @click="toAnimalDetails(item)">
								<text class="bottom-name">{{ item.name }}</text>
								<icon class="iconfont icon-right" />
							</view>
						</view>
						<!-- <view class="bottom-side-description">{{ item.intro }}</view> -->
					</view>
				</view>
			</swiper-item>
			<view v-if="noData" class="loading-more">
				<text class="loading-more-text">没有更多数据了</text>
			</view>
		</swiper>
	</view>
</template>

<script>
	import api from "../../../utils/api/index";
	import animalApi from "../../../utils/api/animal";
	const globalConst = require("../../../utils/service");
	
	const plugin = requirePlugin("myPlugin");
	export default {
		data() {
			return {
				animalId: 0,
				isFocusTab: false,
				playerid: "video",
				
				orderMedias: [{}], // 获取短视频播放列表
				orderMediasPageSize:10,  // 一个个获取
				orderMediasPage:0,
				currIndex: 0,
				currentPage: 0,
				pageMaxSize: 0,
				currTimeStr: "00:00",
				endTimeStr: "00:00",
				duration: 0,
				sliderValue: 0,
				showPlayBtn: false,
				noData: false,
				isClickSide: false, // 是否点击侧边栏
				videoID: globalConst.videoDataAppId,
			};
		},
		methods: {
			initData() {
				// 触发前一页的更新
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				
				this.orderMedias = prevPage.$vm.orderMedias;
				// uni.getStorage({
				// 	key: "animalCurMediasList",
				// 	success: (res) => {
				// 		console.log("get animalCurMediasList:", res.data);
				// 		this.videoRecommendList = res.data;
				// 	},
				// });
				//this.getAnimalOrderMedias();
				// 需要请求多条可以是swiper有滑动
				// for (let i = 0; i < 2; i++) {
				// 	this.getAnimalOrderMedias();
				// }
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
			getAnimalOrderMedias() {
				console.log("enter getAnimalOrderMedias orderMediasPage currentIndex!",this.orderMediasPage);
				this.orderMediasPage++;
				animalApi.animalOrderMedias({
					animalId: this.animalId,
					current: this.orderMediasPage,
					size: this.orderMediasPageSize,
				}).then((res) => {
					console.log("enter return animalOrderMedias:", res);
					if (res.result && res.result.records && res.result.records.length > 0) {
						
						console.log("enter res copy orderMedias orderMediasPage:", this.orderMediasPage);
						if(this.orderMedias.length>1)
						{
							for (let index in res.result.records) {
								this.orderMedias.push(res.result.records[index]);
							}
						}
						else
						{
							this.orderMedias = res.result.records;
						}
						this.orderMediasMaxPages = res.result.pages;
						console.log("now orderMediasMaxPages value orderMedias:",this.orderMediasMaxPages,this.orderMedias);
					} else {
						console.log("Medias is null in getAnimalOrderMedias!");
						this.noData = true;
					}
				});
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
			//video时间更新触发 swiper
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
					// this.setData({
					//   sliderValue: sliderValue,
					//   duration: e.detail.detail.duration,
					// });
				}
			},
			//错误处理 swiper
			binderror(e) {
				console.log("catch video error:");
				console.log(e);
				wx.showToast({
					title: "视频播放错误",
					icon: "none",
				});
			},

			//播放时的处理 swiper
			bindplay(e) {
				let hc = this.hiddenCover;

				this.playing = true;

				if (hc === false) {
					setTimeout(() => {
						this.hiddenCover = true;
					}, 200);
				}
			},

			//触摸屏幕时记录一个时间 swiper
			bindtouchstart(e) {
				this.ts = e.timeStamp;
			},

			/** swiper
			 * 离开屏幕时判断，如果间隔小于100ms则认为是普通点击，触发暂停/播放操作；
			 * 否则认为是拖拽或者滑动屏幕操作，不触发暂停/播放；
			 * @param e
			 */
			bindtouchend(e) {
				setTimeout(() => {
					if (this.isClickSide) return;
					let ctx = plugin.getContext(this.playerid);
					console.log(plugin, ctx, this.playerid);
					this.te = e.timeStamp;

					let cost = this.te - this.ts;
					if (cost < 100) {
						if (this.playing) {
							ctx.pause();
							this.playing = false;
							this.showPlayBtn = true;
						} else {
							ctx.play();
							this.playing = true;
							this.showPlayBtn = false;
						}
					} else {
						//console.log('drag...')
					}
				})
			},
			// swiper
			swiperchange(e) {
				this.currIndex = e.detail.current;
				if (this.currIndex >= this.orderMedias.length - 1) {
					// this.currIndex = this.orderMedias.length - 1;
					this.getAnimalOrderMedias();
				}
				
				console.log("change getAnimalOrderMedias", e,e.detail.current);
			},

			//滑动屏幕结束时加载下一个视频 swiper
			swiperanimateend(e) {
				console.log("anima", e);
				const ci = e.detail.current;
			},

			// 去动物详情页
			toAnimalDetails(item) {
				uni.navigateBack({
				    delta: 1
				});
					
			},
		},
		mounted() {
			this.initData();
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: async function(options) {
			console.log("animal-video-play", options);
			this.animalId = options.id;
			this.currIndex = options.videoId;
		},
		onUnload() {
			uni.removeStorage({
				key: "animalCurMediasList",
			});
		}
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
		color: #fff;
	}

	.page-main .van-tabs__line {
		background-color: #fff !important;
	}

	.page-main van-tab {
		width: 750rpx;
		height: 100px;
	}

	.page-main .van-ellipsis {
		color: #fff;
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
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.page-main .right-side {
		width: 80rpx;
		position: absolute;
		top: 256rpx;
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
		bottom: 0;
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-bottom: 200rpx;
		color: #fff;
	}

	.page-main .bottom-side .bottom-item {
		height: 58rpx;
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
		font-size: 12px;
		height: 200rpx;
		font-size: 12px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 17px;
		text-shadow: 0px 1px 2px rgba(102, 102, 102, 0.5);
	}

	.page-main .bottom-side .bottom-name {
		white-space: nowrap;
		display: inline-block;
		overflow: hidden;
		max-width: 260rpx;
		color:#FFB30D;
	}

	.page-main .bottom-side .icon-right {
		font-size: 14px;
		position: relative;
		top: -2rpx;
	}
</style>
