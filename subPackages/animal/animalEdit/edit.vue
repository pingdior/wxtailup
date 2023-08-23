<template>
	<view class="w-page page-animal-edit">
		<uni-list>
			<view>
				<view>背景图</view>
				<view class="image-box-wrapper">
					<image @click="removeImage(index)" class="image-box" v-for="(item, index) in imageList" :src="item"
						:key="index" />
					<view @click="chooseImage" class="is-add-container image-box">
						<view class="is-add">
							<view class="add-line"></view>
							<view class="add-line rotate"></view>
						</view>
						<text class="add-text">上传横向图片</text>
					</view>
				</view>
			</view>
			<uni-list-item showArrow title="头像" data-required="true" class="list-item__avator">
				<template slot="footer">
					<image class="slot-image" :src="headImageId || defaultImage" mode="widthFix" @click="chooseAvator">
					</image>
				</template>
			</uni-list-item>
			<uni-list-item showArrow title="昵称" clickable @click="onClick('name')" :rightText="formData.name"
				data-required="true" />
			<uni-list-item showArrow title="种类" clickable @click="onClick('type')"
				:rightText="animalTypes[formData.type].label" data-required="true" />
			<uni-list-item showArrow title="身份号" clickable @click="onClick('identityCode')"
				:rightText="formData.identityCode"  />
			<uni-list-item showArrow title="年龄" clickable @click="onClick('age')" :rightText="formData.age"
				data-required="true" />
			<uni-list-item showArrow title="性别" clickable @click="onClick('sex')"
				:rightText="animalSex[formData.sex].label" data-required="true" />
			<uni-list-item showArrow title="来基地日期" clickable @click="onClick('succorTime')"
				:rightText="formData.succorTime" data-required="true" />
			<uni-list-item showArrow title="当前状态(单选)" clickable @click="onClick('succorStatus')"
				:rightText="formData.succorStatus" data-required="true" />
			<uni-list-item showArrow title="常规医疗" clickable @click="onClick('healthStatus')"
				:rightText="formData.healthStatus" />
			<uni-list-item showArrow title="外形" clickable @click="onClick('shapeDesc')"
				:rightText="formData.shapeDesc" />
			<uni-list-item showArrow title="性格" clickable @click="onClick('characterDesc')"
				:rightText="formData.characterDesc" />
			<uni-list-item showArrow title="是否限制本地领养" clickable @click="onClick('sameOrigin')"
				:rightText="sameOrigin.find((i) => i.id === formData.sameOrigin).label" />
			<uni-list-item showArrow title="简介" clickable @click="onClick('intro')" :rightText="formData.intro"
				data-required="true" />
		</uni-list>
		<view class="button-wrapper">
			<button @click="onConfirm">完成</button>
		</view>
	</view>
</template>

