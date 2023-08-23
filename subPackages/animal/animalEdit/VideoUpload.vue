<template>
	<view class="page-main video-container">
		<view style="display: flex;">
			<image v-if="thumbTempFile" class="slot-image" :src="thumbTempFile" will-change: transform></image>
			<view v-else class="slot-image slot-image-null" @click="chooseFi">
				<view class="is-add">
					<view class="add-line"></view>
					<view class="add-line rotate"></view>
				</view>
				<text class="add-text">新增</text>
			</view>
			<button @click="uploadMedia" class="box2 flex-col"><text class="info5">发布</text></button>
			<!-- <view class="layer3"> -->
			<!-- </view> -->
		</view>
		<view class="status-frame">
			<view><text class="status-name">时期</text></view>
			<picker @change="bindPickerChange" :value="indexHealth" :range="animalSuccorTypes">
				<view class="status-key">{{animalSuccorTypes[indexHealth]}}</view>
			</picker>
		</view>
		<textarea class="title-frame" type="text" @input="onKeyInput" auto-blur=true maxlength="45" :value="title"
			placeholder-style="top:0px">
		</textarea>

	</view>
</template>

<script>
	const api = require("../../../utils/api/animal");
	const util = require("../../../utils/util");
	const VodUploader = require("../../../utils/vod-wx-sdk-v2.js")
	import {
		mapState
	} from "vuex";

	// from txc upload vidio
	// 选择相册
	export default {
		data() {
			return {
				thumbTempFile: "",
				title: "",
				animalName: "",
				health: "",
				indexHealth: 0,
				duration: 0,
				sourceType: ['album'], // 从相册取得
				defaultVideoblumPath: ["../../../static/images/base.png"],
				progress: 0, // 进程条 
			};
		},
		computed: {
			...mapState({
				animalSuccorTypes: (state) => state.tags.succorTag, // 动物状态
			}),
		},
		methods: {
			init() {
				// 得到默认indexHealth
				for (this.indexHealth in this.animalSuccorTypes) {
					if (this.animalSuccorTypes[this.indexHealth] == this.health) {
						console.log("enter init break indexHeath:", this.indexHealth);
						break;
					}
				}
				this.title = this.animalName + util.formatTime() + "的活动";
				console.log("enter init title:", this.title);
			},

			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexHealth = e.target.value
			},

			onKeyInput: function(event) {
				this.title = event.target.value
			},

			backUpPage() {
				uni.navigateBack({
					delta: 1,
				});
				return;
			},

			chooseFi() {
				let self = this;
				uni.chooseMedia({
					count: 1, // 只取一个文件
					mediaType: ['video'],
					sourceType: this.sourceType,
					success(res) {
						console.log("enter chooseMedia res:", res);
						let tempFile = res.tempFiles[0];
						let resSize = tempFile.size;
						if (resSize > 377487360) {
							uni.showToast({
								title: "上传的视频大小不超过360M",
								icon: "none",
								duration: 2000,
								mask: true,
							});
							uni.navigateBack({
								delta: 1,
							});
							return;
						}
						//限制视频类型
						let resType = tempFile.tempFilePath.slice(-3).toLowerCase();
						const imageTypeList = ['mp4'];
						if (!imageTypeList.includes(resType)) {
							uni.showToast({
								title: "视频必须是mp4类型",
								icon: "none",
								duration: 2000,
								mask: true,
							});
							uni.navigateBack({
								delta: 1,
							});
							return;
						}
						self.thumbTempFile = tempFile.thumbTempFilePath;
						self.duration = Math.round(tempFile.duration);
						self.videoFile = tempFile;
					},
				});
				console.log("just leaving chooseMedia title:", this.title);
			},
			// 选择拍摄
			chooseVi() {
				let self = this;
				uni.chooseVideo({
					sourceType: ['camera'],
					compressed: true,
					maxDuration: 60,
					success(res) {
						console.log("enter chooseVideo res:", res);
						let tempFile = res;
						self.thumbTempFile = self.defaultVideoblumPath;
						self.duration = Math.round(tempFile.duration);
						self.videoFile = tempFile;
					},
					fail(res) {
						console.log("picture video fail!:", res);
					}
				});
			},
			// 上传视频
			uploadMedia() {
				let self = this;
				if (self.thumbTempFile == '') {
					uni.showToast({
						title: "请选择上传视频",
						icon: "none",
						duration: 2000,
						mask: true,
					});
					return;
				}

				if (self.title == '') {
					uni.showToast({
						title: "请填写上传视频的标题",
						icon: "none",
						duration: 2000,
						mask: true,
					});
					return;
				}
				// let title = "聪聪小跑V1.3";
				const uploader = VodUploader.start({
					// 必填，获取签名的函数
					getSignature: self.getSignature,
					// 选填，视频名称，强烈推荐填写(如果不填，则默认为“来自小程序”)
					mediaName: self.title,
					// 选填，视频封面，把 wx.chooseImage 回调的参数(file)传进来
					coverFile: self.coverFile,
					// 必填，把 wx.chooseVideo 回调的参数(file)传进来
					mediaFile: self.videoFile,
					// 上传中回调，获取上传进度等信息
					progress: function(result) {
						console.log('enter progress result:', result);
						self.progress = result.percent * 100;
						console.log('enter self.progress :', self.progress);
						uni.showLoading({
							title: "上传视频 " + self.progress + "%",
							mask: true
						});

					},
					// 上传完成回调，获取上传后的视频 URL 等信息
					finish: (result) => {
						console.log('enter upload finish：', result, self);
						//通知后台上传成功
						api.postFinishUpload({
							"animalId": self.animalId,
							"baseId": self.baseId,
							"fileId": result.fileId,
							"name": self.title,
							//这里需要设置用户健康状态
							"succorStatus": this.animalSuccorTypes[this.indexHealth],
							"duration": self.duration
						}).then(res => console.log("postFinishUpload res", res));

						if (self.progress === 100) {
							uni.hideLoading();
						}
						// 触发前一页的更新
						let pages = getCurrentPages(); //获取所有页面栈实例列表
						let prevPage = pages[pages.length - 2]; //上一页页面实例
						uni.navigateBack({
							delta: 1,
							success: function() {
								try {
									prevPage.$vm.orderMediasPage = 0;
									console.log("enter navigateBack success!");
								} catch (e) {
									console.log("enter navigateBack fail!");
									console.log(e);
								}
							},
						});
					},
					// 上传错误回调，处理异常
					error: function(result) {
						console.log('error');
						console.log(result);
						uni.showModal({
							title: '上传失败',
							content: JSON.stringify(result),
							showCancel: false
						});
					},
				});

				self.uploader = uploader;
			},
			getSignature(callback) {
				api.getSignature().then(res => {
					if (res.code == 200) {
						console.log("get getSignature result:", res.result);
						callback(res.result);
					}
				});
			},
		},
		onLoad(options) {
			console.log("enter upload video", options);
			if (options.id) {
				this.animalId = options.id;
			}
			if (options.baseId) {
				this.baseId = options.baseId;
			}
			if (options.animalName) {
				this.animalName = options.animalName;
			}
			this.health = options.status;
			this.init();
			if (options.videoTypeflag === "0") {
				this.sourceType = ['camera'];
				this.chooseVi();
			} else {
				this.chooseFi();
			}
			console.log("this.sourceType", this.sourceType);

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

	.outer1 {
		z-index: 88;
		width: 343px;
		height: 1px;
		background-color: rgba(236, 231, 231, 1);
	}

	.slot-image {
		z-index: 75;
		height: 109px;
		width: 109px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		left: 20px;
		top: 25px;
	}

	.slot-image-null {
		flex-direction: column;
		background: #F7F7F7;
		border-radius: 8px;
		border: 1px solid #64C8B3;
	}

	.add-text {
		font-size: 14px;
		font-weight: 400;
		color: #9ba1aa;
		line-height: 20px;
	}

	.is-add {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		height: 48rpx;
		margin-bottom: 20rpx;
	}

	.add-line {
		width: 48rpx;
		height: 2rpx;
		background-color: #ddd;
		border-radius: 2px;
	}

	.rotate {
		position: absolute;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	.mod3 {
		z-index: 77;
		height: 15px;
		background-color: rgba(0, 0, 0, 0);
		width: 15px;
	}

	.box1 {
		z-index: 71;
		height: 35px;
		border-radius: 17.5px 17.5px 17.5px 17.5px;
		background-color: rgba(100, 200, 179, 1);
		width: 140px;
		justify-content: center;
		align-items: center;
	}

	.box2 {
		z-index: 68;
		height: 35px;
		border-radius: 17.5px 17.5px 17.5px 17.5px;
		background-color: rgba(100, 200, 179, 1);
		width: 140px;
		justify-content: center;
		align-items: center;
		margin-right: 20px;
		margin-top: 20px;
	}

	.box3 {
		z-index: 78;
		height: 15px;
		justify-content: center;
		align-items: center;
	}

	.box4 {
		z-index: 81;
		width: 7px;
		height: 7px;
	}

	.status-frame {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		margin-left: 11px;
		margin-top: 22px;
		width: 343px;
		height: 37px;
	}

	.status-name {
		z-index: 90;
		width: 56px;
		height: 20px;
		display: block;
		overflow-wrap: break-word;
		color: rgba(48, 55, 65, 1);
		font-size: 14px;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 20px;
		text-align: left;
		margin-top: 20px;
		margin-left: 5px;
	}

	.status-key {
		z-index: 91;
		width: 31px;
		height: 37px;
		display: block;
		overflow-wrap: break-word;
		color: rgba(100, 200, 179, 1);
		font-size: 14px;
		font-family: PingFangSC-Regular;
		line-height: 20px;
		text-align: right;
		margin-left: 245px;
		margin-top: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.title-frame {
		z-index: 83;
		height: 100px;
		border-radius: 8px;
		border: 1px solid rgba(151, 151, 151, 1);
		background-color: #FFFAE2;
		width: 330px;
		justify-content: flex-start;
		margin-top: 20px;
		margin-left: 20px;
		align-items: flex-end;
		border-style: hidden;
		position: relative;
	}

	.bd8 {
		z-index: 89;
		width: 4px;
		height: 10px;
		margin: 6px 0 0 8px;
	}

	.layer3 {
		display: flex;
		z-index: auto;
		width: 344px;
		height: 35px;
		justify-content: space-between;
		margin: 273px 0 0 16px;
	}

	.progress-box {
		width: 80%;
		margin-top: 100rpx;
		margin-left: 60rpx;
	}

	.info3 {
		z-index: 84;
		position: absolute;
		left: 5px;
		top: 10px;
		width: 320px;
		height: 21px;
		display: block;
		overflow-wrap: break-word;
		color: rgba(84, 89, 102, 1);
		font-size: 14px;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 21px;
		text-align: left;
	}

	.info4 {
		z-index: 72;
		height: 22px;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 16px;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 34px;
		text-align: center;
	}

	.info5 {
		z-index: 69;
		height: 22px;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 16px;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 34px;
		text-align: center;
	}
</style>
