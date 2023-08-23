<template>
	<view class="edit-page">
		<uni-list>
			<view>
				<view>背景图</view>
				<view class="image-box-wrapper">
					<image @click="removeImage(index)" class="image-box" v-for="(item, index) in imageList" :src="item" mode="center"
						:key="index" />
					<view @click="chooseImage" class="is-add-container image-box">
						<view class="is-add">
							<view class="add-line"></view>
							<view class="add-line rotate"></view>
						</view>
						<text class="add-text">上传图片</text>
					</view>
				</view>
			</view>
			<uni-list-item title="头像" class="list-item__avator">
				<template slot="footer">
					<image class="slot-image" :src="userImage || defaultImage" mode="center"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="昵称" :rightText="formData.name" />
			<!-- <uni-list-item showArrow title="微信号" :rightText="formData.wxNumber" /> -->
			<uni-list-item showArrow title="微信号" clickable @click="onClick('wxNumber')"
				:rightText="formData.wxNumber" />
			<uni-list-item showArrow title="手机号" clickable @click="onClick('phone')" :rightText="formData.phone" />
		</uni-list>
		<view class="button-wrapper">
			<button @click="onConfirm">完成</button>
		</view>
	</view>
</template>

<script>
	const globalConst = require("../../utils/service");
	
	import api from "./../../utils/api/index";
	import appConfig from "../../config";
	import {
		mapState
	} from "vuex";
	import {
		isEmpty,
		getDate,
		chooseImageFormat,
	} from "../../utils/util";
	export default {
		components: {},
		data() {
			return {
				defaultImage: "/static/images/default_avator.png",
				userImage: "",
				imageList: [],
				formData: {
					imageIds: [],
					avator: "", // 头像
					name: "", // 名称
					sex: "", // 性别
					wxNumber: "", // 微信号
					phone: "", // 手机号
					isEdit: false,
				},
				formItemPlaceHolder: {
					name: "昵称",
					phone: "手机号",
				},
				uploadUrl:globalConst.baseUrl,
			};
		},
		computed: {
			...mapState({
				appUserInfo: (state) => state.user.userInfo,
			}),
		},
		methods: {
			onClick(key) {
				// uni.showToast({
				//   title: "点击反馈",
				// });
				uni.navigateTo({
					url: "/pages/user/editFormItem",
				});
				this.formData.isEdit = true;

				this.formData.editItem = {
					placeholder: this.formItemPlaceHolder[key],
					key: key,
					type: ["description"].includes(key) ? "textarea" : "text",
				};
				console.log(this.formData, key);

				uni.navigateTo({
					url: "./editFormItem",
				});
				// :to="`./editFormItem`"
			},
			// 获取用户其他信息
			getUserInfo() {
				api.getUserInfo().then((res) => {
					console.log("用户信息", res);
					for (let key in this.formData) {
						this.formData[key] = res.result[key];
					}
					console.log("enter getUserInfo formData|appUserInfo:", this.formData, this.appUserInfo);
					if (!this.formData.name) {
						this.formData.name = this.appUserInfo.nickName;
					}
					if (!this.userImage) {
						this.userImage = this.appUserInfo.headImgUrl;
					}
					if (this.formData.imageIds.length) {
						this.imageList = [];
						this.formData.imageIds.forEach((item) => {
							this.imageList.push(item);
						});

					}
					console.log(this.imageList);
					// this.imageList = this.formData.imageIds || [];
				});
			},
			removeImage(index) {
				this.imageList.splice(index, 1);
				this.formData.imageIds.splice(index, 1);
			},
			// 选择背景图
			chooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: (res) => {
						console.log(res);
						res.tempFiles.forEach((item) => {
							let resSize = item.size;
							if (resSize > 10485760) {
								uni.showToast({
									title: "上传的图片大小不超过10M",
									icon: "none",
									duration: 2000,
									mask: true,
								});
								return;
							}
							//限制图片类型以及过滤git图
							// let resType = item.path.slice(-3).toLowerCase();
							// const imageTypeList = ['bmp', 'png', 'jpg'];
							// if (!imageTypeList.includes(resType)) {
							// 	uni.showToast({
							// 		title: "图片必须是bmp, png或jpg类型",
							// 		icon: "none",
							// 		duration: 2000,
							// 		mask: true,
							// 	});
							// 	return;
							// }
							if(!chooseImageFormat(item.path))
							{
								console.log("wrong picture path",item.path);
								return;
							}
							this.imageList.push(item.path);
							const curUrl = this.uploadUrl + "/upload/user/image";
							console.log("current url:",curUrl);
							uni.uploadFile({
								url: curUrl,
								filePath: item.path,
								header: {
									"Access-Token": this.$store.state.user.token,
								},
								name: "image",
								success: (uploadFileRes) => {
									console.log(uploadFileRes);
									let data = JSON.parse(uploadFileRes.data);
									this.formData.imageIds.push(appConfig.baseImageUrl +
										data.result);
								},
							});
						});
					},
				});
			},
			// 选择头像
			chooseAvator() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: (res) => {
						console.log(res);
						res.tempFiles.forEach((item) => {
							let resSize = item.size;
							if (resSize > 10485760) {
								uni.showToast({
									title: "上传的图片大小不超过10M",
									icon: "none",
									duration: 2000,
									mask: true,
								});
								return;
							}
							//限制图片类型以及过滤git图
							let resType = item.path.slice(-3).toLowerCase();
							const imageTypeList = ['bmp', 'png', 'jpg'];
							if (!imageTypeList.includes(resType)) {
								uni.showToast({
									title: "图片必须是bmp, png或jpg类型",
									icon: "none",
									duration: 2000,
									mask: true,
								});
								return;
							}
							this.userImage = item.path;
							const curUrl = this.uploadUrl + "/upload/user/image";
							console.log("current url:",curUrl);
							uni.uploadFile({
								url: curUrl,
								filePath: item.path,
								header: {
									"Access-Token": this.$store.state.user.token,
								},
								name: "image",
								success: (uploadFileRes) => {
									console.log(uploadFileRes);
									let data = JSON.parse(uploadFileRes.data);
									this.formData.headImageId = appConfig.baseImageUrl +
										data.result;
								},
							});
						});
					},
				});
			},
			onConfirm() {
				console.log("完成", this.formData);
				api
					.updateUserBasicInfo({
						imageIds: this.formData.imageIds,
						phone: this.formData.phone,
						wxNumber: this.formData.wxNumber,
					})
					.then((res) => {
						console.log("更新信息", res);
						uni.showToast({
							title: "更新成功",
							duration: 2000,
						});
						try {
							// 触发前一页的更新
							let pages = getCurrentPages(); //获取所有页面栈实例列表
							// let nowPage = pages[ pages.length - 1];  //当前页页面实例
							let prevPage = pages[pages.length - 2]; //上一页页面实例
							prevPage.$vm.$refs.userRef.getUserInfo();
						} catch (e) {
							console.log(e);
						}
						// prevPage.$vm.searchVal = 1211;   //修改上一页data里面的searchVal参数值为1211
						setTimeout(() => {
							// getCurrentPages()
							uni.navigateBack({
								delta: 1,
							});
						}, 2000);
					});
			},
		},

		mounted() {
			this.getUserInfo();
		},
		onShow() {
			console.log("show");
			// 展示编辑信息
			// 如果正在编辑就不请求接口
			if (this.formData.isEdit) {
				uni.getStorage({
					key: "userFormData",
					success: (res) => {
						console.log("edit", res.data);
						this.formData = res.data;
					},
				});
			}
		},
		onHide() {
			console.log("hide");
			uni.setStorage({
				key: "userFormData",
				data: this.formData,
			});
		},
		onLoad() {
			console.log("load");
		},
		onUnload() {
			console.log("unload");
			uni.removeStorage({
				key: "userFormData",
			});
		},
	};
