<template>
  <view class="w-page">
    <uni-forms
      :rules="rules"
      :value="formData"
      ref="form"
      validate-trigger="bind"
      err-show-type="undertext"
    >
      <uni-forms-item name="ask" required label="问题">
        <uni-easyinput
          type="text"
          v-model="formData.ask"
          placeholder="请输入问题"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="answer" required label="回答">
        <uni-easyinput
          type="textarea"
          v-model="formData.answer"
          :maxlength="500"
          placeholder="请输入回答"
        ></uni-easyinput>
      </uni-forms-item>
      <view class="button-wrapper">
        <button @click="submitForm('form')">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
const api = require("../../utils/api/organization.js");
export default {
  data() {
    return {
      baseId: "", // 基地id
      index: "", // 编辑的问题序号
      list: [], // 答疑列表
      formData: {
        ask: "",
        answer: "",
      },
      rules: {
        ask: {
          rules: [
            {
              required: true,
              errorMessage: "请输入问题",
            },
            {
              minLength: 1,
              maxLength: 50,
              errorMessage: "问题长度在 {minLength} 到 {maxLength} 个字符",
            },
          ],
        },
        answer: {
          rules: [
            {
              required: true,
              errorMessage: "请输入回答",
            },
            {
              minLength: 1,
              maxLength: 500,
              errorMessage: "回答长度在 {minLength} 到 {maxLength} 个字符",
            },
          ],
        },
      },
    };
  },
  onLoad(option) {
    console.log(option);
    this.baseId = option.baseId;
    this.index = option.index;
    this.getData();
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    // 获取答疑列表
    getData() {
      api.getFaqList({ baseId: this.baseId }).then((res) => {
        this.list = res.result;
        if (this.index || this.index === "0" || this.index === 0) {
          this.formData = this.list[this.index];
        }
      });
    },
    change(name, value) {
      this.formData.checked = value;
      this.$refs.form.setValue(name, value);
    },

    /**
     * 手动提交
     * @param {Object} form
     */
    submitForm(form) {
      // console.log(this.formData);
      this.$refs[form]
        .submit()
        .then((res) => {
          console.log("表单的值：", res);
          if (!this.index && this.index !== 0) {
            this.list.push(this.formData);
          } else {
            this.list[this.index] = this.formData;
          }
          api
            .postFaqItem({
              baseId: this.baseId,
              list: this.list,
            })
            .then(() => {
              uni.showToast({
                title: "提交成功",
              });
              let pages = getCurrentPages(); //获取所有页面栈实例列表
              let prevPage = pages[pages.length - 2]; //上一页页面实例
              uni.navigateBack({
                success: function () {
                  prevPage.$vm.initData();
                },
              });
            });
        })
        .catch((errors) => {
          console.error("验证失败：", errors);
        });
    },
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

.w-page {
  padding: 16rpx 32rpx;
  background-color: #fff;
  height: auto;
}

/* #endif */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 100%;
  height: auto;
}

.uni-forms-item__inner {
  border-bottom: 1px solid #ddd;
  padding-bottom: 0 !important;
}
.uni-forms-item__label {
  width: 130rpx !important;
}

.uni-input-border,
.uni-textarea-border {
  flex: 1;
  font-size: 14px;
  color: #666;
  border: none !important;
}
.uni-easyinput__content {
  border: none !important;
}
.uni-error-message {
  display: none !important;
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