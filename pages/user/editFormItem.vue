<template>
  <view class="w-page">
    <input
      v-if="editItem.type === 'text'"
      type="text"
      v-model="value"
      class="uni-input-border"
      :placeholder="editItem.placeholder"
    />

    <textarea
      v-else
      v-model="value"
      class="uni-input-border"
      :placeholder="editItem.placeholder"
    ></textarea>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      placeholder: "",
      formData: {},
      editItem: {},
    };
  },
  onShow() {
    console.log("ss");
    // 展示编辑信息
    // 如果正在编辑就不请求接口
    uni.getStorage({
      key: "userFormData",
      success: (res) => {
        console.log(res.data);
        this.formData = res.data;
        this.editItem = res.data.editItem;
        this.value = res.data[res.data.editItem.key];
        this.placeholder = res.data[res.data.editItem.placeholder];
      },
    });
  },
  onUnload() {
    this.formData[this.editItem.key] = this.value;
    // console.log(this.formData, this.value, this.editItem);
    uni.setStorage({
      key: "userFormData",
      data: this.formData,
    });
  },
};
</script>

<style>
.w-page {
  padding: 16rpx 32rpx;
  background-color: #fff;
  height: auto;
}

input {
  border-radius: 8rpx;
  color: #9ba1aa;
  border: 1px solid #dbdbdc;
  height: 72rpx;
  font-size: 14px;
  line-height: 72rpx;
  padding: 0 15rpx;
}
textarea {
  border-radius: 8rpx;
  color: #9ba1aa;
  border: 1px solid #dbdbdc;
  font-size: 14px;
  padding: 2rpx 15rpx;
  box-sizing: border-box;
}
</style>