</script>

<style>
	@charset "UTF-8";

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}

	/* #endif */
	.uni-list::before,
	.uni-list::after,
	.uni-list--border-top {
		display: none;
	}

	.edit-page {
		padding: 16rpx 32rpx;
		background-color: #fff;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.list-item__avator {
		line-height: 80rpx;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		width: 96rpx;
		height: 96rpx !important;
		border-radius: 50%;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}

	.button-wrapper {
		margin: 16rpx 0;
	}

	.button-wrapper button {
		color: #fff;
		font-size: 16px;
		width: 686rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #64c8b3;
		border-radius: 40rpx;
	}

	uni-list-item {
		position: relative;
	}

	uni-list-item[data-required="true"]::before {
		content: "*";
		color: #ff4a4a;
		position: absolute;
		top: 50%;
		margin-right: 6rpx;
		transform: translateY(-50%);
		left: 0;
		z-index: 1;
	}

	uni-list-item .uni-list-item__container {
		padding-left: 0rpx !important;
	}

	uni-list-item[data-required="true"] .uni-list-item__container {
		padding-left: 20rpx !important;
	}

	.image-box-wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.image-box {
		width: 218rpx;
		height: 218rpx;
		background: #f7f7f7;
		border-radius: 8px;
		margin: 4rpx;
	}
</style>
