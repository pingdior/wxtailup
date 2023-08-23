<template>
	<view v-if="editItem.type === 'camera'" type="camera" class="page-main video-container">
		<camera device-position="back" flash="off" @error="cameraError" class="camera"
			:placeholder="editItem.placeholder" />
		<div class="outer2">
			<span class="info3">拍正脸获取身份号</span>
		</div>
		<button @click="cameraTakePhoto" class="section1">
			<span class="info2">完成</span>
		</button>
	</view>
	<view v-else class="w-page animal-edit-item">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">{{editItem.placeholder}}</view>
				<view class="uni-list-cell-db">
					<input v-if="editItem.type === 'input'" v-model="value" class="uni-input-border"
						:placeholder="editItem.placeholder" />
					<input v-else-if="editItem.type === 'number'" type="number" v-model="value" class="uni-input-border"
						:placeholder="editItem.placeholder" />

					<textarea v-else-if="editItem.type === 'textarea'" v-model="value" class="uni-input-border"
						maxlength="-1" :placeholder="editItem.placeholder"></textarea>
					<picker v-else-if="editItem.type === 'date'" mode="date" :value="value" @change="bindDateChange">
						<view class="uni-input">{{ value }}</view>
					</picker>
					<picker v-else-if="editItem.type === 'picker'" @change="bindPickerChange" :value="pickerIndex"
						:range="pickerArray" :range-key="'label'">
						<view class="uni-input">{{
              pickerArray[pickerIndex].label
            }}</view>
					</picker>
					<view class="list-wrapper" v-else-if="editItem.type === 'tags'">
						<view v-for="(tag, index) in tagsList" :key="index" :class="{
                'tags-button': true,
                'tags-button__select': checkedTags.includes(tag),
              }" @click="toToggleTags(tag, index)">
							{{ tag }}
						</view>
					</view>
					<view class="list-wrapper" v-else-if="editItem.type === 'list'">
						<view class="list-item" v-for="(item, index) in list" :key="index">
							<text @click="editListItem(index)">{{ item }}</text>
							<uni-icons class="delete bg-fail" type="closeempty" size="14"
								@click="removeListItem(index)"></uni-icons>
						</view>
						<view type="primary" class="list-button bg-primary" @click="toAdd">添加</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" value="" :title="editItem.placeholder" message="成功消息" :duration="2000"
				:before-close="true" @close="listCancel" @confirm="listConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	const api = require("../../../utils/api/animal");
	const globalConst = require("../../../utils/service");
	
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				value: "",
				placeholder: "",
				formData: {},
				editItem: {},

				list: [],
				listIndex: -1,
				listValue: "",

				checkedTags: [],
				pickerIndex: 0,
				uploadUrl: globalConst.baseUrl,
				identityImageId:"",
				petId:"",
			};
		},
		computed: {
			...mapState({
				animalSex: (state) => state.tags.animalSex, // 动物性别 
				identityCode: (state) => state.tags.identityCode, // 动物身份号
				animalTypes: (state) => state.tags.animalTypes, // 动物类型
				sameOrigin: (state) => state.tags.sameOrigin, // 是否限制本地领养
				isAdopted: (state) => state.tags.isAdopted, // 是否被领养

				healthTag: (state) => state.tags.healthTag, // 健康
				shapeTag: (state) => state.tags.shapeTag, // 外形
				characterTag: (state) => state.tags.characterTag, // 性格
				succorTag: (state) => state.tags.succorTag, // 救助
			}),
			pickerArray() {
				if (this.editItem.key === "isAdopted") {
					return this.isAdopted;
				}
				if (this.editItem.key === "sameOrigin") {
					return this.sameOrigin;
				}
				if (this.editItem.key === "sex") {
					return this.animalSex;
				}
				if (this.editItem.key === "identityCode") {
					return this.identityCode;
				}
				if (this.editItem.key === "type") {
					return this.animalTypes;
				}
			},
			tagsList() {
				if (this.editItem.key === "characterDesc") {
					return this.characterTag;
				}
				if (this.editItem.key === "healthStatus") {
					return this.healthTag;
				}
				if (this.editItem.key === "shapeDesc") {
					return this.shapeTag;
				}
				if (this.editItem.key === "succorStatus") {
					return this.succorTag;
				}
			},
			// 标签时是否单选
			isTagsSingle() {
				const singleList = ['succorStatus']
				return singleList.includes(this.editItem.key);
			}
		},
		methods: {
			// 日期变化
			bindDateChange(e) {
				this.value = e.target.value;
			},
			// 照相机处理方法
			cameraTakePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						let tempImagePath = res.tempImagePath;
						console.log("takePhoto tempImagePath:", tempImagePath);
						// 上传图片
						const curUrl = this.uploadUrl+"/animal/identify";
						uni.uploadFile({
							// 重命名上传地址 /animal/identify
							url: curUrl,
							filePath: tempImagePath,
							header: {
								"Access-Token": this.$store.state.user.token,
							},
							name: "image",
							formData: {
								type: this.formData.type
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data);
								console.log("success uploadFile data", data);
								// 3012 该宠物已经建档	 200 建档成功
								if (data.status === 200 ||  data.code===3012) {
									console.log("res.result is 200 or 3012!");
									if (data.result != null) {
										this.value = data.result.identityCode;
										this.identityImageId = data.result.identityImageId;
										this.petId = data.result.petId;
										console.log("res.result is success,data.status is 200,this.identityCode!",data.result.identityCode);
										uni.navigateBack({
											delta:1,
										})
									} else {
										console.log("uploadFileRes ok, but res.result is null!");
										uni.showToast({
											title: "获取身份号异常!",
											icon: "error",
											duration: 2000,
										});
									}
								} else {
									uni.showToast({
										title: data.msg,
										icon: "error",
										duration: 2000,
									});
								}
							},
						});
					},
					fail: (f) => {
						console.log("choose image fail!", f);
					}
				});
			}, //cameraTakePhoto
			cameraError(e) {
				console.log(e.detail);
			},
			// picker变化
			bindPickerChange(e) {
				console.log(e);
				this.pickerIndex = e.target.value;
				if (this.editItem.key === "sameOrigin") {
					console.log(this.sameOrigin.find((i, ind) => ind == this.pickerIndex));
					this.value = this.sameOrigin.find(
						(i, ind) => ind == this.pickerIndex
					).id;
				} else {
					this.value = this.pickerIndex;
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === "startDate") {
				  year = year - 60;
				} else if (type === "endDate") {
				  year = year + 2;
				}
				month = month > 9 ? month : "0" + month;
				day = day > 9 ? day : "0" + day;
				return `${year}-${month}-${day}`;
			},

			// 标签操作
			// 删除标签
			removeListItem(index) {
				this.list.splice(index, 1);
			},
			// 编辑标签
			editListItem(index) {
				this.listValue = this.list[index];
				this.listIndex = index;
				this.$refs.popup.open();
			},
			// 添加标签
			toAdd() {
				this.listValue = "";
				this.listIndex = -1;
				this.$refs.popup.open();
				console.log(this.$refs);
			},
			// 添加\编辑标签确认
			listConfirm(val) {
				console.log(this.value, ...arguments);
				if (this.listIndex !== -1) {
					this.list[this.listIndex] = val;
				} else {
					this.list.push(val);
				}
				this.listCancel();
			},
			// 取消
			listCancel() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				this.$refs.popup.close();
				this.listIndex = -1;
				this.listValue = "";
			},
			toToggleTags(tag) {
				// console.log(tag, index)
				console.log(this.checkedTags)
				if (this.isTagsSingle) {
					// 单选标签
					this.checkedTags = [tag];
				} else {
					let index = this.checkedTags.findIndex(i => i === tag);
					if (index !== -1) {
						this.checkedTags.splice(index, 1);
					} else {
						this.checkedTags.push(tag);
					}
				}
			},
		},
		onShow() {
			console.log("ss", this.$store.state.tags);
			// 展示编辑信息
			// 如果正在编辑就不请求接口
			uni.getStorage({
				key: "animalData",
				success: (res) => {
					console.log(res.data);
					this.formData = res.data;
					this.editItem = res.data.editItem;
					if (this.editItem.type === "list") {
						let listVal = res.data[res.data.editItem.key];
						if (listVal != "") {
							this.list = listVal.split("/");
						} else {
							this.list = [];
						}
					} else if (this.editItem.type === "tags") {
						let listVal = res.data[res.data.editItem.key];
						if (listVal != "") {
							this.checkedTags = listVal.split("/");
						} else {
							this.checkedTags = [];
						}
					} else {
						this.value = res.data[res.data.editItem.key];
					}
					this.placeholder = res.data[res.data.editItem.placeholder];

					if (!this.formData.succorTime) {
						this.formData.succorTime = this.getDate({
							format: true,
						});
					}
				},
			});
		},
		onUnload() {
			if (this.editItem.type === "list") {
				this.formData[this.editItem.key] = this.list.join("/");
			} else if (this.editItem.type === "tags") {
				this.formData[this.editItem.key] = this.checkedTags.join("/");
			} else if (this.editItem.key==="identityCode"&&this.value&&this.value.length>0)
			{
				this.formData["identityCode"]=this.value;
				this.formData["identityImageId"]=this.identityImageId;
				this.formData["petId"]=this.petId;
			}
			else {
				this.formData[this.editItem.key] = this.value;
			}
			console.log("onUnLoad data store:",this.formData);
			uni.setStorage({
				key: "animalData",
				data: this.formData,
			});
		},
	};
