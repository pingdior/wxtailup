const baseUrl = "https://tailup.love" // 生产环境--public
const videoDataAppId = "1305387564"
const postBackUrl = "http://1305387564.vod2.myqcloud.com/6b095ff3vodsh1305387564/cee1cd50387702304954623462/PynoKA7N67wA.png"
// const baseUrl = "http://test.tailup.love" // 测试环境--public
// const videoDataAppId = "1500007875"
// const postBackUrl = "http://1500007875.vod2.myqcloud.com/6c9b6a63vodcq1500007875/551e12b4387702304925577532/VgYY045euu4A.png"

import {
	getParam
} from './util.js'

import MyPromise from "./promise/es6-promise"

import store from '../store/index';
// console.log(store)

const headers = {
	'Content-Type': 'application/json;charset=UTF-8',
	'Accept': 'application/json',
}

function dealResponse(res, config = {}, resolve, reject, url) {
	if (res.statusCode === 200) {
		// console.log('axios--res', res)
		if (res.header && res.header['Access-Token']) {
			store.commit('user/login', res.header['Access-Token'])
		}
		if (res.data.code !== 200) {
			uni.showToast({
				title: res.data.msg || "请求失败，请核对后重试！",
				icon: 'none',
				duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
				mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
			})
			reject(res)
		} else {
			// uni.hideToast({
			//   success: () => { },
			//   fail: () => { }
			// });
			resolve(res.data)
		}
	} else if (res.statusCode === 404) {
		uni.showToast({
			title: "网络故障，请稍后再试！",
			icon: 'none',
			duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
			mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false
		})
		throwError('网络错误404:' + url);
		reject(res)
	}
}

function throwError(str) {
	setTimeout(() => {
		throw new Error(str);
	})
}

module.exports = {
	baseUrl,
	videoDataAppId,
	get(url, payload, config = {}) {
		var token = store.state.user.token;
		if (token && (token.length > 0)) {
			headers['Access-Token'] = `${token}`
		}
		// headers['Content-Type'] = 'x-www-form-urlencoded';
		headers['Content-Type'] = 'application/json';


		let params = getParam(payload)
		return new MyPromise((resolve, reject) => {
			uni.request({
				url: baseUrl + url + (params ? `?${params}` : ""),
				method: "GET",
				header: headers,
				timeout: 60000,
				success: function(res) {
					dealResponse(res, config, resolve, reject, url)
				},
				fail: function(err) {
					uni.showToast({
						title: "网络故障，请稍后再试！",
						icon: 'none',
						duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
						mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
					})
					console.log(err)
					reject(err)
					// dealResponse(res, config, resolve, reject)
				}
			})
		})
	},
	post(url, payload, config = {}) {
		var token = store.state.user.token;
		if (token && (token.length > 0)) {
			headers['Access-Token'] = `${token}`
		}
		if (config['Content-Type']) {
			headers['Content-Type'] = config['Content-Type'];
		} else {
			headers['Content-Type'] = 'application/json;charset=UTF-8';
		}
		return new MyPromise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: "POST",
				data: payload,
				timeout: 60000,
				header: headers,
				success: function(res) {
					dealResponse(res, config, resolve, reject, url)
				},
				fail: function(err) {
					uni.showToast({
						title: "网络故障，请稍后再试！",
						icon: 'none',
						duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
						mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
					})
					console.log(err)
					reject(err)
					// dealResponse(res, config, resolve, reject)
				}
			})
		})
	},
}
