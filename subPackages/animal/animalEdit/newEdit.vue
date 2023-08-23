<template>
	<view class="w-page page-animal-edit">
		<view class="w-form-item w-column">
			<view class="title">背景图</view>
			<view class="image-box-wrapper">
				<image @click="removeImage(index)" class="image-box" v-for="(item, index) in imageList" :src="item"
					:key="index" mode="center" />
				<view @click="chooseImage" class="is-add-container image-box">
					<view class="is-add">
						<view class="add-line"></view>
						<view class="add-line rotate"></view>
					</view>
					<text class="add-text">上传图片</text>
				</view>
			</view>
		</view>
		<uni-forms :rules="rules" :value="formData" ref="formData" validate-trigger="bind" err-show-type="undertext">
			<uni-forms-item name="headImageId" required>
				<view class="w-form-item w-column row-baseInfo">
					<view class="title" data-required="true">头像</view>
					<image v-model="formData.headImageId" class="slot-image" :src="formData.headImageId || defaultImage"
						mode="center" @click="chooseAvator" />
				</view>
			</uni-forms-item>
			<uni-forms-item name="name" required>
				<view class="w-form-item w-column row-baseInfo">
					<view class="title" data-required="true">昵称</view>
					<input v-model="formData.name" placeholder="请输入昵称" @input="onKeyInputNickName" maxlength="10" />
				</view>
			</uni-forms-item>
			<uni-forms-item name="identityCode" required>
				<view class="w-form-item w-column row-baseInfo">
					<view class="title">身份号</view>
					<text v-model="formData.identityCode"
						@click="onClick('identityCode')">{{formData.identityCode?formData.identityCode:"点击创建身份号"}}</text>
				</view>
			</uni-forms-item>
			<uni-forms-item name="age" required>
				<view class="w-form-item w-column row-baseInfo">
					<view class="title" data-required="true">年龄</view>
					<picker mode="selector" v-model="formData.age" @change="bindPickerChange"
						:value="ageList.indexOf(formData.age)" :range="ageList">
						<view class="uni-input">{{formData.age}}</view>
					</picker>
				</view>
			</uni-forms-item>
			<uni-forms-item name="type" required>
				<view class="w-form-item w-column">
					<view class="title" data-required="true">类别</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in typeList" :key="index"
							:class="{ active: item.value == formData.type }" @click="choose(item, 'type')">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="type" required>
				<view class="w-form-item w-column">
					<view class="title" data-required="true">性别</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in sexList" :key="index"
							:class="{ active: item.value == formData.sex }" @click="choose(item, 'sex')">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="during" required>
				<view class="w-form-item w-column">
					<view class="title" data-required="true">当前生命时期</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in duringList" :key="index"
							:class="{ active: item.name == formData.succorStatus }"
							@click="choose(item,'succorStatus',2)">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="sterList" required>
				<view class="w-form-item w-column">
					<view class="title" data-required="true">绝育</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in experienceList" :key="index"
							:class="{ active: curSterList.includes(item.name) }" @click="choose(item,'curSterList',3)">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="helminList" required>
				<view class="w-form-item w-column">
					<view class="title" data-required="true">驱虫</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in experienceList" :key="index"
							:class="{ active: curHelminList.includes(item.name) }"
							@click="choose(item,'curHelminList',3)">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="vacciList" required>
				<view class="w-form-item w-column">
					<view class="title" data-required="true">疫苗</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in experienceVaccineList" :key="index"
							:class="{ active: curVacciList.includes(item.name) }"
							@click="choose(item,'curVacciList',3)">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="" required>
				<view class="w-form-item w-column row-baseInfo">
					<view class="title">来基地日期</view>
					<picker mode="date" :value="formData.succorTime" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input">{{formData.succorTime}}</view>
					</picker>
				</view>
			</uni-forms-item>
			<uni-forms-item name="bodyList" required>
				<view class="w-form-item w-column">
					<view class="title">体型</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in bodyTypeList" :key="index"
							:class="{ active: curBodyTypeList.includes(item.name) }"
							@click="choose(item,'curBodyTypeList',3)">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="featherList" required>
				<view class="w-form-item w-column">
					<view class="title">毛发</view>
					<view class="column-wrapper">
						<button v-for="(item, index) in featherList" :key="index"
							:class="{ active: curFeatherList.includes(item.name) }"
							@click="choose(item,'curFeatherList',3)">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="characterList" required>
				<view class="w-form-item w-column">
					<view class="title">性格</view>
					<view class="column-wrapper">
						<button ref="characterList" v-for="(item, index) in characterList" :key="index"
							:class="{ active: curCharacterList.includes(item.name) }"
							@click="choose(item,'curCharacterList',3)">
							{{ item.name }}
						</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="intro" required>
				<view class="w-form-item w-column ">
					<view class="title">简介</view>
					<textarea v-model="formData.intro" placeholder="你感受到的TA" @input="onKeyInputIntro" maxlength="128" />
				</view>
			</uni-forms-item>
			<view class="row-baseInfo">
				<uni-forms-item name="adopted" required>
					<view class="title">等待领养</view>
					<switch v-if="formData.isAdopted===0 || formData.isAdopted==null || formData.isAdopted===1" checked @change="switch1Change" />
					<switch v-else-if="formData.isAdopted===2 || formData.isAdopted===3 " @change="switch2Change" />
				</uni-forms-item>
				<uni-forms-item name="sameCity" required>
					<view class="title">只限本地领养</view>
					<switch v-if="formData.isAdopted===2 || formData.isAdopted===3  " disabled="false" />
					<switch v-else-if="formData.sameOrigin===true || formData.sameOrigin==null" checked
						@change="switch3Change" />
					<switch v-else="formData.sameOrigin===false" @change="switch4Change" />
				</uni-forms-item>
			</view>
		</uni-forms>
		<view class="button-wrapper">
			<button @click="submitForm('formData')">完成</button>
		</view>
	</view>
