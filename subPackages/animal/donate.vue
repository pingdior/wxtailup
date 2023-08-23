<template>
	<view class="w-page page-donate">
		<view class="page-donate-title">给 <text class="color-primary">{{ animal.name }}</text> 送稀罕</view>
		<view class="page-donate-content">
			<view class="page-donate-item" v-for="(item, index) in list" :key="index">
				<view class="image-box">
					<image :class="'donate-cake'+index" :src="item.url">
				</view>
				<view class="number-box">
					<view class="color-fail">￥<text class="font-number">{{item.number}}</text></view>
					<button type="primary" @click="toDonate(item)">送这个</button>
				</view>
			</view>
		</view>
		<view class="page-donate-footer">谢谢亲的稀罕❤️每份稀罕让小宝贝多一些活下来的机会！</view>
		<view class="donate-success-dialog" v-if="isDonated">
			<view class="dialog-content">
				<view class="cake-box">
					<image class="cake-bg" src="/static/images/cake/cake_background.png" />
					<image class="cake" src="/static/images/cake/cake.png" />
				</view>
				<view class="donate-num-box">
					<text>{{domateItem.number}}元</text>
					<text>感受到亲的稀罕了❤️！</text>
					<text @click="toClose" class="iconfont icon-close"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const api = require("../../utils/api/animal");
	export default {
		name: "Donate",
		data() {
			return {
				animal: {
					id: "",
					name: "",
				},
				list: [{
						url: "/static/images/cake/cake.png",
						id: "1",
						number: 5
					},
					{
						url: "/static/images/cake/cake2.png",
						id: "2",
						number: 10
					},
					{
						url: "/static/images/cake/cake3.png",
						id: "3",
						number: 20
					},
					{
						url: "/static/images/cake/cake4.png",
						id: "4",
						number: 100
					},
				],
				isDonated: false, // 捐赠失败
				domateItem: {},
			};
		},
		methods: {
			toDonate(item) {
				console.log("before showModal this", this);
				const _this = this;
				this.domateItem = item;
				uni.showModal({
							title: "确定稀罕" + item.number + "元?",
							success: function(res) {
								let params = {
									animalId: _this.animal.id,
									number: item.number,
								};
								// 正式支付申请 add cgg
								console.log("enter showModal before getCreateAnimalOrder _this", _this.animal);
								api.getCreateAnimalOrder({
										type: item.id,
										animalId: _this.animal.id, 
									}).then(res => {
											if (res.code == 200) {
														var payObj = JSON.parse(res.result); 
														console.log(payObj); 
														uni.requestPayment({
																	success: function(r) {
																		console.log(r);
																		var newprepayId = payObj.packageValue.split("=")[1];
																		api.getMiniNotify({
																			prepayId: newprepayId
																		}).then(res => {
																			console.log("confirm success after getMiniNotify prepayId!");
																			console.log(
																				"confirm-res",
																				params, res);
																			_this.isDonated = true;
																		})
																	},
																	fail: function(r) {
																		console.log("confirm-res fail!",r);
																	},
																	timeStamp: payObj.timeStamp,
																	package: payObj.packageValue,
																	nonceStr: payObj.nonceStr,
																	signType: payObj.signType,
																	paySign: payObj.paySign
																})
												      }
											  });
													// addOver cgg
												},
											});
									},
									toClose() {
										this.isDonated = false;
									},
							},
							/**
							 * 生命周期函数--监听页面加载
							 */
							onLoad: function(options) {
								this.animal.id = options.animalId;
								this.animal.name = options.name || "";
								console.log(this, "animal-donate this");
								
								// this.initData();
							},
						};
</script>

<style>
	.page-donate {
		background: #f7f7f7;
		box-sizing: border-box;
		padding: 48rpx;
		text-align: center;
		position: relative;
	}

	.page-donate-title {
		font-size: 18px;
		color: #303741;
		line-height: 1;
	}

	.page-donate-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.page-donate-item {
		background-color: #fff;
		width: 48%;
		margin-top: 48rpx;
		height: 430rpx;
		display: flex;
		flex-direction: column;
		border-radius: 8px;
	}

	.image-box,
	.number-box {
		flex: 1;
	}

	.image-box {
		display: flex;
		align-items: center;
		justify-content: center;
		/* padding: 14rpx 52rpx 16rpx; */
	}

	.donate-cake0 {
		width: 96rpx;
		height: 94rpx;
	}

	.donate-cake1 {
		width: 156rpx;
		height: 120rpx;
	}

	.donate-cake2 {
		width: 204rpx;
		height: 134rpx;
	}

	.donate-cake3 {
		width: 204rpx;
		height: 186rpx;
	}

	.number-box {
		font-size: 16px;
		padding: 0 32rpx 62rpx;
	}

	.font-number {
		font-size: 26px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
	}

	.page-donate-footer {
		margin-top: 18rpx;
		font-size: 12px;
		color: #9ba1aa;
	}

	button {
		color: #fff;
		font-size: 14px;
		/* width: 480rpx; */
		height: 64rpx;
		line-height: 64rpx;
		background: #64c8b3;
		border-radius: 40rpx;
	}

	.donate-success-dialog {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.donate-success-dialog .dialog-content {
		position: absolute;
		top: 15%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.donate-success-dialog .cake-box {
		position: relative;
		width: 496rpx;
		height: 498rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.donate-success-dialog .cake-box .cake-bg {
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 0;
		animation: turn 10s linear infinite;
	}

	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	.donate-success-dialog .cake-box .cake {
		width: 238rpx;
		height: 240rpx;
		z-index: 1;
	}

	.donate-success-dialog .donate-num-box {
		display: flex;
		flex-direction: column;
		font-size: 16px;
		color: #fff;
	}

	.donate-success-dialog .icon-close {
		margin-top: 56rpx;
		font-size: 24px;
	}
</style>
