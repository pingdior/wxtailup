<template>
	<view class="container">
		<view class="page-header">
			<view class="page-section page-section-spacing swiper">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					style="height: 345rpx;">
					<block v-for="(item, index) in animalInfo.imageIds" :key="index">
						<swiper-item>
							<!-- <view class="image_wrapper"> -->
							<image bindtap="tapBanner" :data-id="item" :src="item" :mode="center" class="slide-image" />
							<!-- </view> -->
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="page-body">
			<image class="avatar" :src="animalInfo.headImageId" />
			<view class="w-block page-body-info-block">
				<view class="page-body-navbar" hover-class="none" hover-stop-propagation="false">
					<button v-if="isBaseOwnerUser" @click="toEdit" class="button-middle" size="mini" type="default">
						<text>编辑资料</text>
					</button>
					<button v-else @click="toFocus" class="button-middle" size="mini"
						:type="focus ? 'default' : 'primary'">
						<text v-if="!focus" class="iconfont icon-add"></text>
						<text>{{ focus ? "已" : "" }}关注</text>
					</button>
					<button @click="toShare" class="button-right color-text3" size="mini" type="default">
						<text class="iconfont icon-share"></text>分享
					</button>
				</view>
				<view class="page-body-info">
					<view class="page-body-user">
						<text class="user-name">{{ animalInfo.name }}</text>
						<text class="user-age">{{ animalInfo.age }}</text>
						<text :class="{
                'iconfont color-primary': true,
                'icon-man': animalInfo.sex == '1',
                'icon-woman': animalInfo.sex == '0',
              }"></text>
						<!-- 健康状态 -->
						<!-- <text
              :class="{
                'user-healthy font10': true,
                'primary-box': tag.status == '1',
                'default-box': tag.status == '0',
              }"
              v-for="(tag, index) in animalInfo.tags"
              :key="index"
              >{{ tag.tag }}</text
            > -->
						<text :class="{ 'user-healthy font10': true, 'default-box': true, }"
							v-for="(tag, index) in splitToArray(animalInfo.succorStatus)" :key="index">{{ tag }}</text>
						<text class="user-status font10 color-text2">
							<text v-for="(item, index) in splitToArray(animalInfo.healthStatus)" :key="index">{{
                item
              }}</text>
						</text>
					</view>
					<view @click="toBase(animalInfo.baseId)" class="color-primary font14">
						<text>来自{{ animalInfo.baseName }}</text><text class="iconfont icon-right"></text>
					</view>
					<view class="page-body-fence default-box bg-gray2" hover-class="none"
						hover-stop-propagation="false">
						<view>
							<text v-if="animalInfo&&animalInfo.canNum" class="font-bold">{{ animalInfo.canNum }}</text>
							<text v-else class="font-bold">0</text>
							<text class="font12 color-text2">收到稀罕</text>
						</view>
						<view>
							<text v-if="animalInfo&&animalInfo.fanNum" class="font-bold">{{ animalInfo.fanNum }}</text>
							<text v-else class="font-bold">0</text>
							<text class="font12 color-text2">关注</text>
						</view>
						<view>
							<text v-if="animalInfo&&animalInfo.followNum"
								class="font-bold">{{ animalInfo.followNum }}</text>
							<text v-else class="font-bold">0</text>
							<text class="font12 color-text2">喜欢</text>
						</view>
					</view>
				</view>
			</view>
			<van-tabs :active="active" @change="onChange">
				<van-tab title="动态">
					<view class="tab-content">
						<view v-if="isBaseOwnerUser" class="w-block list-wrapper">
							<view class="is-add-container add-box" @click="toAddVideo">
								<view class="is-add">
									<view class="add-line"></view>
									<view class="add-line rotate"></view>
								</view>
								<text class="add-text">相册</text>
							</view>
							<view class="is-add-container add-box" style="margin-left: 11px;" @click="toCameraVideo">
								<view class="is-add">
									<view class="add-line"></view>
									<view class="add-line rotate"></view>
								</view>
								<text class="add-text">相机</text>
							</view>
						</view>
						<list class="list">
							<cell v-for="(item, index) in orderMedias" :key="item.id">
								<view class="w-block list-wrapper">
									<view v-if="item.thumbnail" class="list-image-wrapper" @click="playVideo(index)">
										<image class="list-image" :src="item.thumbnail" />
										<text class="list-image-text">{{ Math.round(item.duration) }}</text>
									</view>
									<view v-else class="list-image-wrapper ">
										<image class="list-image" />
										<text style="text-align: center;">{{videoPublicStatus[item.status]}}</text>
									</view>
									<view class="list-info-wrapper" hover-class="none" hover-stop-propagation="false">
										<!-- <view v-if="isOwner&&isBaseOwnerUser" class="list-info-tilte"><input
												:value="item.name" :maxlength="128" :auto-blur="true"
												@blur="changeName" /></view>
										<view v-else class="list-info-tilte">
											<text>{{ item.name }}{{item.succorStatus?'('+item.succorStatus+')':''}}</text>
										</view> -->
										<text
											class="list-info-tilte">{{ item.name }}{{item.succorStatus?'('+item.succorStatus+')':''}}</text>
										<button v-if="isBaseOwnerUser" class="list-info-button" @click="toDelete(item)"
											:disabled="isDeleteArrayItem(item.id)">
											<text>{{isDeleteArrayItem(item.id) ? "已" : "" }}删除</text>
										</button>
										<button v-else class="list-info-button" @click="playVideo(index)">
											<text>播放</text>
										</button>
										<view class="list-info-des color-text2 font12" hover-class="none"
											hover-stop-propagation="false">
											<text>播放<text>{{ item.playNum }}</text></text>
											<text>·</text>
											<text>喜欢<text>{{ item.likeNum }}</text></text>
										</view>
									</view>
								</view>
							</cell>
							<cell v-if="orderMedias.length>orderMediasPageSize && !noData">
								<view class="loading-more">
									<loading-indicator style="margin-right:15px;"></loading-indicator>
									<text class="loading-more-text">加载中...</text>
								</view>
							</cell>
							<cell v-if="noData">
								<view class="loading-more">
									<text class="loading-more-text">没有更多数据了</text>
								</view>
							</cell>
						</list>
					</view>
				</van-tab>
				<van-tab title="简介">
					<view class="tab-content">
						<view>
							<view class="w-block">
								{{ animalInfo.intro || "无" }}
							</view>
							<view class="w-block feature-box">
								<view class="flex">
									<text class="color-text1 feature-name">外形</text>
									<w-breadcrumb :dataList="animalInfo.shapeDesc"></w-breadcrumb>
								</view>
								<view class="flex">
									<text class="color-text1 feature-name">性格</text>
									<w-breadcrumb :dataList="animalInfo.characterDesc"></w-breadcrumb>
								</view>
								<!-- <view class="warning-box" v-if="!animalInfo.isAdopted">等待领养<text
										v-if="animalInfo.sameOrigin">，仅限同城</text></view> -->
								<view v-if="animalInfo.sameOrigin" class="warning-box">等待领养，仅限同城</view>
								<view v-else-if="animalInfo.isAdopted===3" class="warning-box">目前不需要领养</view>
							</view>
						</view>
					</view>
				</van-tab>
			</van-tabs>
			<!-- 非本人 普通用户可操作 -->
			<view class="page-bottom-btns" v-if="!isBaseOwnerUser && appUserInfo.type == '0'">
				<button class="btn" type="primary" plain="true" @click="toDonate">
					<image class="donate-cake" src="/static/images/cake/cake.png" />
					送稀罕
				</button>
				<button v-if="animalInfo.isAdopted===0||animalInfo.isAdopted===null || animalInfo.isAdopted===1" type="primary" @click="toAdopt">
					申请领养
				</button>
			</view>
		</view>
	</view>
