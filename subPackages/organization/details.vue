<template>
	<view class="container">
		<view class="page-header">
			<view class="page-section page-section-spacing swiper">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					style="height: 345rpx;">
					<block v-for="(item, index) in orgHomeData.imageIds" :key="index">
						<swiper-item class="swiper-item">
							<!-- <view class="image_wrapper"> -->
							<image bindtap="tapBanner" :data-id="item" :src="item" :mode="center" class="slide-image" />
							<!-- </view> -->
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="page-body">
			<image class="avatar" :src="orgHomeData.headImgUrl" mode="center" />
			<view class="w-block page-body-info-block">
				<view class="page-body-navbar" hover-class="none" hover-stop-propagation="false">
					<button v-if="isSelf" @click="toEdit" class="button-middle" size="mini" type="default">
						<text>编辑</text>
					</button>
					<button v-else @click="toFocus" class="button-middle" size="mini"
						:type="orgHomeData.focused ? 'default' : 'primary'">
						<text v-if="!orgHomeData.focused" class="iconfont icon-add"></text>
						<text>{{ orgHomeData.focused ? "已" : "" }}关注</text>
					</button>
					<button @click="toShareBase" class="button-right color-text3" size="mini" type="default">
						<text class="iconfont icon-share">分享</text>
					</button>
				</view>
				<view class="page-body-info">
					<view class="page-body-user">
						<text class="user-name">{{orgHomeData.name}}</text>
						<view class="user-help">
							<icon class="w-icon w-icon-medium icon-cat"></icon>
							<text style="margin-right: 16rpx;"><text
									style="margin-left: 2rpx;">{{orgHomeData.dogNum}}</text>汪汪</text>
							<icon class="w-icon w-icon-medium icon-dog"></icon>
							<text><text style="margin-left: 2rpx;">{{orgHomeData.catNum}}</text>喵喵</text>
						</view>
					</view>
					<view class="page-body-fence default-box bg-gray2" hover-class="none"
						hover-stop-propagation="false">
						<view class="fence-container">
							<text class="font-bold">{{orgHomeData.canNum}}</text>
							<text class="font12 color-text2">稀罕</text>
						</view>
						<view class="fence-container">
							<text class="font-bold">{{orgHomeData.followNum}}</text>
							<text class="font12 color-text2">关注</text>
						</view>
						<view class="fence-container">
							<text class="font-bold">{{orgHomeData.fanNum}}</text>
							<text class="font12 color-text2">粉丝</text>
						</view>
					</view>
				</view>
			</view>
			<van-tabs :active="active" @change="onChange">
				<van-tab title="毛孩子">
					<view class="tab-content">
						<view v-if="isSelf" class="w-block list-wrapper" @click="toAddAnimal">
							<view class="is-add-container add-box">
								<view class="is-add">
									<view class="add-line"></view>
									<view class="add-line rotate"></view>
								</view>
								<text class="add-text">新增</text>
							</view>
						</view>
						<block v-for="(item, index) in reverseAnimalBriefs" :key="index">
							<view class="w-block list-wrapper">
								<view class="list-image-wrapper">
									<image class="list-image" :src="item.headImageId" @click="toAnimalDetails(item)" />
								</view>
								<view class="list-info-wrapper" hover-class="none" hover-stop-propagation="false">
									<view class="list-info-top">
										<text class="list-info-tilte">{{ item.name }}</text>
										<text :class="{
                        'list-info-tag': true,
                      }">{{ item.succorStatus }}</text>
									</view>

									<view class="list-info-age">
										<text style="margin-right: 3rpx;">{{ item.age }}</text>
										<text v-if="item.succorTime">{{ item.succorTime}}救助</text>
									</view>
									<view class="list-info-cake color-warning">
										<image class="user-cake" src="/static/images/cake/cake.png" />
										<text class="cakes">收到稀罕</text>·
										<text>{{ item.canNum }}</text>
									</view>
								</view>
								<view>
									<button class="list-info-button" @click="toAnimalDetails(item)">
										成长记录
									</button>
									<button v-if="isSelf" class="list-info-button"
										@click="toDelete(item, index)">删除</button>
								</view>
							</view>
						</block>
						<view class="loading-more">
							<text class="loading-more-text">没有更多数据了</text>
						</view>
					</view>
				</van-tab>
				<van-tab title="领养与答疑">
					<view class="tab-content">
						<view class="faq-body">
							<view v-if="isSelf" class="w-block list-wrapper" @click="toAddFaq">
								<view class="is-add-container add-box">
									<view class="is-add">
										<view class="add-line"></view>
										<view class="add-line rotate"></view>
									</view>
									<text class="add-text">新增</text>
								</view>
							</view>
							<view class="w-block">
								{{ baseInfo.intro || "无" }}
							</view>
							<uni-card v-for="(item, index) in orgHomeData.baseQas" :key="item.id" :title="item.ask"
								note="Tips">
								<text class="content-box-text">{{ item.answer }}</text>
								<block v-if="isSelf" slot="footer">
									<view class="footer-box">
										<view class="footer-box__item" @click="onEdit(item, index)">编辑</view>
										<view class="footer-box__item" @click="onDelete(item, index)">删除</view>
									</view>
								</block>
							</uni-card>
						</view>
					</view>
				</van-tab>
				<van-tab v-if="isSelf&&animalApllies.length>0" title="领养申请">
					<view class="tab-content">
						<block v-for="(item, index) in animalApllies" :key="index">
							<view class="w-block list-wrapper">
								<view class="list-image-wrapper">
									<image class="list-image" :src="animalAplliesBaseInfos[index].headImageId" />
								</view>
								<view class="list-info-wrapper">
									<view class="list-info-top">
										<text class="list-info-tilte">{{ animalAplliesBaseInfos[index].name }}</text>
										<text
											class="list-info-tag" style="color:#64c8b3">{{ item.isAdopted==0 ? "待领养" : "已领养"}}</text>
									</view>
									<view class="list-info-middle">
										<text>领养人 {{item.nickName}}</text>
										<button class="list-info-button" style="margin-right: 0rpx;"
											@click="toAnimalAdoptDetails(item)">申请详情</button>
									</view>
									<view class="list-info-botton">
										<text>{{item.updateTime}}</text>
									</view>
								</view>
							</view>
						</block>
						<view v-if="noData" class="loading-more">
							<text class="loading-more-text">没有更多数据了</text>
						</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
	</view>
