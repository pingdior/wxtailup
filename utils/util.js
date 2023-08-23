/**
 * 将日期转为字符串
 * @param {Date} date date类型的时间
 * @param {String} devide 分隔符
 * @return {String} 默认 YYYY/MM/DD hh:mm:ss 
 */
const formatTime = (date = new Date(), devide = '/') => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join(devide) + ' ' + [hour, minute, second].map(formatNumber).join(
		':')
}
// 获得格式化的日期
const getDate= type =>{
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === "startDate") {
			year = year - 20;
		} else if (type === "endDate") {
			year = year + 2;
		}
		month = month > 9 ? month : "0" + month;
		day = day > 9 ? day : "0" + day;
		return `${year}-${month}-${day}`;
	}

	const formatNumber = n => {
		n = n.toString()
		return n[1] ? n : '0' + n
	}

/**
 * 把json对象拆成url参数格式的方法
 * @data 需要处理的json对象
 */
const getParam = function(data) {
	let url = '';
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : '';
		url += `&${k}=${encodeURIComponent(value)}`
	}
	return url ? url.substring(1) : ''
}

// 判断数据类型
function type(x) {
	return Object.prototype.toString.call(x).slice(8, -1).toLowerCase()
}

// Object.create(null) 的对象，没有hasOwnProperty方法
function hasOwnProp(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

// 仅对对象和数组进行深拷贝，其他类型，直接返回
function isClone(x) {
	const t = type(x);
	return t === 'object' || t === 'array';
}

// 递归
function cloneDeep(x) {
	if (!isClone(x)) return x;

	const t = type(x);

	let res;

	if (t === 'array') {
		res = [];
		for (let i = 0; i < x.length; i++) {
			// 避免一层死循环 a.b = a
			res[i] = x[i] === x ? res : cloneDeep(x[i]);
		}
	} else if (t === 'object') {
		res = {};
		for (let key in x) {
			if (hasOwnProp(x, key)) {
				// 避免一层死循环 a.b = a
				res[key] = x[key] === x ? res : cloneDeep(x[key]);
			}
		}
	}

	return res;
}

function chooseImageFormat(string){
	let resType = string.slice(-3).toLowerCase();
	let resType2 = string.slice(-4).toLowerCase();
	const imageTypeList = ['bmp', 'png', 'jpg','jpeg'];
	if (!(imageTypeList.includes(resType)||imageTypeList.includes(resType2))) {
		uni.showToast({
			title: "图片必须是bmp, png,jpg或jpeg类型",
			icon: "none",
			duration: 2000,
			mask: true,
		});
		return false;
	}
	else{
		return true;
	}
}

function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(arr) {
	return Array.isArray(arr)
}
// 合并
function merge(target, ...arg) {
	return arg.reduce((acc, cur) => {
		return Object.keys(cur).reduce((subAcc, key) => {
			const srcVal = cur[key]
			if (isObject(srcVal)) {
				subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
			} else if (isArray(srcVal)) {
				// series: []，下层数组直接赋值
				subAcc[key] = srcVal.map((item, idx) => {
					if (isObject(item)) {
						const curAccVal = subAcc[key] ? subAcc[key] : []
						return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
					} else {
						return item
					}
				})
			} else {
				subAcc[key] = srcVal
			}
			return subAcc
		}, acc)
	}, target)
}

// const cloneDeep = function (params) {
//   return JSON.parse(JSON.stringify(params))
// }

function isEmpty(val) {
	if ([null, undefined, ''].includes(val)) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	formatTime: formatTime,
	getParam,
	cloneDeep,
	merge,
	isEmpty,
	getDate,
	chooseImageFormat,
}