</template>
<script>
	// import wBreadcrumb from "../components/breadcrumb";
	const api = require("../../utils/api/animal");
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
				// baseId: 0, // 检测是否是动物所属基地，判断是否可以编辑
				id: 0, // 动物id
				indicatorDots: true,
				vertical: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				orderMediasPage: 0, // 默认起始页
				orderMediasPageSize: 10, // 每页视频大小
				active: 0,
				animalInfo: {
					tags: [{
						tag: "康复中",
						status: "1",
					}, ],
					status: ["已免疫", "已驱虫", "未绝育"],
					userID: 0,
					isAdopted: 0, // 默认为等待领养
					sameOrigin: 1, // 默认限同城领养，0为不限同城领养
				},
				orderMedias: {}, // 获取短视频播放列表
				orderResultMedias: {}, // 获取返回中间短视频
				focus: false, // 关注
				noData: false,
				orderMediasMaxPages: 0,
				deletStatusArray: [0], // 删除按钮默认显示MAP数组
			};
		},
		onReachBottom() {
			console.log("enter onReachBottom orderMediasMaxPages:", this.orderMediasMaxPages);
			if (this.orderMediasPage >= this.orderMediasMaxPages) {
				this.noData = true;
				return;
			}
			this.getAnimalOrderMedias();
			console.log("leave  onReachBottom!");
		},
		computed: {
			...mapState({
				appUserInfo: (state) => state.user.userInfo,
				videoPublicStatus: (state) => state.tags.videoPublicStatus,
			}),
			// 是否是动物所属的基地
			// isOwner() {
			// 	return this.animalInfo.baseId == this.baseId;
			// },
			// 是否是动物所属的基地管理者
			isBaseOwnerUser() {
				return this.animalInfo.userID == this.appUserInfo.id;
			},
		},
		methods: {
			initData() {
				console.log("enter initData appUserInfo!", this.appUserInfo);
				// 获得领养情况缓存
				// try {
				// 	const value = uni.getStorageSync('hasApplyAdopted');
				// 	if (value) {
				// 		console.log("getStorageSync sucess value:", value);
				// 		this.hasApplyAdopted = value;
				// 	}
				// } catch (e) {
				// 	console.log("getStorageSync fail!");
				// }
				this.getAnimalHomeInfo();
				this.getAnimalOrderMedias();
			},

			isDeleteArrayItem(id) {
				return this.deletStatusArray.includes(id);
			},
			getAnimalOrderMedias() {
				console.log("enter getAnimalOrderMedias!");
				this.orderMediasPage += 1;
				api.animalOrderMedias({
					animalId: this.id,
					current: this.orderMediasPage,
					size: this.orderMediasPageSize,
				}).then((res) => {
					console.log("enter return animalOrderMedias:", res);
					if (res.result && res.result.records && res.result.records.length > 0) {
						console.log("enter res copy orderMedias orderMediasPage:", this.orderMediasPage);
						if (this.orderMediasPage > 1) {
							this.orderResultMedias = res.result.records;
							for (let record in this.orderResultMedias) {
								this.orderMedias.push(this.orderResultMedias[record]);
							}
							console.log("leaving concatArrays orderResultMedias>1:", this.orderMedias);
						} else {
							this.orderMedias = res.result.records;
							console.log("leaving concatArrays orderResultMedias<1:", this.orderMedias);
						}
						this.orderMediasMaxPages = res.result.pages;
					} else {
						console.log("Medias is null in getAnimalOrderMedias!");
						this.noData = true;
					}
				});
			},
			getAnimalInfo() {
				api
					.getAnimalBasicInfo({
						animalId: this.id,
					})
					.then((res) => {
						console.log("enter getAnimalBasicInfo:", res);
					});
			},
			getAnimalHomeInfo() {
				api
					.getAnimalHomeInfo({
						animalId: this.id,
					})
					.then((res) => {
						console.log(res, "animal-homeInfo");
						this.animalInfo = res.result;
						this.animalInfo.shapeDesc = res.result.shapeDesc.split("/");
						this.animalInfo.characterDesc = res.result.characterDesc.split("/");
						this.animalInfo.healthStatus = res.result.healthStatus;
						this.animalInfo.succorStatus = res.result.succorStatus;
						this.animalInfo.userID = res.result.user.id;
						this.focus = res.result.focused;
						this.animalInfo.isAdopted = res.result.isAdopted;
						this.animalInfo.sameOrigin = res.result.sameOrigin;
					});
			},
			changeName: function(event) {
				const inputValue = event.target.value;
				if (inputValue && inputValue.length > 0) {
					api
						.changeName({
							animalId: this.id,
							name: inputValue,
						})
						.then((res) => {
							console.log("enter changeName res:", res);
						});
				}
			},
			// 去捐赠
			toDonate() {
				uni.navigateTo({
					url: "/subPackages/animal/donate?animalId=" + this.id + "&name=" + this.animalInfo.name,
				});
			},
			// 去领养
			toAdopt() {
				uni.navigateTo({
					url: "/subPackages/adopt/form?animalId=" +
						this.id +
						"&baseId=" +
						this.animalInfo.baseId +
						"&userId=" +
						this.animalInfo.userID,
				});
			},
			// 关注、取消
			toFocus() {
				this.focus = !this.focus;
				api
					.animalFocus({
						animalId: this.id,
					})
					.then((res) => {
						uni.showToast({
							title: this.focus ? "关注成功" : "取消关注",
						});
					});
			},
			// 去编辑
			toEdit() {
				console.log("enter animalEdit!");
				uni.navigateTo({
					url: "/subPackages/animal/animalEdit/newEdit?animalId=" + this.id + '&baseId=' + this
						.animalInfo.baseId + '&userId=' + this.animalInfo.userID,
				});
			},
			// 分享
			toShare() {
				console.log(this.animalInfo);
				uni.navigateTo({
					url: "./share?id=" + this.id + '&baseId=' + this.animalInfo.baseId,
				});
			},
			// 去动物基地
			toBase(id) {
				console.log("to-base", id);
				uni.navigateTo({
					url: "/subPackages/organization/details?id=" + id,
				});
			},
			onChange(event) {
				// uni.showToast({
				//   title: `切换到标签 ${event.detail.name}`,
				//   icon: "none",
				// });
			},

			// 添加视频动态 
			toAddVideo() {
				uni.navigateTo({
					url: "./animalEdit/VideoUpload?id=" + this.id + '&baseId=' + this.animalInfo.baseId +
						'&status=' + this
						.animalInfo.succorStatus + '&videoTypeflag=' + "1" + '&animalName=' + this.animalInfo.name,
				});
			},
			// 添加视频动态
			toCameraVideo() {
				uni.navigateTo({
					url: "./animalEdit/VideoUpload?id=" + this.id + '&baseId=' + this.animalInfo.baseId +
						'&status=' + this
						.animalInfo.succorStatus + '&videoTypeflag=' + "0" + '&animalName=' + this.animalInfo.name,
				});
			},
			splitToArray(val) {
				if (val) {
					return val.split('/')
				} else {
					return []
				}
			},
			// 删除动物的某个视频，在新拉数据列表时，再完全更新列表
			toDelete(item) {
				console.log("enter toDelete item:", item);
				uni.showModal({
					content: '确定删除【' + item.name + '】视频吗？',
					success: (e) => {
						// 确定删除
						if (e.confirm) {
							api.deletAnimalOneVideo({
								id: item.id
							}).then(res => {
								if (res.success) {
									this.deletStatusArray.push(item.id);
									console.log("show deletStatusArray:", this.deletStatusArray);
									uni.showToast({
										title: '删除成功'
									});
								} else {
									uni.showToast({
										title: '删除失败'
									});
								}
							})
						}
					},
				})
			},
			playVideo(index) {
				console.log("enter playVideo id:", index);
				// uni.setStorage({
				// 	key: "animalCurMediasList",
				// 	data: this.orderMedias,
				// });
				uni.navigateTo({
					url: "./animalEdit/VideoPic?id=" + this.id + '&videoId=' + index,
				});
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options, "animal-details");
			this.id = options.id;
			// this.baseId = options.baseId;
		},
		// 分享到聊天窗
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log("enter onShareAppMessage:", res.target)
			}
			return {
				title: this.animalInfo.name + '的故事分享',
				path: this.upShareFileUrl,
			}
		},
		onShow() {
			console.log(" enter onShow!");
			this.initData();
		}
	};
