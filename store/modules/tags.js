import tagsApi from "../../utils/api/tags";
const state = {
	sexList: [{
			name: "女孩",
			value: 0
		},
		{
			name: "男孩",
			value: 1
		}
	],
	ageList: [
		"0～3个月",
		"3～6个月",
		"6～12个月",
		"1～2岁",
		"3岁",
		"4岁",
		"5岁",
		"6岁",
		"7岁",
		"8岁",
		"9岁",
		"10岁",
		"11岁",
		"12岁",
		"13岁",
		"14岁",
		"15岁",
		"16岁",
		"17岁",
		"18岁",
		"19岁",
		"20岁",
	],
	experienceVaccineList: [{
			name: "已接种",
			value: 0
		},
		{
			name: "接种中",
			value: 1
		},
		{
			name: "未接种",
			value: 0
		},
	],
	experienceList: [{
			name: "已经",
			value: 0
		},
		{
			name: "没有",
			value: 1
		},
		// {
		// 	name: "不详",
		// 	value: 3
		// },
	],
	typeList: [{
			name: "汪汪",
			value: 1
		},
		{
			name: "喵喵",
			value: 0
		},
		// {
		// 	name: "其他",
		// 	value: 2
		// },
	],
	duringList: [{
			name: "流浪",
			value: 0
		},
		{
			name: "救助",
			value: 1
		},
		{
			name: "就医",
			value: 2
		},
		{
			name: "康护",
			value: 3
		},
		{
			name: "中途",
			value: 4
		},
		{
			name: "领养",
			value: 5
		},
		{
			name: "培训",
			value: 6
		},
		{
			name: "在家",
			value: 7
		},
		{
			name: "外星",
			value: 8
		},
	],
	bodyTypeList: [{
			name: "大型",
			value: 0
		},
		{
			name: "中型",
			value: 1
		},
		{
			name: "小型",
			value: 2
		},
		{
			name: "迷你",
			value: 3
		},
	],
	featherList: [{
			name: "长毛",
			value: 0
		},
		{
			name: "短毛",
			value: 1
		},
		{
			name: "卷毛",
			value: 2
		},
		{
			name: "无毛",
			value: 3
		},
	],
	adoptList: [{
			name: "等待领养",
			value: 0
		},
		{
			name: "不领养",
			value: 1
		},
	],
	limitSameCityList: [{
			name: "限同城",
			value: 1
		},
		{
			name: "不限",
			value: 0
		},
	],
	characterList: [{
			name: "平静",
			value: 0,
		},
		{
			name: "温柔",
			value: 1,
		},
		{
			name: "活泼",
			value: 2,
		},
		{
			name: "聪明",
			value: 3,
		},
		{
			name: "谨慎",
			value: 4,
		},
		{
			name: "会看家",
			value: 5,
		},
		{
			name: "不挑食",
			value: 6,
		},
		{
			name: "讲卫生",
			value: 7,
		},
		{
			name: "小甜心",
			value: 8,
		},
		{
			name: "爱运动",
			value: 9,
		},
		{
			name: "高冷",
			value: 10,
		},
		{
			name: "亲人",
			value: 11,
		},
	],
	// 动物健康标签
	healthTag: ['绝育', '驱虫', '免疫'],
	// 动物外形标签
	shapeTag: ['卷毛', '长毛', '短毛', '黑色', '黄色', '棕色', '白色', '花色'],
	// 动物性格标签
	characterTag: ['安静', '温柔', '活泼', '易怒', '孤僻', '聪明', '不挑食', '会看家', '无攻击性', '胆小', '高冷', '不乱叫', '亲人'],
	// 动物救助标签
	succorTag: ['流浪', '救助', '就医', '康复', '培训', '中途', '领养', '在家', '外星'],
	// 动物视频发布状态
	videoPublicStatus: ['审核中', '审核通过', '审核不通过', '发布中', '发布失败', '发布通过'],

	// 动物性别
	animalSex: [{
			id: 0,
			label: '女孩'
		},
		{
			id: 1,
			label: '男孩'
		},
	],
	// 动物类型
	animalTypes: [{
			id: 0,
			label: '喵喵'
		},
		{
			id: 1,
			label: '汪汪'
		},
	],
	// 是否限制本地领养
	sameOrigin: [{
			id: true,
			label: '是'
		},
		{
			id: false,
			label: '否'
		},
	],
	// 是否被领养
	isAdopted: [{
			id: 0,
			label: '等待领养'
		},
		{
			id: 1,
			label: '正在被领养'
		},
		{
			id: 2,
			label: '已被领养'
		},
		{
			id: 3,
			label: '不需要领养'
		}
	]
}

const mutations = {
	updateHealthTag(state, params) {
		state.healthTag = params
	},
	updateShapeTag(state, params) {
		state.shapeTag = params
	},
	updateCharacterTag(state, params) {
		state.characterTag = params
	},
	updateSuccorTag(state, params) {
		state.succorTag = params
	}
}

const actions = {
	getTags({
		commit
	}) {
		tagsApi.getHealthyList().then(res => {
			commit.updateHealthTag(res.result)
		})
		tagsApi.getShapeList().then(res => {
			commit.updateShapeTag(res.result)
		})
		tagsApi.getCharacterList().then(res => {
			commit.updateCharacterTag(res.result)
		})
		tagsApi.getSuccorList().then(res => {
			commit.updateSuccorTag(res.result)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
