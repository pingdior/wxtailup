<template>
	<image style="width: 750rpx; height:2621rpx; background-color: #eeeeee;"  :mode="aspectFill" :src="imgUrl"
	                        @error="imageError"></image>
</template>

<script>
	export default {
		data() {
			return {
			imgUrl:'/subPackages/static/images/adoptcommit.jpg',
			};
		},
	};
</script>

<style>
</style>