</script>


<style>
	/**index.wxss**/
	Page {
		padding-bottom: 112rpx;
	}

	.list {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		/* #ifndef APP-PLUS */
		display: flex;
		flex-direction: column;
		/* #endif */
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 14px;
		padding-bottom: 14px;
		text-align: center;
		flex-direction: row;
	}

	.loading-more-text {
		font-size: 14px;
		color: #999;
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

	.page-body-navbar .button-middle,
	.page-body-navbar .button-right {
		border: 1px solid #dbdbdc;
	}

	.page-body-info-block {
		background-color: #fff;
	}

	.page-body-info {
		font-size: 18px;
		display: flex;
		flex-direction: column;
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

	.user-age {
		font-size: 20rpx;
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

	.page-body-fence {
		display: flex;
		/* width: 343px; */
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 8px;
	}

	.page-body-fence view {
		width: 33.33%;
		text-align: center;
	}

	.page-body-fence .font-bold {
		margin-right: 8rpx;
	}

	.tab-content {
		padding: 16rpx;
		background-color: #f5f5f5;
	}

	.tab-content .list-wrapper {
		display: flex;
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

	.list-wrapper .list-image-text {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 28rpx;
		padding: 2rpx 4rpx;
		text-align: center;
		line-height: 28rpx;
		background: #000000;
		color: #fff;
		border-radius: 3px;
		opacity: 0.4;
		font-size: 10px;
		padding-left: 8rpx;
		padding-right: 8rpx;
	}

	.list-wrapper .list-info-wrapper {
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

	.list-wrapper .list-info-des {
		display: flex;
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

	.feature-box {
		font-size: 14px;
		color: #545966;
		line-height: 21px;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.feature-box .warning-box {
		margin-top: 10rpx;
	}

	.feature-name {
		font-weight: 600;
		margin-right: 32rpx;
	}

	.page-bottom-btns {
		padding: 30rpx 32rpx;
		position: fixed;
		background-color: #fff;
		box-shadow: 1px 1px 1px #000;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
	}

	.page-bottom-btns button {
		flex: 1;
		font-size: 16px;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20px;
		/* font-family: PingFangSC-Semibold, PingFang SC; */
	}

	.page-bottom-btns button+button {
		margin-left: 30rpx;
	}

	.donate-cake {
		width: 36rpx;
		height: 32rpx;
		margin-right: 8rpx;
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
		margin-left: 166px;
		padding: 0;
	}
</style>
