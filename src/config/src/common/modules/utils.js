/**
 * 通用工具函数
 */

export const createUuid = function (length = 10, radix = 16) {
	let nowDate = new Date();
	let dateFlag = nowDate
		.getFullYear()
		.toString()
		.substring(2);
	let dateMonth = (nowDate.getMonth() + 1).toString();
	let dateDate = nowDate.getDate().toString();
	dateFlag += dateMonth.length === 1 ? '0' + dateMonth : dateMonth;
	dateFlag += dateDate.length === 1 ? '0' + dateDate : dateDate;
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	let uuid = [],
		i;
	radix = radix || chars.length;
	if (length) {
		for (i = 0; i < length; i++) {
			uuid[i] = chars[0 | (Math.random() * radix)];
		}
	} else {
		let r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16);
				uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return dateFlag + uuid.join('');
};

/**
 * 判断当前运行的平台类型
 * **/
export const getDeviceType = () => {
	let userAgent = navigator.userAgent.toUpperCase();
	let type = '';
	
	// 第三方userAgent列表
	// LUJINSUO: 陆金所， YIQIANBAO(IOS)/1QIANBAO(安卓): 壹钱包 ANYDOOR/PARS：金管家
	let thirdPartyList = ['LUJINSUO','YIQIANBAO', '1QIANBAO',"ANYDOOR","PARS"];
    let thirdRegExp = new RegExp("(" + thirdPartyList.join("|") + ")", "i")
    console.info('第三方userAgent匹配', thirdRegExp, thirdRegExp.test(userAgent));
	if (thirdRegExp.test(userAgent)) {
		// 第三方APP，非口袋，非H5
		type = 'thirdParty'
	} else if (/(PAEBANK)/i.test(userAgent)) {
		//口袋
		type = 'pocket'
	} else if (/(FB-ALADDIN)/i.test(userAgent)) {
		//判断行员A
		type = 'fbAladdin';
	} else if (/(ALADDIN)/i.test(userAgent)) {
		//判断fb-aladdin
		type = 'bankA';
	} else {
		//PC端
		type = 'pc';
	}
	console.log('=============================================' + type);
	return type;
};

export const formatDate = () => {
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	Date.prototype.format = function (fmt) {
		//author: meizz
		let o = {
			'M+': this.getMonth() + 1, //月份
			'd+': this.getDate(), //日
			'h+': this.getHours(), //小时
			'm+': this.getMinutes(), //分
			's+': this.getSeconds(), //秒
			'q+': Math.floor((this.getMonth() + 3) / 3), //季度
			S: this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		for (let k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
		return fmt;
	};
};
//代码如下所示：
export const convertCurrency = money => {
	//汉字的数字
	let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	//基本单位
	let cnIntRadice = ['', '拾', '佰', '仟'];
	//对应整数部分扩展单位
	let cnIntUnits = ['', '万', '亿', '兆'];
	//对应小数部分单位
	let cnDecUnits = ['角', '分', '毫', '厘'];
	//整数金额时后面跟的字符
	let cnInteger = '整';
	//整型完以后的单位
	let cnIntLast = '元';
	//金额整数部分
	let integerNum;
	//金额小数部分
	let decimalNum;
	//输出的中文金额字符串
	let chineseStr = '';
	//分离金额后用的数组，预定义
	let parts;
	if (money === '') {
		return '';
	}
	money = parseFloat(money);
	if (money >= 999999999999999.9999) {
		//超出最大处理数字
		return '';
	}
	if (money === 0) {
		chineseStr = cnNums[0] + cnIntLast;
		return chineseStr;
	}
	//转换为字符串
	money = money.toString();
	if (money.indexOf('.') === -1) {
		integerNum = money;
		decimalNum = '';
	} else {
		parts = money.split('.');
		integerNum = parts[0];
		decimalNum = parts[1].substr(0, 4);
	}
	//获取整型部分转换
	if (parseInt(integerNum, 10) > 0) {
		let zeroCount = 0;
		let IntLen = integerNum.length;
		for (let i = 0; i < IntLen; i++) {
			let n = integerNum.substr(i, 1);
			let p = IntLen - i - 1;
			let q = p / 4;
			let m = p % 4;
			if (n === '0') {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					chineseStr += cnNums[0];
				}
				//归零
				zeroCount = 0;
				// eslint-disable-next-line radix
				chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
			}
			if (m === 0 && zeroCount < 4) {
				chineseStr += cnIntUnits[q];
			}
		}
		chineseStr += cnIntLast;
	}
	//小数部分
	if (decimalNum !== '') {
		let decLen = decimalNum.length;
		for (let i = 0; i < decLen; i++) {
			let n = decimalNum.substr(i, 1);
			if (n !== '0') {
				chineseStr += cnNums[Number(n)] + cnDecUnits[i];
			}
		}
	}
	if (chineseStr === '') {
		chineseStr += cnNums[0] + cnIntLast;
	}
	return chineseStr;
};


export default {
	isArray(t) {
		return Array.isArray(t);
	},
	isFunction(t) {
		return typeof t === 'function';
	}
};
