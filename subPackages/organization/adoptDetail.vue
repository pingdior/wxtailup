<template>
	<view class="w-page">
		<view class="head-text">申请人信息</view>
		<view v-if="bOnloadData" class="list-image-wrapper">
			<image class="list-image-avatar" :src="adoptDetailForm.headImgUrl" @click="goUserDetail()" />
			<text class="list-image-text">{{ adoptDetailForm.nickName }}</text>
		</view>
		<list v-if="bOnloadData" class="list-info-wrapper">
			<view class="view-info-wrapper">
				<text class="view-text-info-left">年龄</text>
				<text class="view-text-info-right">{{ageName}}</text>
			</view>
			<view class="view-info-wrapper">
				<text class="view-text-info-left">性别</text>
				<text class="view-text-info-right">{{sexName}}</text>
			</view>
			<view class="view-info-wrapper">
				<text class="view-text-info-left">手机号</text>
				<text class="view-text-info-right">{{adoptDetailForm.phone}}</text>
			</view>
			<view class="view-info-wrapper">
				<text class="view-text-info-left">养宠经验</text>
				<text class="view-text-info-right">{{experienceName}}</text>
			</view>
			<view class="view-info-wrapper">
				<text class="view-text-info-left">居住地址</text>
				<text class="view-text-info-right">{{adoptDetailForm.addr}}</text>
			</view>
			<view class="view-info-wrapper">
				<text class="view-text-info-left">住房情况</text>
				<text class="view-text-info-right">{{houseName}}</text>
			</view>
			<view class="view-info-wrapper">
				<text class="view-text-info-left">婚姻情况</text>
				<text class="view-text-info-right">{{marryName}}</text>
			</view>
			<view class="view-info-wrapper">
				<text class="view-text-info-left">职业情况</text>
				<text class="view-text-info-right">{{adoptDetailForm.job}}</text>
			</view>
		</list>
		<view><text class="view-text-info-left">申请留言</text></view>
		<view><text v-if="bOnloadData" class="view-text-info-right">{{adoptDetailForm.remark}}</text></view>
		<view class="head-text">待领养的毛孩子</view>
		<view v-if="bOnloadData" class="list-image-wrapper">
			<image class="list-image-avatar" :src="animalBaseInfo.headImageId" @click="goAnimalDetail()" />
			<view><text class="list-image-text">{{ animalBaseInfo.name }} {{animalBaseInfo.age}}</text>
				<view class="view-text-down-status">
					<text :class="{
					  'iconfont color-primary': true,
					  'icon-man': animalBaseInfo.sex == '1',
					  'icon-woman': animalBaseInfo.sex == '0',
					}"></text>
					<text class="status-succorStatus">{{ animalBaseInfo.succorStatus }}</text>
					<text class="status-healthStatus">{{ animalBaseInfo.healthStatus }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const util = require("../../utils/api/index");
	const api = require("../../utils/api/animal");

	export default {
		data() {
			return {
				adoptDetailForm: {
					animalId: 0, // 动物id
					baseId: 0, // 动物所属基地id
					sex: 0,
					ageRange: 0,
					experience: 0,
					married: 0,
					housing: 0,
					job: "",
					addr: "",
					phone: "",
					remark: "",
					protocal: false,
					id: 0,
					userId: 0,
				},

				animalBaseInfo: {
					id: 0,
					baseId: 0,
					name: "",
					age: "0",
					type: 0,
					sex: 0,
					headImageId: "0",
					intro: "",
					characterDesc: "",
					shapeDesc: "",
					sameOrigin: true,
					succorTime: "",
					succorStatus: "",
					healthStatus: "",
					identityCode: "",
					identityImageId: "",
					petId: "",
					isAdopted: 0,
				},

				sexList: [{
						name: "未知",
						value: 0
					},
					{
						name: "女神",
						value: 1
					},
					{
						name: "男神",
						value: 2
					},
				],

				ageList: [{
						name: "40后",
						value: 4
					},
					{
						name: "50后",
						value: 5
					},
					{
						name: "60后",
						value: 6
					},
					{
						name: "70后",
						value: 7
					},
					{
						name: "80后",
						value: 8
					},
					{
						name: "90后",
						value: 9
					},
					{
						name: "00后",
						value: 0
					},
				],

				experienceList: [{
						name: "无",
						value: 0
					},
					{
						name: "有",
						value: 1
					},
				],

				marryList: [{
						name: "单身",
						value: 0
					},
					{
						name: "恋爱中",
						value: 1
					},
					{
						name: "已婚",
						value: 2
					},
				],

				houseList: [{
						name: "合租",
						value: 0
					},
					{
						name: "整租",
						value: 1
					},
					{
						name: "自有住房",
						value: 2
					},
				],
				ageName: "",
				sexName: "",
				marryName: "",
				experienceName: "",
				houseName: "",

				adoptId: null,
				curIndex: -1,
				bFromMessage: null,
				bOnloadData:false,
			};
		},

		methods: {
			async init() {
				// 读取当前数组，判断索引值
				try {
					if (this.bFromMessage != null) {
						// 触发前一页的更新
						let pages = getCurrentPages(); //获取所有页面栈实例列表
						let prevPage = pages[pages.length - 2]; //上一页页面实例

						const animalApllies = prevPage.$vm.animalApllies;
						if (animalApllies) {
							console.log("enter animalApllies find!");

							for (let index in animalApllies) {
								if (this.adoptId == animalApllies[index].id) {
									this.curIndex = index;
									this.adoptDetailForm = animalApllies[index];
									break;
								}
							}
						}
						const animalBasicInfo = prevPage.$vm.animalAplliesBaseInfos;
						if (this.curIndex > -1) {
							try {
								if (animalBasicInfo && animalBasicInfo.length > 0) {
									console.log("enter animalBasicInfo success!", animalBasicInfo);
									this.animalBaseInfo = animalBasicInfo[this.curIndex];
									this.bOnloadData = true;
								} else {
									console.log("enter animalBasicInfo fail!");
								}
							} catch (e) {
								// error
								console.log("enter animalBasicInfo catch fail!");
							}
						}

					} else {
						console.log("use applyAdoptDetail api!");
						await util.applyAdoptDetail({
							applyId: this.adoptId,
						}).then((res) => {
							if (res.result) {
								console.log("use applyAdoptDetail api OK!");
								this.adoptDetailForm = res.result;
							} else {
								console.log("getAnimalBasicInfo res result is null!");
							}
						});

						if (this.adoptDetailForm.animalId > 0) {
							await api.getAnimalBasicInfo({
								animalId: this.adoptDetailForm.animalId,
							}).then((resAni) => {
								if (resAni.result) {
									console.log("use getAnimalBasicInfo api OK!",resAni);
									this.animalBaseInfo = resAni.result.animal;
									this.bOnloadData = true;
								}
							});
						} else {
							console.log("adoptDetailForm animalId is 0!");
						}
					}

					var ageItem = this.ageList.find((item) => {
						return item.value == this.adoptDetailForm.ageRange
					});
					console.log("this is ageItem:", ageItem);
					this.ageName = ageItem.name;
					var sexItem = this.sexList.find((item) => {
						return item.value == this.adoptDetailForm.sex
					});
					this.sexName = sexItem.name;
					var marryItem = this.marryList.find((item) => {
						return item.value == this.adoptDetailForm.married
					});
					this.marryName = marryItem.name;
					var expericenceItem = this.experienceList.find((item) => {
						return item.value == this.adoptDetailForm.experience
					});
					this.experienceName = expericenceItem.name;
					var houseItem = this.houseList.find((item) => {
						return item.value == this.adoptDetailForm.housing
					});
					this.houseName = houseItem.name;
					
				} catch (e) {
					console.log("enter animalApllies fail!");
				}
			},

			goUserDetail() {
				// uni.navigateTo({
				// 	url: "/pages/tabBar/user?userId=" +
				// 		this.adoptDetailForm.userID,
				// });
			},

			goAnimalDetail() {
				uni.navigateTo({
					url: "/subPackages/animal/details?id=" +
						this.animalBaseInfo.id +
						"&baseId=" +
						this.animalBaseInfo.baseId,
				});
			},
		},
		
		onLoad:  async function(options) {
			console.log("adopt-options", options);
			if (options.applyId) {
				this.adoptId = options.applyId;
			}
			
			if (options.bFromMessage) {
				this.bFromMessage = options.bFromMessage;
			}
			await this.init();
		},
	};
</script>

<style>
	.w-page {
		padding: 16rpx 32rpx;
		background-color: #fff;
		height: auto;
	}

	.w-page .head-text {
		font-size: 36rpx;
		font-weight: 600;
		color: #303741;
		font-family: PingFangSC-Semibold, PingFang SC;
		margin-top: 36rpx;
	}

	.list-image-wrapper {
		display: flex;
		flex-direction: row;
		margin-top: 36rpx;
	}

	.list-image-avatar {
		height: 160rpx;
		width: 160rpx;
		border-radius: 50%;
		top: -80rpx;
		left: 32rpx;
		margin-bottom: 36rpx;
	}

	.list-image-text {
		font-size: 36rpx;
		color: #303741;
		margin-top: 38rpx;
		margin-left: 40rpx;
	}

	.list-info-wrapper {}

	.list-info-wrapper .view-info-wrapper {
		display: flex;
		justify-content: space-between;
	}

	.view-info-wrapper-remark {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.view-text-top-name {
		font-size: 28rpx;
		font-weight: 600;
		color: #303741;
		font-family: PingFangSC-Semibold, PingFang SC;
	}

	.view-text-info-right {
		font-size: 28rpx;
		font-weight: 600;
		color: #545966;
		font-family: PingFangSC-Semibold, PingFang SC;
	}

	.view-text-down-status {
		margin-left: 40rpx;
		font-size: 24rpx;
	}

	.status-sex {}

	.status-succorStatus {
		margin-left: 20rpx;
		color: #64c8b3;
	}

	.status-healthStatus {
		margin-left: 20rpx;
		color: #545966;
	}
</style>