</script>

<style>
	.page-main {
		padding: 0;
	}

	.page-content {
		position: fixed;
	}

	.video-container {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.camera {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.section1 {
		z-index: 71;
		height: 40px;
		border-radius: 20px;
		background-color: rgba(100, 200, 179, 1);
		width: 343px;
		justify-content: center;
		align-items: center;
		top: 553px;
	}

	.info2 {
		z-index: 72;
		width: 32px;
		height: 22px;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1.0);
		font-size: 16px;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 22px;
		text-align: center;
		padding: 9px 155.5px;
	}

	.outer2 {
		z-index: 64;
		height: 269px;
		background: url(../../../static/icons/camera@2x.png)-2px -2px no-repeat;
		width: 266px;
		justify-content: flex-end;
		align-items: flex-start;
		position: absolute;
		left: 57px;
		top: 171px;
	}

	.info3 {
		z-index: 69;
		width: 199px;
		height: 33px;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 74, 74, 1);
		font-size: 24px;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 33px;
		text-align: center;
		padding: 118px 33.5px;
	}

	.w-page {
		padding: 16rpx 32rpx;
		background-color: #fff;
		height: auto;
	}

	.animal-edit-item input {
		border-radius: 8rpx;
		color: #9ba1aa;
		border: 1px solid #dbdbdc;
		height: 72rpx;
		font-size: 14px;
		line-height: 72rpx;
		padding: 0 15rpx;
	}

	.animal-edit-item textarea {
		border-radius: 8rpx;
		color: #9ba1aa;
		border: 1px solid #dbdbdc;
		font-size: 14px;
		padding: 14rpx 15rpx;
		box-sizing: border-box;
		width: 100%;
	}

	.animal-edit-item .list-wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.animal-edit-item .list-item {
		position: relative;
		font-size: 14px;
		padding: 6rpx 16rpx;
		border: 1rpx solid #dbdbdc;
		border-radius: 8px;
		margin: 2rpx 5rpx;
	}

	.animal-edit-item .list-item .delete {
		position: absolute;
		top: -8px;
		right: 10px;
		height: 0;
		width: 0;
	}

	.animal-edit-item .list-item .uni-icons {
		border-radius: 50%;
		background: #ff4a4a88;
		color: #fff !important;
	}

	.animal-edit-item .list-button {
		font-size: 14px;
		padding: 6rpx 16rpx;
		border-radius: 8px;
		margin: 2rpx 5rpx;
		color: #fff;
	}

	.animal-edit-item .uni-list::before,
	.animal-edit-item .uni-list::after {
		content: none;
	}

	.animal-edit-item .uni-list-cell {
		align-items: flex-start;
	}

	.animal-edit-item .uni-list-cell-left {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}

	.animal-edit-item .uni-list-cell-left,
	.animal-edit-item .uni-input {
		font-size: 14px;
	}
</style>