</template>

<script>
	import api from "../../../utils/api/index";
	const apiAnimal = require("../../../utils/api/animal");
	const globleConst = require("../../../utils/service");

	import appConfig from "../../../config";
	import {
		mapState
	} from "vuex";
	import {
		isEmpty,
		getDate,
		chooseImageFormat,
	} from "../../../utils/util";

	export default {
		data() {
			return {
				rules: {
					headImageId:{
						rules: [{
							required: true,
							format: "text",
							errorMessage: "请上传动物头像！",
						}]
					},
					name:{
						rules: [{
							required: true,
							format: "text",
							maxLength: 16,
							errorMessage: "请填写动物名称，小于{maxLength}个字符！",
						}]
					},
					sex: {
						rules: [{
							required: true,
							format: "integer"
						}]
					},
					type: {
						rules: [{
							required: true,
							format: "integer"
						}]
					},
					during: {
						rules: [{
							required: true,
							format: "text"
						}]
					},
					sterList: {
						rules: [{
							required: true,
							format: "text"
						}]
					},
					helminList: {
						rules: [{
							required: true,
							format: "text"
						}]
					},
					vacciList: {
						rules: [{
							required: true,
							format: "text"
						}]
					},
					bodyList: {
						rules: [{
							format: "text"
						}]
					},
					featherList: {
						rules: [{
							format: "text"
						}]
					},
					characterList: {
						rules: [{
							format: "text"
						}]
					},
					intro: {
						rules: [{
							maxLength: 1024,
							errorMessage: "地址长度需要小于{maxLength}个字符",
						}, ],
					},
				},
				animalId: "",
				baseId: "", // 基地id
				defaultImage: "../../static/images/default_avator.png",
				imageList: [],
				imageIds: [],
				formData: {
					age: "1岁", //	年龄		text
					baseId: "", //	基地ID		false integer
					characterDesc: "", //	性格介绍，性格标签组成的字符串,多个/分割		false	 string
					headImageId: "", //	存储在CDN上的文件ID,动物头像		false	string
					healthStatus: "", //	健康状态，健康标签组成的字符串,多个用/分割		false	string
					id: "", //	动物ID，更新时不能为null		false	 integer
					identityCode: "", // 动物身份号，对外ID，WBQ三个首字母打头，更新时不能为null  false  integer
					intro: "", //	动物救助过程和现状介绍		false	 string
					isAdopted: 0, //	是否被领养 3 不需要领养 2 已被领养 1 正被申请领养 0 等待领养	false	 integer
					name: "", //	昵称		false	 string
					sameOrigin: true, //	是否限制本地领养 1 是 0 否		false	 integer
					sex: 0, //	公 1，母 0		false	 integer
					shapeDesc: "", //	外形介绍，外形标签组成的字符串,多个/分割		false	 string
					succorStatus: "流浪", //	当前状态（单选），救助标签组成的字符串		false	 string
					succorTime: getDate, //	救助时间		false	 string
					type: 0, //	动物种类 0 猫 1 狗		false	integer
					isDelete: false,
					isEdit: false,
					petId: "",
				},
				curSterList: [], // 当前绝育状态
				curHelminList: [], // 当前驱虫状态
				curVacciList: [], // 当前疫苗状态
				curBodyTypeList: [], // 当前形态
				curFeatherList: [], // 当前毛发
				curCharacterList: [], // 当前性格
				formItemPlaceHolder: {
					name: "昵称",
					intro: "简介",
					age: "年龄",
					sex: "性别",
					identityCode: "身份号",
					healthStatus: "常规医疗",
					succorTime: "来基地日期",
					succorStatus: "时期",
					shapeDesc: "外形",
					characterDesc: "性格",
					sameOrigin: "只限本地领养",
					type: "动物种类",
					isAdopted: "等待领养",
				},
				uploadFileUrl: globleConst.baseUrl, // 上传地址
				index: 0,
				startDate: getDate('startDate'),
				endDate: getDate('endDate'),
			};
		},
		computed: {
			...mapState({
				sexList: (state) => state.tags.sexList, // 动物性别
				typeList: (state) => state.tags.typeList, // 动物类型
				ageList: (state) => state.tags.ageList,
				experienceVaccineList: (state) => state.tags.experienceVaccineList,
				experienceList: (state) => state.tags.experienceList,
				duringList: (state) => state.tags.duringList,
				bodyTypeList: (state) => state.tags.bodyTypeList,
				featherList: (state) => state.tags.featherList,
				adoptList: (state) => state.tags.adoptList,
				limitSameCityList: (state) => state.tags.limitSameCityList,
				characterList: (state) => state.tags.characterList,
			}),
			headImageId() {
				if (this.formData.headImageId) {
					return this.formData.headImageId;
				}
			},
		},
		onReady() {
			this.$refs.formData.setRules(this.rules);
		},
		methods: {
			initData() {
				console.log("获取动物信息");
				if (isEmpty(this.animalId)) {
					this.getCurTagList("没有", 1);
					this.getCurTagList("没有", 2);
					this.getCurTagList("未接种", 3);
				} else {
					apiAnimal
						.getAnimalHomeInfo({
							animalId: this.animalId,
						})
						.then((res) => {
							console.log(res);
							this.imageIds = res.result.imageIds;
							this.imageIds.forEach((item) => {
								this.imageList.push(item);
							});
							this.formData = res.result;
							this.formData.id = this.animalId;
							// 补充动物身份号赋值
							this.formData.identityCode = res.result.identityCode;
							this.formData.petId = res.result.petId;
							this.formData.sameOrigin = res.result.sameOrigin;
							this.formData.isAdopted = res.result.isAdopted;
							this.formData.characterDesc = res.result.characterDesc;
							this.formData.healthStatus = res.result.healthStatus;
							this.formData.shapeDesc = res.result.shapeDesc;
							this.formData.succorStatus = res.result.succorStatus; // 救助状态
							this.formData.intro = res.result.intro;

							//获取当前标签格式数组值
							this.getCurTagList(this.formData.healthStatus, 1);
							this.getCurTagList(this.formData.healthStatus, 2);
							this.getCurTagList(this.formData.healthStatus, 3);
							this.getCurTagList(this.formData.shapeDesc, 4);
							this.getCurTagList(this.formData.shapeDesc, 5);
							this.getCurTagList(this.formData.characterDesc, 6);

						});
				}
			},
			// 移除单个背景图
			removeImage(index) {
				this.imageList.splice(index, 1);
				this.imageIds.splice(index, 1);
			},
			bindDateChange: function(e) {
				this.formData.succorTime = e.target.value
			},
			onKeyInputNickName: function(event) {
				this.formData.name = event.target.value
			},
			onKeyInputIntro: function(event) {
				this.formData.intro = event.target.value
			},
			onClick(key) {
				this.formData.isEdit = true;
				this.formData.editItem = {
					placeholder: this.formItemPlaceHolder[key],
					key: key,
					type: this.getInputType(key),
				};
				console.log(this.formData, key);

				uni.navigateTo({
					url: "./editFormItem",
				});
			},
			getInputType(key) {
				if (["age"].includes(key)) return "number";
				if (["identityCode"].includes(key)) return "camera";
				if (["succorTime"].includes(key)) return "date";
				if (
					["characterDesc", "healthStatus", "shapeDesc", "succorStatus"].includes(
						key
					)
				)
					return "tags";
				if (["intro"].includes(key)) return "textarea";
				if (["isAdopted", "sameOrigin", "sex", "type"].includes(key))
					return "picker";
				return "input";
			},
			// 输入枚举列表和选择列表，获得指定类型转换数组
			// curSaveList 从接口获取到的当前标签
			// type值 1 绝育 2 驱虫 3 疫苗 4 体型 5 毛发 6 性格特点
			// 让后台的存储保持原来的格式，healthStatus和shapeDesc，charaterDesc 维度为6个维度
			getCurTagList(curSaveList, type) {
				console.log("enter getCurTagList curSaveList!", curSaveList);
				if ((type === 4 || type === 5 || type === 6) && isEmpty(curSaveList)) return;
				console.log("enter getCurTagList curList next!");
				var curList = curSaveList.split("/");
				console.log("enter getCurTagList curList:", curList);

				var tag;
				var curTagList; // 当前类型的枚举集合
				var curResTagList; // 变换结果数组
				var curDefault;

				switch (type) {
					case 1: {
						for (tag in curList) {
							if (curList[tag] === "绝育") {
								console.log("case 1 已经！");
								this.curSterList.push("已经");
								break;
							}
						}
						if (this.curSterList.length < 1) {
							console.log("case 1 没有！");
							this.curSterList.push("没有");
						}
						break;
					}
					case 2: {
						for (tag in curList) {
							if (curList[tag] === "驱虫") {
								console.log("case 2 已经！");

								this.curHelminList.push("已经");
								break;
							}
						}
						if (this.curHelminList.length < 1) {
							console.log("case 2 没有！");
							this.curHelminList.push("没有");
						}
						break;
					}
					case 3: {
						for (tag in curList) {
							if (curList[tag] === "疫苗") {
								console.log("case 3 已接种！");

								this.curVacciList.push("已接种");
								break;
							} else if (curList[tag] === "疫苗中") {
								console.log("case 3 接种中！");

								this.curVacciList.push("接种中");
								break;
							}
						}
						if (this.curVacciList.length < 1) {
							console.log("case 3 未接种！");

							this.curVacciList.push("未接种");
						}
						break;
					}
					case 4: {
						var index;
						for (tag in curList) {
							for (index in this.bodyTypeList) {
								if (this.bodyTypeList[index].name.search(curList[tag]) > -1) {
									console.log("case 4 tag,index:", curList[tag], this.bodyTypeList[index].name);

									this.curBodyTypeList.push(this.bodyTypeList[index].name);
								}
							}

						}
						break;
					}
					case 5: {
						var index;
						for (tag in curList) {
							for (index in this.featherList) {
								if (this.featherList[index].name.search(curList[tag]) > -1) {
									console.log("case 5 tag,index:", curList[tag], this.featherList[index].name);

									this.curFeatherList.push(this.featherList[index].name);
								}
							}

						}
						break;
					}
					case 6: {
						var index;
						for (tag in curList) {
							for (index in this.characterList) {
								if (this.characterList[index].name.search(curList[tag]) > -1) {
									console.log("case 6 tag,index:", curList[tag], this.characterList[index].name);
									this.curCharacterList.push(this.characterList[index].name);
								}
							}

						}
						break;
					}
				};
			},
			// 输入6个特征的1 绝育 2 驱虫 3 疫苗 4 体型 5 毛发 6特征，获得指定类型转换数组
			// 让后台的存储保持原来的格式 healthStatus和shapeDesc，charaterDesc 
			set6Chara2formData3Chara() {
				// 清空原来的数值
				this.formData.characterDesc = "";
				this.formData.healthStatus = "";
				this.formData.shapeDesc = "";
				// 使用当前选择的值：性格
				var index;
				for (index in this.curCharacterList) {
					if (this.formData.characterDesc.length > 0) {
						this.formData.characterDesc += '/';
					}
					this.formData.characterDesc += this.curCharacterList[index];
				}
				// 外型
				for (index in this.curBodyTypeList) {
					if (this.formData.shapeDesc.length > 0) {
						this.formData.shapeDesc += '/';
					}
					this.formData.shapeDesc += this.curBodyTypeList[index];
				}
				for (index in this.curFeatherList) {
					if (this.formData.shapeDesc.length > 0) {
						this.formData.shapeDesc += '/';
					}
					this.formData.shapeDesc += this.curFeatherList[index];
				}
				// 健康
				for (index in this.curSterList) {
					if (this.curSterList[index].search("已经") > -1) {

						if (this.formData.healthStatus.length > 0) {
							this.formData.healthStatus += '/';
						}
						this.formData.healthStatus += "绝育";
					}
				}
				for (index in this.curHelminList) {
					if (this.curHelminList[index].search("已经") > -1) {

						if (this.formData.healthStatus.length > 0) {
							this.formData.healthStatus += '/';
						}
						this.formData.healthStatus += "驱虫";
					}
				}
				for (index in this.curVacciList) {
					if (this.curVacciList[index].search("已接种") > -1) {

						if (this.formData.healthStatus.length > 0) {
							this.formData.healthStatus += '/';
						}
						this.formData.healthStatus += "疫苗";
					} else if (this.curVacciList[index].search("接种中") > -1) {
						if (this.formData.healthStatus.length > 0) {
							this.formData.healthStatus += '/';
						}
						this.formData.healthStatus += "疫苗中";
					}
				}
			},
			switch1Change: function(e) {
				console.log('switch1 领养状态从等待领养到不需要领养', e.target.value);
				this.formData.isAdopted = 3;
			},
			switch2Change: function(e) {
				console.log('switch2 领养状态从不需要领养到等待领养', e.target.value);
				this.formData.isAdopted = 0;
			},
			switch3Change: function(e) {
				console.log('switch3 同城限制从限制到不限制', e.target.value);
				this.formData.sameOrigin = false;
			},
			switch4Change: function(e) {
				console.log('switch4 同城限制从不限制到限制', e.target.value);
				this.formData.sameOrigin = true;
			},
			// 单选选中 
			// type=1 mode this.formData[key] = item.value;
			// type=2 mode this.formData[key] = item.name;
			// type=3 mode this.curList = item.name;
			choose(item, key, type = 1) {
				// this.form[key] = item.name;
				if (type === 1) {
					this.formData[key] = item.value;
				} else if (type === 2) {
					this.formData[key] = item.name;
				} else if (type === 3) {
					if (key === 'curCharacterList') {
						if (this.curCharacterList.includes(item.name)) {
							console.log("curCharacterList length index: ", this.curCharacterList.length, this
								.curCharacterList.indexOf(item.name));
							var curIndex = this.curCharacterList.indexOf(item.name);
							delete this.curCharacterList[curIndex];
							this.curCharacterList.sort();
							this.curCharacterList.pop();
							console.log("curCharacterList length index: ", this.curCharacterList.length);
						} else {
							this.curCharacterList.push(item.name);
						}
					} else {
						console.log("key.length:", key);
						var curList;
						switch (key) {
							case 'curSterList':
								curList = this.curSterList;
								break;
							case 'curHelminList':
								curList = this.curHelminList;
								break;
							case 'curVacciList':
								curList = this.curVacciList;
								break;
							case 'curFeatherList':
								curList = this.curFeatherList;
								break;
							case 'curBodyTypeList':
								curList = this.curBodyTypeList;
								break;
						}
						if (curList.length > 0) {
							curList.push(item.name);
							curList.shift();
						} else {
							curList.push(item.name);
						}
					}
				}

			},
			// 重置表单
			formReset: function(e) {
				console.log("清空数据");
			},
			change(name, value) {
				console.log("change改变数据！");
				this.formData.checked = value;
				this.$refs.formData.setValue(name, value);
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.formData.age = this.ageList[e.target.value];
			},
			/**
			 * 手动提交
			 * @param {Object} formData
			 */
			submitForm(form) {
				// console.log(this.formData);
				this.$refs[form]
					.validate()
					.then((res) => {
						console.log("表单的值：", res);
						// 装入最新formData
						this.set6Chara2formData3Chara();
						apiAnimal
							.postAnimalBasicInfo({
								animal: this.formData,
								imageIds: this.imageIds,
							})
							.then((res) => {
								let message = "新增成功";
								if (this.formData.id) {
									message = "修改成功";
								}
								uni.showToast({
									duration: 2000,
									title: message,
								});
								console.log("postAnimalBasicInfo result", res);
								setTimeout(() => {
									try {
										// 触发前一页的更新
										let pages = getCurrentPages(); //获取所有页面栈实例列表
										// let nowPage = pages[ pages.length - 1];  //当前页页面实例
										let prevPage = pages[pages.length - 2]; //上一页页面实例
										prevPage.$vm.initData();
										// prevPage.$vm.$refs.userRef.getUserHomeInfo();
									} catch (e) {
										console.log(e);
									}
									uni.navigateBack({
										delta: 1,
									});
								}, 2000);
							});
					})
					.catch((errors) => {
						console.error("验证失败：", errors);
					});
			},
			// 选择背景图
			chooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: (res) => {
						console.log("enter chooseImage sucess:", res);
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
							if(!chooseImageFormat(item.path))
							{
								console.log("wrong picture path",item.path);
								return;
							}
							this.imageList.push(item.path);
							const currentUrl = this.uploadFileUrl + "/upload/animal/image"
							uni.uploadFile({
								url: currentUrl,
								filePath: item.path,
								header: {
									"Access-Token": this.$store.state.user.token,
								},
								name: "image",
								success: (uploadFileRes) => {
									console.log(uploadFileRes);
									if (uploadFileRes.statusCode === 200) {
										let data = JSON.parse(uploadFileRes.data);
										this.imageIds.push(appConfig.baseImageUrl + data
											.result);
									} else {
										console.log("uploadFileRes fail statuCode:",
											uploadFileRes.statusCode);
									}
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
						console.log("enter chooseAvator res:", res);
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
							if(!chooseImageFormat(item.path))
							{
								console.log("wrong picture path",item.path);
								return;
							}
							this.userImage = item.path;
							const currentUrl = this.uploadFileUrl + "/upload/animal/image"
							console.log(
								"enter chooseAvatar tempath,currentUrl,appConfig.baseImageUrl:",
								this.userImage, currentUrl, appConfig.baseImageUrl);
							uni.uploadFile({
								url: currentUrl,
								filePath: item.path,
								header: {
									"Access-Token": this.$store.state.user.token,
								},
								name: "image",
								success: (uploadFileRes) => {
									console.log("chooseAvator uploadFile success:",
										uploadFileRes);
									if (uploadFileRes.statusCode === 200) {
										let data = JSON.parse(uploadFileRes.data);
										this.formData.headImageId =
											appConfig.baseImageUrl + data.result;
									} else {
										console.log("uploadFileRes fail statuCode:",
											uploadFileRes.statusCode);
									}
								},
								// fail: (f) => {
								// 	console.log("upload fail", f);
								// },
							});
						});
					},
					// fail: (fail) => {
					// 	console.log("choose fail", fail);
					// },
				});
			},
		},
		onShow() {
			console.log("show");
			// 展示编辑信息
			// 如果正在编辑就不请求接口
			if (this.formData.isEdit) {
				uni.getStorage({
					key: "animalData",
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
				key: "animalData",
				data: this.formData,
			});
		},
		onLoad: function(options) {
			console.log(options, "adopt-options");
			if (options.animalId) {
				this.formData.id = options.animalId;
				this.animalId = options.animalId;
			}
			if (options.baseId) {
				this.formData.baseId = options.baseId;
			}
			if (options.userId) {
				this.formData.userId = options.userId;
			}
			this.initData();
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
	.w-page {
		padding: 16rpx 32rpx;
		background-color: #fff;
		height: auto;
	}

	.page-animal-edit .uni-list::before {
		display: none !important;
	}

	.image-box-wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.image-box {
		width: 160rpx;
		height: 160rpx;
		background: #f7f7f7;
		border-radius: 8px;
		margin: 4rpx;
	}

	.image-box-wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.w-form-item {}

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

	.row-baseInfo {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: nowrap;
	}

	.list-item__avator {
		line-height: 60rpx;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		width: 60rpx;
		height: 60rpx !important;
		border-radius: 50%;
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

	.checkbox[aria-checked="true"]+.w-checkbox {
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

	.uni-list-cell-left {
		white-space: nowrap;
		font-size: 28rpx;
		padding: 0 30rpx;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}
</style>
