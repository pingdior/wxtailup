<template>
	<view class="faq-page">
		<view class="faq-body">
			<uni-card
				v-for="(item,index) in list"
				:key="item.id"
				:title="item.ask"
				note="Tips"
			>
				<text class="content-box-text">{{item.answer}}</text>
				<block slot="footer">
					<view class="footer-box">
						<view class="footer-box__item" @click.stop="onEdit(item,index)">编辑</view>
						<view class="footer-box__item" @click.stop="onDelete(item,index)">删除</view>
					</view>
				</block>
			</uni-card>
		</view>
		<view class="button-wrapper">
      <button @click="onConfirm">新增问题</button>
    </view>
	</view>
</template>

<script>
	// import api from '../../utils/api/organization';
	const api = require("../../utils/api/organization.js");
	
	export default {
		components: {},
		data() {
			return {
				baseId: "",
				list: [],
			}
		},
		methods: {
			initData() {
				api.getFaqList({
					baseId: this.baseId
				}).then(res => {
					console.log(res)
					this.list = res.result;
				})
			},
			// 去编辑问题
			onEdit(item, index) {
				console.log(item);
				uni.navigateTo({
					url: `./faqEdit?index=${index}&baseId=${this.baseId}`,
				});
			},
			onDelete(item, index) {
				let _this = this;
				uni.showModal({
					title: "提示",
					content: "确定删除此答疑吗？",
					success: function (res) {
						if (res.confirm) {
							// 没有删除接口，使用全部问题重新保存的方式
							let list = JSON.parse(JSON.stringify(_this.list));
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
										_this.list.splice(index, 1);
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
			// 去新增问题
			onConfirm() {
				uni.navigateTo({
					url: `./faqEdit?baseId=${this.baseId}`,
				});
			}
		},
		/**
			* 生命周期函数--监听页面加载
			*/
		onLoad: function (options) {
			this.baseId = options.id
			this.initData();
		},
	}
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
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #F5F5F5;
		min-height: 100%;
		height: auto;
	}
  /* #endif */
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
	.faq-page .uni-card {
		padding: 32rpx 32rpx 0;
		border-radius: 8px;
	}
	.faq-page .uni-card__header {
		padding: 0 !important;
	}
	.faq-page .uni-border-bottom:after {
		display: none;
	}
	.faq-page .uni-card__header-title-text {
		font-size: 14px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303741;
	}
	.faq-page .uni-card__content {
		padding: 0 0 40rpx 0 !important;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9BA1AA;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.content-box-text {
		color: #9BA1AA;
	}

	.faq-page .uni-card__footer{
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
	.footer-box__item + .footer-box__item::after {
		content: "";
		width: 1rpx;
		background-color: #ECE7E7;
		position: absolute;
		left: 0;
    top: 25rpx;
    height: 34rpx;
	}
	.button-wrapper {
		margin-top: 80rpx;
		margin-bottom: 40rpx;
	}
	.button-wrapper button {
		color: #fff;
		font-size: 16px;
		width: 480rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #64c8b3;
		border-radius: 40rpx;
	}
</style>
