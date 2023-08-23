<template>
	<!-- <view v-if="bShowUser"> -->
	<view>
		<UserPage ref="userRef" />
	</view>
</template>
<script>
	import UserPage from "../../user/index";
	import {
		mapState,
	} from "vuex";
	export default {
		name: "UserCenter",
		components: {
			UserPage,
		},
		data() {
			return {
				isUser: true,
				bShowUser: true,
				
			};
		},
		computed: {
			...mapState({
				appUserInfoFirst: (state) => state.user.userInfo,
			}),
		},
		methods: {
			initData() {
				this.$refs.userRef.getUserHomeInfo();
			},
			setTabBarStyle() {
				uni.setTabBarStyle({
					color: "#ACB2BA",
					selectedColor: "#64C8B3",
					backgroundColor: "#ffffff",
					borderStyle: "white", // 否	tabBar上边框的颜色， 仅支持 black/white
					success: function(r) {
						console.log('us', r)
					},
					fail: function(err) {
						console.log('ue', err)
					},
					complete: function(c) {
						console.log(c)
					},
				});
			},
		},
		onLoad: function(options) {
			// type	用户类型 1 基地组织者、 0 普通用户
			let type = this.$store.state.user.userInfo.type;
			this.isUser = type === 0;
			if (!this.appUserInfoFirst.nickName || this.appUserInfoFirst.nickName.length<1) {
				uni.showToast({
					title:"请先登陆！",
					duration:1000,
				});
				this.bShowUser = false;
			}
		},
		onShow() {
			this.setTabBarStyle();
			if (!this.appUserInfoFirst.nickName || this.appUserInfoFirst.nickName.length<1) {
				uni.showToast({
					title:"请先登陆！",
					duration:1000,
				});
				this.bShowUser = false;
				return;
			}
			this.initData();
		},
	};
</script>
