<template>
  <view class="w-page">
    <uni-forms
      :rules="rules"
      :value="form"
      ref="form"
      validate-trigger="bind"
      err-show-type="undertext"
    >
      <uni-forms-item name="sex" required>
        <view class="w-form-item w-column">
          <view class="title" data-required="true">我的性别</view>
          <view class="column-wrapper">
            <button
              v-for="(item, index) in sexList"
              :key="index"
              :class="{ active: item.value == form.sex }"
              @click="choose(item, 'sex')"
            >
              {{ item.name }}
            </button>
          </view>
        </view>
      </uni-forms-item>

      <uni-forms-item name="ageRange" required>
        <view class="w-form-item w-column">
          <view class="title" data-required="true">我的年龄</view>
          <view class="column-wrapper">
            <button
              v-for="(item, index) in ageList"
              :key="index"
              :class="{ active: item.value == form.ageRange }"
              @click="choose(item, 'ageRange')"
            >
              {{ item.name }}
            </button>
          </view>
        </view>
      </uni-forms-item>

      <uni-forms-item name="experience" required>
        <view class="w-form-item w-column">
          <view class="title" data-required="true">养宠经验</view>
          <view class="column-wrapper">
            <button
              v-for="(item, index) in experienceList"
              :key="index"
              :class="{ active: item.value == form.experience }"
              @click="choose(item, 'experience')"
            >
              {{ item.name }}
            </button>
          </view>
        </view>
      </uni-forms-item>

      <uni-forms-item name="married" required>
        <view class="w-form-item w-column">
          <view class="title" data-required="true">婚姻状况</view>
          <view class="column-wrapper">
            <button
              v-for="(item, index) in marryList"
              :key="index"
              :class="{ active: item.value === form.married }"
              @click="choose(item, 'married')"
            >
              {{ item.name }}
            </button>
          </view>
        </view>
      </uni-forms-item>
      <uni-forms-item name="housing" required>
        <view class="w-form-item w-column">
          <view class="title" data-required="true">住房状况</view>
          <view class="column-wrapper">
            <button
              v-for="(item, index) in houseList"
              :key="index"
              :class="{ active: item.value == form.housing }"
              @click="choose(item, 'housing')"
            >
              {{ item.name }}
            </button>
          </view>
        </view>
      </uni-forms-item>

      <uni-forms-item name="job" required>
        <view class="w-form-item w-column">
          <view class="title">我的职业</view>
          <input v-model="form.job" placeholder="请输入你的职业" />
        </view>
      </uni-forms-item>

      <uni-forms-item name="addr" required>
        <view class="w-form-item w-column">
          <view class="title" data-required="true">我的地址</view>
          <input v-model="form.addr" placeholder="请输入你的地址" />
        </view>
      </uni-forms-item>
      <uni-forms-item name="phone" required>
        <view class="w-form-item w-column">
          <view class="title" data-required="true">联系方式</view>
          <input v-model="form.phone" placeholder="请输入你的联系方式" />
          <text class="tips"
            >只有签署送养协议阶段才向送养人公开，方便双方沟通</text
          >
        </view>
      </uni-forms-item>
      <uni-forms-item name="remark" required>
        <view class="w-form-item w-column">
          <view class="title">给送养人的话</view>
          <textarea
            type="textarea"
            v-model="form.remark"
            placeholder="选填，介绍您的个人情况和居住环境，养宠经历等信息，会提高通过率哦。140字以内。"
          />
        </view>
      </uni-forms-item>
      <uni-forms-item name="protocal" required>
        <view class="w-form-protocol">
          <label @click="toCheckProtocal">
            <icon
              class="icon-small"
              color="#64c8b3"
              :type="form.protocal ? 'success' : 'circle'"
              size="18"
            ></icon>
            <text style="color: #9ba1aa">我已阅读，并同意遵守</text>
          </label>
          <text @click="toProtocal" class="tips">《尾巴翘陪伴动物领养规则》</text>
        </view>
      </uni-forms-item>
      <view class="button-wrapper">
        <button
          :disabled="!form.protocal"
          :type="form.protocal ? 'primary' : 'default'"
          @click="submitForm('form')"
        >
          提交申请
        </button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