</template>
<script>
	const api = require("../../utils/api/organization");
	const animalApi = require("../../utils/api/animal");
	const util = require("../../utils/api/index");
	import {
		mapState
	} from "vuex";
	import {
		isEmpty,
	} from "../../utils/util";
	export default {
		name: "Details",
		data() {
			return {
				baseId: 0,
				indicatorDots: true,
				vertical: false,
				autoplay: false,
				interval: 2000,
				duration: 500,

				active: 0,
				baseInfo: {},
				orgHomeData: {
					//	基地动物列表	array	动物简介信息
					animalBriefs: [],
					//	基地答疑列表	array	基地领养答疑
					baseQas: [],
					canNum: 0, //	稀罕数量	integer(int32)
					catNum: 0, //	基地猫数量	integer(int32)
					dogNum: 0, //	基地狗数量	integer(int32)
					fanNum: 0, //	粉丝数量	integer(int32)
					focused: false, //	该基地是否被当前用户关注	boolean
					followNum: 0, //	关注数量	integer(int32)
					headImgUrl: "", //	基地头像，使用负责人的微信头像	string
					id: 0, //  基地的主键ID	integer(int64)
					imageIds: [], //	用户背景图片数组	array	string
					name: "名称", //	基地名称	string
					userId: "0",
					deleteStatus: [], // 动物删除状态标记
				},
				animalApllies: [], // 获取动物领养申请列表
				applyListCur: 0,   // 当前页面索引启始页
				applyListSize: 10, // 当前页面的大小
                applyPageCount:0,  // 页面的数目
				animalAplliesBaseInfos: [], // 获取对应动物领养申请列表的动物基础信息
				noData: false,
				
				upShareFileUrl:"", 			// 分享链接地址
				baseName:"",				// 基地名称
			};
		},
		computed: {
			...mapState({
				appUserInfo: (state) => state.user.userInfo,
			}),
			// 是否是本组织
			isSelf() {
				console.log("enter isSelf this.orgHomeData.userId === this.appUserInfo.id:", this.orgHomeData.userId, this
					.appUserInfo.id);
				return this.orgHomeData && this.orgHomeData.userId === this.appUserInfo.id;
			},
			// 获取动物数据
			reverseAnimalBriefs() {
				if (this.orgHomeData && this.orgHomeData.animalBriefs) {
					return this.orgHomeData.animalBriefs.reverse();
				}
			},
		},
		methods: {
			async initData() {
				await this.getOrgHomeInfo();
				await this.getOrgInfo();
				if (!isEmpty(this.orgHomeData) && (this.orgHomeData.userId === this.appUserInfo.id)) {
					console.log("before getAnimalApllies!");
					this.getAnimalApllies();
					this.baseName = this.orgHomeData.name;
					this.upShareFileUrl = "/subPackages/organization/share?baseId=" + this.orgHomeData.id + "&name=" + this.orgHomeData.name;
				}
			},
			
			onReachBottom() {
				console.log("enter onReachBottom applyListCur:", this.applyListCur);
				if (this.applyListCur >= this.applyPageCount) {
					this.noData = true;
					console.log("leave  onReachBottom noData:",this.noData);
					return;
				}
				this.getAnimalApllies();
			},
			
			// 获取动物领养申请列表
			async getAnimalApllies() {
				console.log("in getAnimalApllies!");
				this.applyListCur+=1;
				await util.getAdoptListOnBase({
						baseId: this.baseId,
						current: this.applyListCur,
						size: this.applyListSize,
					})
					.then((res) => {
						console.log("getAnimalApllies is success:", res);
						// 若已经存在数据，则加入新结果
						if (!isEmpty(res.result) && res.result.records.length > 0) {
							this.applyPageCount = res.result.pages;
							
							if (!isEmpty(this.animalApllies) && this.animalApllies.length > 0) {
								var appliesMedias = res.result.records;
								for (let index in appliesMedias) {
									this.animalApllies.push(appliesMedias[index]);
									this.getApllyAnimalInfos(appliesMedias[index].animalId);
								}
								console.log("now animalApllies and animalAplliesBaseInfos counts:", this.animalApllies.length,this.animalAplliesBaseInfos.length);
								
							} else {
								this.animalApllies = res.result.records;
								for (let index in this.animalApllies) {
									this.getApllyAnimalInfos(this.animalApllies[index].animalId);
								}
							}
						} else {
							console.log("getAnimalApllies's records is null!");
							this.noData = true;
						}
					});
			},
			// 获取申请动物基本信息
			async getApllyAnimalInfos(animalId)
			{
					console.log("getApllyAnimalInfos!");
					
					await animalApi.getAnimalBasicInfo({
						animalId: animalId
					}).then(
						(res) => {
							console.log("getAnimalBasicInfo is success:", res);
							if (!isEmpty(res.result) && !isEmpty(res.result.animal)) {
								this.animalAplliesBaseInfos.push(res.result.animal);
							} else {
								console.log(" animalAplliesBaseInfos not add current animal!");
								this.animalAplliesBaseInfos.push(null);
							}
						});
			},
			// 获取首页信息--基地
			async getOrgHomeInfo() {
				console.log("getBaseHomeInfo!");
				console.log(this.baseId);
				await api.getBaseHomeInfo({
						baseId: this.baseId,
					})
					.then((res) => {
						console.log("getBaseHomeInfo is success:", res);
						this.orgHomeData = res.result;
						this.orgHomeData.imageIds = res.result.imageIds.map(item => item);
					});
			},
			
			// 获取信息--基地
			getOrgInfo() {
				console.log("getBaseInfo");
				api
					.getBaseInfo({
						baseId: this.baseId,
					})
					.then((res) => {
						console.log("getBaseInfo is success:", res);
						this.baseInfo = res.result;
					});
			},
			// 动物详情
			toAnimalDetails(item) {
				uni.navigateTo({
					url: "/subPackages/animal/details?id=" + item.id + '&baseId=' + this.baseId,
				});
			},
			// 动物领养详情
			async toAnimalAdoptDetails(item) {
				uni.navigateTo({
					url: "/subPackages/organization/adoptDetail?applyId=" + item.id +'&bFromMessage=false',
				});
			},
			// 删除动物
			toDelete(item, index) {
				console.log(item, index);
				uni.showModal({
					content: '确定删除动物【' + item.name + '】吗？',
					success: (e) => {
						// 确定删除
						if (e.confirm) {
							animalApi.deleteAnimal({
								animalId: item.id
							}).then(res => {
								if (res.success) {
									this.getOrgHomeInfo();
									uni.showToast({
										title: '删除成功'
									})
								} else {
									uni.showToast({
										title: '删除失败'
									})
								}
							})
						}
					},
				})
			},
			// 添加动物
			toAddAnimal() {
				uni.navigateTo({
					url: '/subPackages/animal/animalEdit/newEdit?baseId=' + this.baseId
				});
			},
			onChange(event) {
			},
			// 关注或取消？？ 目前没有取消
			toFocus() {
				this.orgHomeData.focused = !this.orgHomeData.focused;

				api.baseFocus({
					baseId: this.baseId
				}).then(res => {
					if (res.success) {
						uni.showToast({
							title: this.orgHomeData.focused ? "关注成功" : "取消关注",
						});
					} else {
						uni.showToast({
							title: '操作失败'
						})
					}
				})
			},
			// 去编辑
			toEdit() {
				uni.navigateTo({
					url: "/subPackages/organization/editForm?organizationId=" + this.orgHomeData.id,
				});
			},
			// 添加答疑
			toAddFaq() {
				// 没有id 使用序号进行编辑
				uni.navigateTo({
					url: `./faqEdit?baseId=${this.orgHomeData.id}`,
				});
			},
			// 编辑问题
			onEdit(item, index) {
				console.log(item, index);
				// 没有id 使用序号进行编辑
				uni.navigateTo({
					url: `./faqEdit?index=${index}&baseId=${this.orgHomeData.id}`,
				});
			},
			// 删除问题
			onDelete(item, index) {
				let _this = this;
				uni.showModal({
					title: "提示",
					content: "确定删除此答疑吗？",
					success: function(res) {
						if (res.confirm) {
							// 没有删除接口，使用全部问题重新保存的方式
							let list = JSON.parse(JSON.stringify(_this.orgHomeData.baseQas));
							list.splice(index, 1);
							console.log("list", list);
							api
								.postFaqItem({
									baseId: _this.baseId,
									list: list,
								})
								.then((res) => {
									console.log("删除结果", res);
									if (res.code === 200) {
										_this.orgHomeData.baseQas.splice(index, 1);
										uni.showToast({
											title: "删除成功",
											icon: "success",
											duration: 2000,
										});
									}
								});
						} else if (res.cancel) {
							uni.showToast({
								title: "取消删除",
								// icon: "success",
								duration: 2000,
							});
						}
					},
				});
			},
			// 去分享基地
			toShareBase() {
				console.log("enter shareBase!");
				uni.navigateTo({
					url: `./share?baseId=${this.orgHomeData.id}&name=${this.orgHomeData.name}`,
				});
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		mounted: function() {
			this.initData();
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options, "organ-options");
			if (options.id) {
				this.baseId = options.id;
			}
		},
		
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
		//发送到朋友圈，微信没有完全开放功能
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

	.swiper-item .slide-image {
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

	.page-body-navbar .button-middle,
	.page-body-navbar .button-right {
		border-radius: 18px;
		font-size: 12px;
		height: 72rpx;
		line-height: 72rpx;
		border: 1rpx solid #dbdbdc;
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
		flex-direction: column;
	}

	.page-body-user .user-name {
		font-size: 18px;
		font-weight: 600;
		color: #303741;
	}

	.user-help {
		font-size: 12px;
		font-weight: 400;
		color: #545966;
		margin-bottom: 17rpx;
	}

	.user-healthy {
		padding: 2rpx 10rpx;
	}

	.page-body-fence {
		display: flex;
		/* width: 343px; */
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 8px;
	}

	.page-body-fence .fence-container {
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

	.list-wrapper .list-info-top {
		display: flex;
		flex-direction: row;
	}

	.list-wrapper .list-info-tag {
		font-size: 10px;
		margin-left: 14rpx;
	}

	.list-wrapper .list-info-middle {
		display: flex;
		flex-direction: row;
		font-size: 12px;
		margin-top: 8px;
		color: #9ba1aa;
	}

	.list-wrapper .list-info-age {
		color: #545966;
	}

	.list-wrapper .list-info-cake {
		font-size: 14px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
	}

	.list-wrapper .list-info-cake .cakes {
		margin-left: 4rpx;
	}

	.list-wrapper .list-info-cake .user-cake {
		width: 36rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}

	.list-wrapper .list-info-botton {
		display: flex;
		flex-direction: row;
		margin-top: 8rpx;
		color: #9ba1aa;
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
		padding: 0;
	}

	.apply-button {
		margin-right: 0rpx;
	}

	.list-info-button+.list-info-button {
		margin-top: 8rpx;
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

	.faq-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
	}

	.uni-card {
		margin: 0 0 16rpx !important;
		padding: 32rpx 32rpx 0;
		border-radius: 8px;
	}

	.uni-card__header {
		padding: 0 !important;
	}

	.uni-border-bottom:after {
		display: none;
	}

	.uni-card__header-title-text {
		font-size: 14px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303741;
		position: relative;
		padding-left: 20rpx;
	}

	.uni-card__header-title-text::before {
		content: "";
		position: absolute;
		left: 0;
		top: 20rpx;
		height: 30rpx;
		width: 4rpx;
		background-color: #64c8b3;
	}

	.uni-card__content {
		padding: 0 0 40rpx 0 !important;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9ba1aa;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.content-box-text {
		color: #9ba1aa;
	}

	.uni-card__footer {
		padding: 0 !important;
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

	.page-bottom-btns {
		z-index: 99;
		padding: 16rpx 32rpx;
		position: fixed;
		background-color: #fff;
		box-shadow: 1px 1px 1px #000;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
	}

	.page-bottom-btns .bottom-btn {
		flex: 1;
		font-size: 16px;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20px;
		/* font-family: PingFangSC-Semibold, PingFang SC; */
	}

	.page-bottom-btns .bottom-btn+.bottom-btn {
		margin-left: 30rpx;
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
</style>