<script>
	const api = require("../../../utils/api/animal");
	const globleConst = require("../../../utils/service");
	
	import appConfig from "../../../config";
	import {
		mapState
	} from "vuex";
	import {
		isEmpty
	} from "../../../utils/util";
	export default {
		components: {},
		data() {
			return {
				animalId: "",
				baseId: "", // 基地id
				defaultImage: "/static/images/default_avator.png",
				imageList: [],
				imageIds: [],
				formData: {
					age: 0, //	年龄		false	 integer
					baseId: "", //	基地ID		false integer
					characterDesc: "", //	性格介绍，性格标签组成的字符串,多个/分割		false	 string
					headImageId: "", //	存储在CDN上的文件ID,动物头像		false	string
					healthStatus: "", //	健康状态，健康标签组成的字符串,多个用/分割		false	string
					id: "", //	动物ID，更新时不能为null		false	 integer
					identityCode: "", // 动物身份号，对外ID，WBQ三个首字母打头，更新时不能为null  false  integer
					intro: "", //	动物救助过程和现状介绍		false	 string
					isAdopted: 0, //	是否被领养 3 不需要领养 2 已被领养 1 正被申请领养 0 等待领养	false	 integer
					name: "", //	昵称		false	 string
					sameOrigin: 1, //	是否限制本地领养 1 是 0 否		false	 integer
					sex: 0, //	公 1，母 0		false	 integer
					shapeDesc: "", //	外形介绍，外形标签组成的字符串,多个/分割		false	 string
					succorStatus: "", //	当前状态（单选），救助标签组成的字符串		false	 string
					succorTime: "", //	救助时间		false	 string
					type: 0, //	动物种类 0 猫 1 狗		false	integer


					isDelete: false,
					isEdit: false,
					petId:"",
				},
				formItemPlaceHolder: {
					name: "昵称",
					intro: "简介",
					age: "年龄",
					sex: "性别",
					identityCode: "身份号",
					healthStatus: "常规医疗",
					succorTime: "来基地日期",
					succorStatus: "当前状态(单选)",
					shapeDesc: "外形",
					characterDesc: "性格",
					sameOrigin: "只限本地领养",
					type: "动物种类",
					isAdopted:"等待领养",
				},
				uploadFileUrl:globleConst.baseUrl, // 上传地址
			};
		},
		computed: {
			...mapState({
				animalSex: (state) => state.tags.animalSex, // 动物性别
				animalTypes: (state) => state.tags.animalTypes, // 动物类型
				// sameOrigin: (state) => state.tags.sameOrigin, // 是否限制本地领养
				// isAdopted: (state) => state.tags.isAdopted, // 是否被领养
			}),
			headImageId() {
				if (this.formData.headImageId) {
					return this.formData.headImageId;
				}
			},
		},
		methods: {
			initData() {
				console.log("获取动物信息");
				api
					.getAnimalHomeInfo({
						animalId: this.animalId,
					})
					.then((res) => {
						console.log(res);
						this.imageIds = res.result.imageIds;
						this.imageIds.forEach((item) => {
							this.imageList.push(item);
						});
						this.formData = res.result;
						this.formData.id = this.animalId;
						// 补充动物身份号赋值
						this.formData.identityCode = res.result.identityCode;
						this.formData.petId = res.result.petId;
						this.formData.sameOrigin = res.result.sameOrigin;
						this.formData.isAdopted = res.result.isAdopted;
						// this.formData.characterDesc = res.result.characterDesc.split('/');
						// this.formData.healthStatus = res.result.healthStatus.split('/');
						// this.formData.shapeDesc = res.result.shapeDesc.split('/');
						// this.formData.succorStatus = res.result.succorStatus.split('/');
					});
			},
			onClick(key) {
				// uni.showToast({
				//   title: "点击反馈",
				// });
				// uni.navigateTo({
				//   url: "subPackages/organization/editFormItem",
				// });
				this.formData.isEdit = true;

				this.formData.editItem = {
					placeholder: this.formItemPlaceHolder[key],
					key: key,
					type: this.getInputType(key),
				};
				console.log(this.formData, key);

				uni.navigateTo({
					url: "./editFormItem",
				});
				// :to="`./editFormItem`"
			},
			getInputType(key) {
				if (["age"].includes(key)) return "number";
				if (["identityCode"].includes(key)) return "camera";
				if (["succorTime"].includes(key)) return "date";
				if (
					["characterDesc", "healthStatus", "shapeDesc", "succorStatus"].includes(
						key
					)
				)
					return "tags";
				if (["intro"].includes(key)) return "textarea";
				if (["isAdopted", "sameOrigin", "sex", "type"].includes(key))
					return "picker";
				return "input";
			},
			// 移除单个背景图
			removeImage(index) {
				this.imageList.splice(index, 1);
				this.imageIds.splice(index,1);
			},
			// 选择背景图
			chooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: (res) => {
						console.log("enter chooseImage sucess:",res);
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
							this.imageList.push(item.path);
							const currentUrl = this.uploadFileUrl+"/upload/animal/image"
							uni.uploadFile({
								url: currentUrl,
								filePath: item.path,
								header: {
									"Access-Token": this.$store.state.user.token,
								},
								name: "image",
								success: (uploadFileRes) => {
									console.log(uploadFileRes);
									if(uploadFileRes.statusCode ===200)
									{
										let data = JSON.parse(uploadFileRes.data);
										this.imageIds.push(appConfig.baseImageUrl + data
											.result);
									}
									else
									{
										console.log("uploadFileRes fail statuCode:",uploadFileRes.statusCode);
									}
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
						console.log("enter chooseAvator res:",res);
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
							const currentUrl = this.uploadFileUrl+"/upload/animal/image"
							console.log("enter chooseAvatar tempath,currentUrl,appConfig.baseImageUrl:",this.userImage,currentUrl,appConfig.baseImageUrl);
							uni.uploadFile({
								url: currentUrl,
								filePath: item.path,
								header: {
									"Access-Token": this.$store.state.user.token,
								},
								name: "image",
								success: (uploadFileRes) => {
									console.log("chooseAvator uploadFile success:",uploadFileRes);
									if(uploadFileRes.statusCode === 200)
									{
										let data = JSON.parse(uploadFileRes.data);
										this.formData.headImageId =
											appConfig.baseImageUrl + data.result;
									}
									else
									{
										console.log("uploadFileRes fail statuCode:",uploadFileRes.statusCode);
									}
								},
								// fail: (f) => {
								// 	console.log("upload fail", f);
								// },
							});
						});
					},
					// fail: (fail) => {
					// 	console.log("choose fail", fail);
					// },
				});
			},
			onConfirm() {
				if (this.checkEmptyForm()) {
					return;
				}
				console.log("完成", this.formData);
				this.formData.baseId = this.baseId;
				api
					.postAnimalBasicInfo({
						animal: this.formData,
						imageIds: this.imageIds,
					})
					.then((res) => {
						let message = "新增成功";
						if (this.formData.id) {
							message = "修改成功";
						}
						uni.showToast({
							duration: 2000,
							title: message,
						});
						console.log("postAnimalBasicInfo result",res);
						setTimeout(() => {
							try {
								// 触发前一页的更新
								let pages = getCurrentPages(); //获取所有页面栈实例列表
								// let nowPage = pages[ pages.length - 1];  //当前页页面实例
								let prevPage = pages[pages.length - 2]; //上一页页面实例
								prevPage.$vm.initData();
								// prevPage.$vm.$refs.userRef.getUserHomeInfo();
							} catch (e) {
								console.log(e);
							}
							uni.navigateBack({
								delta: 1,
							});
						}, 2000);
					});
			},
			// 检查是否有必填项未填写
			checkEmptyForm() {
				let hasEmpty = false;
				console.log("enter checkEmptyForm imageIds:",this.imageIds);
				if (!this.imageIds.length) {
					hasEmpty = true;
					uni.showToast({
						title: "请上传背景图",
						icon: "error",
						duration: 2000,
					});
				}
				let inputList = [
					"headImageId",
					"name",
					//"identityCode", // addcgg 身份号？？ 先封闭身份
					"age",
					"succorTime",
					// "healthStatus",
					// "shapeDesc",
					// "characterDesc",
					"succorStatus",
					"intro",
				];
				for (let i = 0, l = inputList.length; i < l; i++) {
					if (!hasEmpty && isEmpty(this.formData[inputList[i]])) {
						console.log(inputList[i]);
						hasEmpty = true;
						uni.showToast({
							title: "有必填项未填写",
							icon: "error",
							duration: 2000,
						});
						break;
					}
				}

				return hasEmpty;
			},
		},

		onShow() {
			console.log("show");
			// 展示编辑信息
			// 如果正在编辑就不请求接口
			if (this.formData.isEdit) {
				uni.getStorage({
					key: "animalData",
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
				key: "animalData",
				data: this.formData,
			});
		},
		onLoad(options) {
			console.log("edit-animal", options);
			if (options.id) {
				this.animalId = options.id;
				// 有动物id为编辑 无id为添加
				this.initData();
			}
			if (options.baseId) {
				this.baseId = options.baseId;
			}
		},
		onUnload() {
			console.log("unload");
			// uni.removeStorage({
			// 	key: "animalData",
			// });
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
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-height: 100%;
		height: auto;
	}

	.page-animal-edit .uni-list::before {
		display: none !important;
	}

	.page-animal-edit .uni-list::before,
	.page-animal-edit .uni-list::after,
	.page-animal-edit .uni-list--border-top {
		display: none;
	}

	.w-page {
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

	.page-animal-edit .uni-list-item__extra-text {
		white-space: nowrap;
		max-width: 400rpx;
	}
</style>