import api from "../../utils/api/index";
export default {
  data() {
    return {
      sexList: [
        { name: "未知", value: 0 },
        { name: "女神", value: 1 },
        { name: "男神", value: 2 },
      ],
      ageList: [
        { name: "40后", value: 4 },
        { name: "50后", value: 5 },
        { name: "60后", value: 6 },
        { name: "70后", value: 7 },
        { name: "80后", value: 8 },
        { name: "90后", value: 9 },
        { name: "00后", value: 0 },
      ],
      experienceList: [
        { name: "无", value: 0 },
        { name: "有", value: 1 },
      ],
      marryList: [
        { name: "单身", value: 0 },
        { name: "恋爱中", value: 1 },
        { name: "已婚", value: 2 },
      ],
      houseList: [
        { name: "合租", value: 0 },
        { name: "整租", value: 1 },
        { name: "自有住房", value: 2 },
      ],
	  hasApplyAdopted:0,
      form: {
        animalId: "", // 动物id
        baseId: "", // 动物所属基地id
        sex: 1,
        ageRange: 4,
        experience: 1,
        married: 0,
        housing: 2,
        job: "",
        addr: "",
        phone: "",
        remark: "",
        protocal: false,
		id: null, // ？？
		userId: 0,
      },
      rules: {
        sex: { rules: [{ format: "number" }] },
        ageRange: { rules: [{ format: "number" }] },
        experience: { rules: [{ format: "number" }] },
        married: { rules: [{ format: "number" }] },
        housing: { rules: [{ format: "number" }] },
        addr: {
          rules: [
            { required: true, errorMessage: "请输入你的地址" },
            {
              maxLength: 100,
              errorMessage: "地址长度需要小于{maxLength}个字符",
            },
          ],
        },
        phone: {
          rules: [
            { required: true, errorMessage: "请输入你的联系方式" },
            {
              validateFunction: function (rule, value, data, callback) {
                console.log(value);
                if (!/^1\d{10}$/.test(value)) {
                  callback("请填写正确电话号码");
                }
                return true;
              },
            },
          ],
        },
      },
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
	// 获得领养情况缓存
	try {
		var keyId=hasApplyAdopted+this.form.animalId+'_'+this.form.userId;
	    const value = uni.getStorageSync('keyId');
	    if (value) {
	        console.log("getStorageSync sucess value:",value);
			this.hasApplyAdopted = value;
	    }
	} catch (e) {
	    console.log("getStorageSync fail!");
	}
	if(this.hasApplyAdopted===1)
	{
		this.form.id=0;
	}
  },
  methods: {
    // 单选选中
    choose(item, key) {
      // this.form[key] = item.name;
      this.form[key] = item.value;
      console.log(this.form);
    },
    // 勾选协议
    toCheckProtocal() {
      this.form.protocal = !this.form.protocal;
      console.log("change");
      console.log(this.form.protocal, this.type);
    },
    // 查看协议
    toProtocal() {
      console.log("enter toProtocal 展示协议");
	  uni.navigateTo({
	      url: '/subPackages/adopt/commit',
	      success: function(res) {
			  console.log("enter toProtocal success res",res);
		  },
	      fail: function(res) {
			  console.log("enter toProtocal fail res:",res);
		  },
	      complete: function(res) {
			  console.log("enter toProtocal complete res:",res);
		  },
	    });
    },
    // 重置表单
    formReset: function (e) {
      console.log("清空数据");
    },

    change(name, value) {
	  console.log("change改变数据！");
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
        .validate()
        .then((res) => {
          console.log("表单的值：", res);
          api.applyAdopt(this.form).then((res) => {
            if (res.success) {
			  try {
				  var keyId=hasApplyAdopted+this.form.animalId+'_'+this.form.userId;
			      uni.setStorageSync('keyId', 1);
			  } catch (e) {
			       console.log("hasApplyAdopted set wrong!");
			  }
              uni.showToast({
                title: "申请已提交",
              });
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1,
                });
              }, 2000);
            }
          });
        })
        .catch((errors) => {
          console.error("验证失败：", errors);
        });
    },
  },
  onLoad: function (options) {
    console.log(options, "adopt-options");
    if (options.animalId) {
      this.form.animalId = options.animalId;
    }
    if (options.baseId) {
      this.form.baseId = options.baseId;
    }
	if (options.userId) {
	  this.form.userId = options.userId;		
	}
  },
};
</script>

<style>
.w-page {
  padding: 16rpx 32rpx;
  background-color: #fff;
  height: auto;
}
.w-form-item {
}
.w-form-item .title {
  color: #303741;
  font-weight: 600;
  font-size: 18px;
  margin-top: 16rpx;
}
.title[data-required="true"]::before {
  content: "*";
  color: #ff4a4a;
  position: relative;
  top: 6rpx;
  margin-right: 6rpx;
}

button,
input {
  border-radius: 40rpx;
}

.w-form-item button,
.w-form-item input {
  border-radius: 60rpx;
  color: #9ba1aa;
  border: 1px solid #dbdbdc;
  height: 72rpx;
  font-size: 14px;
  line-height: 72rpx;
}

button.active {
  color: #FFFFFF;
  border-color: #64c8b3;
  background-color: #64c8B3;
}

.w-form-item input {
  padding-left: 32rpx;
  padding-right: 32rpx;
}
.w-form-item textarea {
  width: 624rpx;
  height: 200rpx;
  border-radius: 16rpx;
  border: 1px solid #dbdbdc;
  padding: 16rpx 32rpx;
  font-size: 14px;
}

.tips {
  font-size: 12px;
  color: #64c8b3;
}

.column-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.column-wrapper button {
  width: 218rpx;
  margin-left: 0;
  margin-right: 16rpx;
  margin-bottom: 20rpx;
}
.column-wrapper button:nth-child(3n) {
  margin-right: 0;
}

.w-form-protocol,
.w-form-protocol label {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* checkbox {
  visibility: hidden;
  width: 0;
  height: 0;
} */
.w-checkbox {
  display: inline-block;
  height: 28rpx;
  width: 28rpx;
  border-radius: 50%;
  border: 1px solid #ddd;
}

checkbox[aria-checked="true"] + .w-checkbox {
  background: #64c8b3;
}

.button-wrapper {
  margin-top: 30rpx;
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
.icon-small {
  margin-right: 4rpx;
}
</style>
