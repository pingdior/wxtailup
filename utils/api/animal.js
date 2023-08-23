const http = require("../service.js")
import MyPromise from "../promise/es6-promise"

module.exports = {
	/** -----------------------标签start--------------------- */
	/**
	 * 当前用户（非负责人）关注动物
	 * @param {animalId} string 动物id 
	 * @returns 
	 */
	animalFocus({
		animalId
	}) {
		return http.get("/animal/focus", {
			animalId
		})
	},
	/**
	 * 获取动物基本信息--(组织才能使用此接口)
	 * @param {animalId} string 动物id 
	 * @returns 
	 */
	getAnimalBasicInfo() {
		return http.get("/animal/getAnimalBasicInfo", ...arguments)
	},
	/**
	 * 获取动物主页信息
	 * @param {animalId} string 动物id 
	 * @returns 
	 */
	getAnimalHomeInfo() {  
		return http.get("/animal/getAnimalHomeInfo", ...arguments)
	},
	// 创建-更新动物基本信息
	postAnimalBasicInfo() {
		return http.post("/animal/updateAnimalBasicInfo", ...arguments)
	},

	// 上传动物背景图
	uploadAnimalImage() {
		return http.post('/upload/animal/image', ...arguments)
	},

	// 打赏动物
	getCreateAnimalOrder() {
		return http.get('/order/createAnimalOrder', ...arguments)
	},

	// 打赏返回
	getMiniNotify() {
		return http.get('/order/miniNotify', ...arguments)
	},

	// 创建动物身份号
	postIdentify() {
		return http.post("/animal/identify", ...arguments)
	},

	// 上传动物视频回调
	postFinishUpload() {
		return http.post("/media/finishUpload", ...arguments)
	},
	// 上传回调信息
	getSignature() {
		return http.get("/media/getSignature", ...arguments)
	},
	// 获取当前指定页和数目的短视频
	animalOrderMedias(){
		return http.post("/animal/animalMedias",...arguments)
	},
	// 删除动物视频
	deletAnimalOneVideo()
	{
		return http.get("/media/remove",...arguments)
	},
	// 删除动物
	deleteAnimal({
		animalId
	}) {
		return http.get("/animal/remove", {
			animalId
		})
	},
	// 修改指定视频名称
	/**
	 * 更新视频名称，视频ID和视频名称
	 * @param "animalId": 0,
	          "name": "",
	 * @returns
	 */
	changeName(param)
	{
		return http.get("/media/changeName",param)
	},
}
