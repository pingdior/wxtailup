<template>
  <view class="w-page page-organzitaion-edit">
    <uni-list>
      <!-- <view v-if="formData.id">
        <view>背景图</view>
        <view class="image-box-wrapper">
          <image
            @click="removeImage(index)"
            class="image-box"
            v-for="(item, index) in imageList"
            :src="item"
            :key="item"
          />
          <view @click="chooseImage" class="is-add-container image-box">
            <view class="is-add">
              <view class="add-line"></view>
              <view class="add-line rotate"></view>
            </view>
            <text class="add-text">上传图片</text>
          </view>
        </view>
      </view> -->
      <!-- <uni-list-item
        v-if="formData.id"
        showArrow
        title="头像"
        data-required="true"
        class="list-item__avator"
      >
        <template slot="footer">
          <image
            class="slot-image"
            :src="userImage || defaultImage"
            mode="widthFix"
            @click="chooseAvator"
          ></image>
        </template>
      </uni-list-item> -->
      <uni-list-item
        showArrow
        title="毛窝名称"
        clickable
        @click="onClick('name')"
        :rightText="formData.name"
        data-required="true"
      />
      <!-- <uni-list-item
        v-if="formData.id"
        showArrow
        title="负责人姓名"
        clickable
        @click="onClick('manager')"
        :rightText="formData.manager"
        data-required="true"
      /> -->
      <!-- <uni-list-item
        v-if="formData.id"
        showArrow
        title="手机号"
        clickable
        @click="onClick('mobile')"
        :rightText="formData.mobile"
        data-required="true"
      /> -->
      <!-- <uni-list-item
        v-if="formData.id"
        showArrow
        title="微信号"
        :rightText="formData.weixin"
      /> -->
      <uni-list-item
        showArrow
        title="地址"
        clickable
        @click="onClick('addr')"
        :rightText="formData.addr"
        data-required="true"
      />
      <!-- <uni-list-item
        v-if="formData.id"
        showArrow
        title="实名认证"
        :rightText="formData.certification ? '已实名' : '未实名'"
        data-required="true"
      /> -->
      <uni-list-item
        showArrow
        title="简介"
        clickable
        @click="onClick('intro')"
        :rightText="formData.intro"
        data-required="true"
      />
      <uni-list-item
        v-if="formData.id"
        showArrow
        title="答疑"
        :rightText="formData.answer"
        :to="`./faqList?id=` + formData.id"
      />
    </uni-list>
    <view class="button-wrapper">
      <button @click="onConfirm">完成</button>
    </view>
  </view>
</template>

<script>
// import appConfig from "../../config";
const appConfig = require("../../config.js");
const globalConst = require("../../utils/service");
const api = require("../../utils/api/organization.js");
export default {
  components: {},
  data() {
    return {
      defaultImage: "../../static/images/default_avator.png",
      userImage: "",
      imageList: [],
      formData: {
        id: "", // 机构id
        backgroundPics: [],
        avator: "", // 头像
        name: "", // 基地名称
        manager: "", // 负责人
        mobile: "", // 手机号
        weixin: "", // 微信号
        addr: "", // 地址
        certification: false, // 实名认证
        intro: "", // 简介
        answer: "", // 答疑
        isEdit: false,
      },
      formItemPlaceHolder: {
        name: "基地名称",
        manager: "负责人姓名",
        mobile: "手机号",
        addr: "地址",
        intro: "简介",
      },
	  uploadUrl:globalConst.baseUrl,
    };
  },
  methods: {
    // 获取编辑信息
    getData() {
      api
        .getBaseInfo({
          baseId: this.formData.id,
        })
        .then((res) => {
          console.log(res, "ddd");
          // this.imageList = res.result.imageIds.map(item => appConfig.baseImageUrl + item);
          this.formData = res.result;
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
        type: ["intro", "addr"].includes(key) ? "textarea" : "text",
      };
      console.log(this.formData, key);

      uni.navigateTo({
        url: "./editFormItem",
      });
      // :to="`./editFormItem`"
    },
    // 移除单个背景图
    removeImage(index) {
      this.imageList.splice(index, 1);
    },
    // 选择背景图
    chooseImage() {
      uni.chooseImage({
        count: 9, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          console.log(res);
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
			const curUrl = this.uploadUrl+"/upload/base/image";
            uni.uploadFile({
              url: curUrl,
              filePath: item.path,
              header: {
                "Access-Token": this.$store.state.user.token,
              },
              name: "image",
              success: (uploadFileRes) => {
                console.log(uploadFileRes);
                let data = JSON.parse(uploadFileRes.data);
                this.formData.imageIds.push(appConfig.baseImageUrl + data.result);
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
          console.log(res);
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
			const curUrl = this.uploadUrl+"/upload/base/image";
            uni.uploadFile({
              url: curUrl,
              filePath: item.path,
              header: {
                "Access-Token": this.$store.state.user.token,
              },
              name: "image",
              success: (uploadFileRes) => {
                console.log(uploadFileRes);
                let data = JSON.parse(uploadFileRes.data);
                this.formData.headImageId = appConfig.baseImageUrl + data.result;
              },
            });
          });
        },
      });
    },
    onConfirm() {
      console.log("完成", this.formData);
      api.postBase(this.formData).then((res) => {
        let message = "新增成功";
        if (this.formData.id) {
          message = "修改成功";
        }
		console.log("enter onConfirm res:",res);
        uni.showToast({
          duration: 2000,
          title: message,
        });
        // 触发前一页的更新
        let pages = getCurrentPages(); //获取所有页面栈实例列表
        let prevPage = pages[pages.length - 2]; //上一页页面实例
        setTimeout(() => {
          uni.navigateBack({
            delta: 1,
            success: function () {
              try {
                prevPage.$vm.initData();
                prevPage.$vm.$refs.userRef.getUserInfo();
				console.log("enter onConfirm success!");
              } catch (e) {
				console.log("enter onConfirm fail!");
                console.log(e);
              }
            },
          });
        }, 2000);
      });
    },
  },

  onShow() {
    console.log("show");
    // 展示编辑信息
    // 如果正在编辑就不请求接口
    if (this.formData.isEdit) {
      uni.getStorage({
        key: "origanzationData",
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
      key: "origanzationData",
      data: this.formData,
    });
  },
  onLoad(options) {
    console.log(options);
    if (options.organizationId) {
      this.formData.id = options.organizationId;
      this.getData();
    }
    console.log("load");
  },
  onUnload() {
    console.log("unload");
    // let pages = getCurrentPages(); //获取所有页面栈实例列表
    // let prevPage = pages[pages.length - 2]; //上一页页面实例
    // console.log(prevPage);
    // try {
    //   prevPage.$vm.initData();
    //   prevPage.$vm.$refs.userRef.getUserInfo();
    // } catch (e) {
    //   console.log(e);
    // }
    uni.removeStorage({
      key: "origanzationData",
    });
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

.page-organzitaion-edit .uni-list::before {
  display: none !important;
}
.page-organzitaion-edit .uni-list::before,
.page-organzitaion-edit .uni-list::after,
.page-organzitaion-edit .uni-list--border-top {
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
</style>