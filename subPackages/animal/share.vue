<template>
	<view class="container page-animal-share">
		<!-- <painterPic ref="painterRef" /> -->
		<hch-poster
		  ref="hchPoster"
		  @cancel="handleCancel"
		  :posterData.sync="posterData"
		  @previewImage="previewImage"
		/>
		<view class="page-header">
			<view class="page-section page-section-spacing swiper">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					style="height: 345rpx;">
					<block v-for="(item, index) in animalInfo.imageIds" :key="index">
						<swiper-item>
							<!-- <view class="image_wrapper"> -->
							<image bindtap="tapBanner" :data-id="item" :src="item" class="slide-image" :mode="center" />
							<!-- </view> -->
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="page-body">
			<image class="avatar" :src="animalInfo.headImageId" />
			<view class="w-block page-body-info-block">
				<view class="page-body-info">
					<view class="page-body-user">
						<text class="user-name">{{ animalInfo.name }}</text>
						<text class="user-age">{{ animalInfo.age }}</text>
						<text :class="{
                'iconfont color-primary': true,
                'icon-man': animalInfo.sex === '男',
                'icon-woman': animalInfo.sex === '女',
              }"></text>
						<!-- <text
              :class="{
                'user-healthy font10': true,
                'primary-box': tag.status == '1',
                'default-box': tag.status == '0',
              }"
              v-for="(tag, index) in animalInfo.tags"
              :key="index"
              >{{ tag.tag }}</text> -->
						<text :class="{ 'user-healthy font10': true, 'default-box': true, }"
							v-for="(tag, index) in splitToArray(animalInfo.succorStatus)" :key="index">{{ tag }}</text>
						<text class="user-status font10 color-text2">
							<text v-for="(item, index) in splitToArray(animalInfo.healthStatus)" :key="index">{{
                item
              }}</text>
						</text>
					</view>
					<view class="primary-box bg-gray2" hover-class="none" hover-stop-propagation="false">
						<view class="w-block feature-box">
							<view class="flex-row">
								<text class="color-text1 feature-name">外形</text>
								<text>{{animalInfo.shapeDesc}}</text>
							</view>
							<view class="flex-row">
								<text class="color-text1 feature-name">性格</text>
								<text>{{animalInfo.characterDesc}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="w-content">
				<view class="page-bottom-btns-share">
					<button class="w-btn" @click="enterPrograme">
						打开小程序💗查看更多毛孩子信息！
					</button>
				</view>
				<view class="w-blk">
					<uni-section :title="animalInfo.name + '的故事'" type="line"></uni-section>
					{{ animalInfo.intro }}
				</view>
			</view>
			<!-- 	<view class="list-wrapper" @click="playVideo">
				<view v-if="videothumbnail" class="list-image-wrapper">
					<image class="list-image" :src="videothumbnail" />
					<text class="list-image-text">{{ Math.round(videoduration) }}</text>
				</view>
				<view v-else class="list-image-wrapper ">
					<image class="list-image" />
					<text style="text-align: center;">{{videoPublicStatus[videostatus]}}</text>
				</view>
				<view class="list-info-wrapper" hover-class="none" hover-stop-propagation="false">
					<text class="list-info-tilte">{{ videoname }}</text>
					<view class="list-info-des color-text2 font12" hover-class="none"
						hover-stop-propagation="false">
						<text>播放<text>{{ videoplayNum }}</text></text>
						<text>·</text>
						<text>喜欢<text>{{ videolikeNum }}</text></text>
					</view>
				</view>
			</view> -->
			<view class="w-content">
				<view class="w-blk">
					<uni-section title="送养人信息" type="line"></uni-section>
					<view class="base-wrapper">
						<image class="base-avator" :src="baseHomeInfo.headImgUrl" />
						<view class="base-name-wrapper">
							<text class="base-name">{{ baseInfo.name }}</text>
							<view class="base-des">
								<text v-if="baseInfo.loginTime">{{baseInfo.loginTime}}</text>
								<text
									v-if="animalInfo.isAdopted==null || animalInfo.isAdopted ">等待领养{{animalInfo.sameOrigin?",仅限同城领养":""}}</text>
							</view>
						</view>
					</view>
					<view class="base-part">
						<view class="base-part-item">
							<text class="base-part-number">100%</text>
							<text>留言回复率</text>
						</view>
						<view class="base-part-item">
							<text class="base-part-number">{{baseHomeInfo.catNum+baseHomeInfo.dogNum}}</text>
							<text>待领养数量</text>
						</view>
						<view class="base-part-item">
							<text class="base-part-number">0</text>
							<text>已领养数量</text>
						</view>
					</view>
				</view>
			</view>
			<!--      <view class="warning-box">
        <view class="warning-item">
          <icon class="iconfont icon-warning" />
          <text>领养后需要打卡6周</text>
        </view>
        <view class="warning-item">
          <text>查看规则</text>
          <icon class="iconfont icon-right" />
        </view>
      </view> -->
			<!-- <view class="page-bottom-btns">
        <button
          class="btn"
          type="primary"
          plain="true"
          @click="toDonate"
        >
          送稀罕
        </button>
        <button type="primary" @click="toAdopt">申请领养</button>
      </view> -->
			<view v-if="hasFirstLogin" class="page-bottom-btns-login">
				<button class="btn" type="primary" plain="true">
					{{enterAppTag}}
				</button>
			</view>
			<view v-else class="page-bottom-btns">
				<button class="w-link" @click="toBoardPic">
					<image class="w-icon" src="../../static/icons/icon_tabbar.png" />
					<text> 生成海报</text>
				</button>
				<button class="w-link" open-type="share">
					<image class="w-icon" src="../../static/icons/share.png" />
					<text>分享</text>
				</button>
			</view>
		</view>
	</view>
</template>
<script>
	const api = require("../../utils/api/animal.js");
	const baseApi = require("../../utils/api/organization.js");
	import HchPoster from '../components/hch-poster/hch-poster.vue'
	const globalConst = require("../../utils/service.js");
	
	import {
		mapState
	} from "vuex";
	export default {
		name: "Details",
		components: {
		  HchPoster,
		},
		data() {
			return {
				animalId: 0,
				baseId: 0,
				indicatorDots: true,
				vertical: false,
				autoplay: false,
				interval: 2000,
				duration: 500,

				orderMedias: [{}],
				videoId: 0,
				videothumbnail: "",
				videoduration: 0,
				videostatus: 0,
				videoname: "",
				videosuccorStatus: 0,
				videoplayNum: 0,
				videolikeNum: 0,
				videoanimalName: "",

				active: 0,
				animalInfo: {
					name: "聪聪",
					age: "3岁",
					sex: "男",
					tags: [{
						tag: "康复中",
						status: "1",
					}, ],
					status: ["已免疫", "已驱虫", "未绝育"],
					cakeNum: 25,
					fenceNum: 39,
					likeNum: 195,
					shapeDesc: '',
					characterDesc: '',

				},
				baseInfo: {},
				baseHomeInfo: {},
				upShareFileUrl: "",
				hasFirstLogin: false,
				enterAppTag: "打开小程序💗查看更多毛孩子信息",
				
				//生成海报
				deliveryFlag: false, //
				// 海报模板数据
				posterData: {
				  poster: {
				    //根据屏幕大小自动生成海报背景大小
				    url: "", //图片地址
				    r: 0, //圆角半径
				    w: 375, //海报宽度
				    h: 667, //海报高度
				   // p: 0 //海报内边距padding
				  },
				  mainImg: {
				    //海报主商品图
				    url:'', //图片地址
				    r: 10, //圆角半径
				    w: 228, //宽度
				    h: 228,//高度
					x: 73,
					y: 135, //偏移位置
				  },
				  title: {
				    //商品标题
				    text: "fault_title", //文本
				    fontSize: 16, //字体大小
				    color: '#FFB30D', //颜色
				    lineHeight: 25, //行高
				    mt: 0 //margin-top
				  },
				  codeImg: {
				    //小程序码
				    url: "http://1305387564.vod2.myqcloud.com/6b095ff3vodsh1305387564/9c457cd6387702304896258036/OC1MKiFmdSEA.jpg", //图片地址
				    w: 0, //宽度
				    h: 0, //高度
				    mt: 0, //margin-top
				    r: 0 //圆角半径
				  },
				  tips: [
				    //提示信息
				    {
				      text: "ageyear", //文本
				      fontSize: 14, //字体大小
				      color: '#FFB30D', //字体颜色
				      align: 'left', //对齐方式
				      lineHeight: 25, //行高
				      mt: 28 //margin-top
				    },
					{
					  text: "status", //文本
					  fontSize: 12, //字体大小
					  color: '#FFB30D', //字体颜色
					  align: 'left', //对齐方式
					  lineHeight: 25, //行高
					  mt: 28 //margin-top
					}
					],
				},
			};
		},
		computed: {
			...mapState({
				videoPublicStatus: (state) => state.tags.videoPublicStatus,
				isAuthed: (state) => state.user.hasLogin,
				appUserInfo: (state) => state.user.userInfo,
			}),
			visitTime() {
				if (this.baseInfo.loginTime) {
					let microSeconds = new Date() - new Date(this.baseInfo.loginTime);
					let minutes = microSeconds / 1000 / 60;
					if (minutes < 60) {
						return Math.floor(minutes) + "分钟";
					} else {
						let hours = minutes / 60;
						if (hours < 24) {
							return Math.floor(hours) + "小时";
						} else {
							return Math.floor(hours / 24) + "天";
						}
					}
				} else {
					return 0;
				}
			},
			getAuthed: function() {
				return this.isAuthed;
			}
		},
		watch: {
			getAuthed: {
				handler: function() {
					if (this.isAuthed) {
						console.log("initOnloadData share!");
						this.initData();
					}
				},
			}
		},
		methods: {
			initData() {
				this.getAnimalHomeInfo();
				this.getBaseHomeInfo();
				this.getBaseInfo();
			},
			saveImage() {

				uni.saveImageToPhotosAlbum({
					filePath: this.path,
					success(res) {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			enterPrograme() {
				console.log("enter miniPrograme!");
				if (this.isAuthed) {
					uni.navigateTo({
						url: "/subPackages/animal/details?id=" + this.animalId + "&baseId=" + this.baseId
					});
				} else {
					try {
						uni.setStorageSync('shareBaseId', this.baseId);
					} catch (e) {
						console.log("onChange setStorageSync shareBaseId fail!");
					};
					try {
						uni.setStorageSync('shareAnamalId', this.animalId);
					} catch (e) {
						console.log("onChange setStorageSync shareAnamalId fail!");
					};
					uni.switchTab({
						url: "../../pages/tabBar/main/index"
					});
				}
			},

			// 播放视频
			playVideo() {
				console.log("enter playVideo animalId videoId:", this.animalId, this.videoId);
				uni.setStorage({
					key: "animalCurMediasList",
					data: this.orderMedias,
				});
				uni.navigateTo({
					url: "./animalEdit/VideoPic?id=" + this.animalId + '&videoId=' + this.videoId,
				});
			},
			// 获取动物信息
			getAnimalHomeInfo() {
				api
					.getAnimalHomeInfo({
						animalId: this.animalId,
					})
					.then((res) => {
						console.log("animal-info", res);
						this.animalInfo = res.result;
						this.animalInfo.shapeDesc = res.result.shapeDesc;
						this.animalInfo.characterDesc = res.result.characterDesc;
					});
			},
			getBaseHomeInfo() {
				baseApi
					.getBaseHomeInfo({
						baseId: this.baseId,
					})
					.then((res) => {
						this.baseHomeInfo = res.result;
						console.log("base-home-info", res);
					});
			},
			getBaseInfo() {
				baseApi
					.getBaseInfo({
						baseId: this.baseId,
					})
					.then((res) => {
						console.log("base-info", res);
						this.baseInfo = res.result;
					});
			},
			// 去捐赠
			toDonate() {
				uni.navigateTo({
					url: "/subPackages/animal/donate",
				});
			},
			// 去领养
			toAdopt() {
				uni.navigateTo({
					url: "/subPackages/adopt/form",
				});
			},
			// 生成海报
			toBoardPic() {
				console.log("生成海报");				
				
				this.handleShowPoster();
			},
			// 截图当前页面
			capture() {
				console.log("截图当前页面！");
				// #ifdef APP-PLUS
				var pages = getCurrentPages(); //获取当前页面信息
				var page = pages[pages.length - 1];
				var bitmap = null;
				// var currentWebview = this.$scope.$getAppWebview()
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中
				currentWebview.draw(bitmap, function() {
					console.log('截屏绘制图片成功');
					//这里我将文件名用四位随机数拼接了，不然会出现当前图片替换上一张图片只能保存一张图片的问题
					let rand = Math.floor(Math.random() * 10000)
					let saveUrl = '_doc/' + rand + 'a.jpg'
					bitmap.save(saveUrl, {}, function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								// bitmap.clear(); //销毁Bitmap图片
								uni.showToast({
									title: '保存图片成功',
									mask: false,
									duration: 1500
								});
							}
						});
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
				//currentWebview.append(amway_bit);
				// #endif
			},
			splitToArray(val) {
				if (val) {
					return val.split('/')
				} else {
					return []
				}
			},
			/**
			 * @description: 生成海报
			 * @param {type}
			 * @return {type}
			 * @author: hch
			 */
			 handleShowPoster() {
			  console.log("enter create pic,current back url:",globalConst.postBackUrl);
					
			 // this.$refs.hchPoster.codeImg.url = "http://1500007875.vod2.myqcloud.com/6c9b6a63vodcq1500007875/9c461a9e387702304896259466/vZohPQgKu5kA.jpg";
			  this.$refs.hchPoster.poster.x=0;
			  this.$refs.hchPoster.poster.y=0;
			  this.$refs.hchPoster.poster.url = "http://1305387564.vod2.myqcloud.com/6b095ff3vodsh1305387564/cee1cd50387702304954623462/PynoKA7N67wA.png";
			  this.$refs.hchPoster.mainImg.url = this.animalInfo.headImageId;
			  this.$refs.hchPoster.mainImg.x = 73;
			  this.$refs.hchPoster.mainImg.y=130;
			  
			  this.$refs.hchPoster.title.text = this.animalInfo.name;
			  this.$refs.hchPoster.title.x = 60;
			  this.$refs.hchPoster.title.y = 528;
			  //console.log(this.$refs.hchPoster);
			  let curAge = this.animalInfo.age;
			  let curHealthStatus = this.animalInfo.healthStatus;
			  if (curHealthStatus.length < 2 )
			  {
				  curHealthStatus = "";
			  }
			  
			  this.$refs.hchPoster.posterData.tips.forEach( function (item,index){
				  console.log(item);
				  if( index ==0 )
				  {
					  item.text = curAge;
				  }
				  else if( index  ==1)
				  {
					  item.text = curHealthStatus;
				  }
			  });
			 
			  this.$refs.hchPoster.posterShow()
			  this.deliveryFlag = false
			},
			/**
			 * 
			 * @description: 分享弹窗
			 * @param {type}
			 * @return {type}
			 * @author: hch
			 */
			shareEvn(type) {
			  this.deliveryFlag = true
			},
			/**
			 * @description: 关闭分享弹窗
			 * @param {type}
			 * @return {type}
			 * @author: hch
			 */
			handleClose() {
			  this.deliveryFlag = false
			},
			/**
			 * @description: 取消海报
			 * @param {type}
			 * @return {type}
			 * @author: hch
			 */
			handleCancel(val) {
			  // this.canvasFlag = val
			},
			/**
			 * @description: h5的情况下，点击海报保存按钮到图片预览海报，可以长按保存
			 * @param {*} base64
			 * @return {*}
			 * @author: hch
			 */
			previewImage(base64) {
			  // 预览图片
			  uni.previewImage({
			    urls: [base64]
			  })
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log("share-page", options);
			this.animalId = options.id;
			this.baseId = options.baseId;
			this.upShareFileUrl = "/subPackages/animal/share?id=" + this.animalId + "&baseId=" + this.baseId;
			// this.orderMedias.push(tempItem);
			if (!this.appUserInfo || !this.appUserInfo.nickName || this.appUserInfo.nickName.length < 1) {
				this.hasFirstLogin = true;
			}
		},
		onShow() {
			if (this.isAuthed) {
				console.log("enter onShow!");
				this.initData();
			}
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
		//发送到朋友圈，目前微信没只支持单页模式
		// onShareTimeline(res) {
		// 	if (res.from === 'button') { // 来自页面内分享按钮
		// 		console.log("enter onShareTimeline:", res);
		// 		console.log("enter onShareTimeline upShareFileUrl:", this.upShareFileUrl);
		// 		this.enterAppTag = "点击右下角，前往小程序"
		// 	}
		// 	return {
		// 		title: this.animalInfo.name + '的故事分享', //字符串 自定义标题
		// 		imageUrl:this.animalInfo.headImageId,
		// 		query:{
		// 			"id":this.animalId,
		// 			"baseId":this.baseId
		// 		}
		// 	}
		// },
	};
</script>


<style>
	.page-animal-share.container {
		/* background-color: #f2f2f2; */
		min-height: 100%;
		padding-bottom: 120rpx;
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

	.user-age {
		font-size: 20rpx;
	}

	.page-body-user>text+text {
		margin-left: 12rpx;
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

	.w-content {
		padding: 16rpx;
		background-color: #f5f5f5;
	}

	.page-animal-share .warning-box {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 14px;
		padding-left: 32rpx;
		padding-right: 22rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.page-animal-share .warning-box .warning-item {
		display: flex;
		align-items: center;
	}

	.page-animal-share .warning-box .icon-right {
		font-size: 14px !important;
		margin-left: 6rpx;
	}

	.page-animal-share .warning-box .icon-warning {
		font-size: 16px !important;
		margin-right: 4rpx;
	}

	.page-animal-share .warning-box icon {
		line-height: 1;
		display: flex;
		align-items: center;
	}

	.base-wrapper {
		display: flex;
		margin-bottom: 24rpx;
		border-bottom: 1px solid #e5e6e7;
	}

	.base-avator {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		margin-right: 16rpx;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
	}

	.base-name-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.base-name {
		font-size: 14px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303741;
		margin-top: 32rpx;
	}

	.base-des {
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9ba1aa;
	}

	.base-des text+text {
		margin-left: 8rpx;
	}

	.base-part {
		display: flex;
		margin-top: 30rpx;
	}

	.base-part .base-part-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: center;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9ba1aa;
	}

	.base-part .base-part-item+.base-part-item {
		border-left: 1px solid #e5e6e7;
	}

	.base-part .base-part-number {
		font-size: 16px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303741;
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
		background-color: #64c8b3 !important;
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

	.page-animal-share .w-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.page-animal-share .page-bottom-btns {
		padding: 16rpx 32rpx;
		position: fixed;
		background-color: #64c8b3;
		box-shadow: 1px 1px 1px #000;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
	}

	.page-animal-share .page-bottom-btns .w-link {
		/* flex: 0.25; */
		font-size: 16px;
		color: #545966;
		background: initial;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page-animal-share .page-bottom-btns .w-link+.w-link {
		/* margin-left: 60rpx; */
	}

	.font12 {
		font-size: 12px;
	}

	.color-text2 {
		color: #9ba1aa;
	}

	.list-wrapper {
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
</style>
