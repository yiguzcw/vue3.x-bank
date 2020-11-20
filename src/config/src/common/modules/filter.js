/**
 * Created by EX_KJKFB_HEXIN on 2017/11/14.
 * 使用方法 在template 中 直接{{身份证号码 | stringEncrypted(起始位置,终止位置)}} 不需要传要处理的参数
 * 在js中 调用Filter全局方法,传需要调用的过滤器,再传完整参数 如 Filter('stringEncrypted')(身份证号码,起始位置,终止位置);
 */
// import Vue from 'vue';

const CardType = {
	0: '其它个人证件',
	1: '身份证',
	2: '军人军官证',
	3: '港澳台居民通行证',
	4: '中国护照',
	6: '不详',
	8: '武警警官证',
	9: '临时身份证',
	10: '联名户',
	11: '户口薄',
	12: '中国居民其它证件',
	13: '军人士兵证',
	14: '军人文职干部证',
	15: '军人其它证件',
	16: '武警士兵证',
	17: '武警文职干部证',
	18: '武警其它证件',
	19: '外国护照',
	20: '外国公民其它证件',
	29: '外国人永久居留身份证',
	50: '公务卡',
	30: '港澳居民居住证',
	35: '台湾居民居住证'
};
const filters = {
	/**
	 *  字符串加密
	 *  银行卡号加密 6230 5824 7005 2888 888 => 623058******8888 (前6后4)
	 *  银行卡号加密 {{ 6230582470052888888 | stringEncrypted(6, 4) }}
	 *  姓名加密 陈艳美 => 陈*美 (前1后1)
	 *  params:
	 *    str 要加密的字符串
	 *      front 头部不加密的位数
	 *      rear 末尾不加密的位数
	 */
	stringEncrypted(str, front, rear) {
		if (!str) {
			return null;
		}
		let _front = front === undefined ? 0 : front;
		let _rear = rear === undefined ? 0 : rear;
		let frontStr = str.substring(0, _front);
		let rearStr = str.substring(str.length - _rear);
		let centerStr = '';

		for (let i = 0; i < str.length - _front - _rear; i++) {
			centerStr += '*';
		}
		return frontStr + ' ' + centerStr + ' ' + rearStr;
	},

	/**
	 *  凭证号大于等于19位，最后一位掩码
	 *  凭证号小于19位，最后一位掩码，从后往前加凭证号，其余用*补齐19位
	 * */
	splitStrByMy(str) {
		if (!str) {
			return null;
		}
		if (str.length >= 19) {
			let str2 = str.substring(0, str.length);
			str = str2;
		} else {
			let totalNum = 19 - str.length - 1;
			let total = '';
			for (let i = 0; i < totalNum; i++) {
				total += '*';
			}
			let str3 = str.substring(0, str.length);
			str = total + str3 + '*';
		}
		return str;
	},

	/**
	 *  银行卡，信用卡取尾号 后四位
	 * */

	bankNoTail(str) {
		if (str == null || str === '') {
			return str;
		}
		let data = str.substring(str.length - 4, str.length);
		return data;
	},


	/**
	 *  银行卡号默认加密方式(前6后4) 6230 5824 7005 2888 888 => 623058******8888
	 */
	bankNoFormat(str) {
		if (str == null || str === '') {
			return str;
		}
		let str1 = str.substring(0, 6);
		let str3 = str.substring(str.length - 4, str.length);
		let str2 = '';
		for (let i = 6; i < str.length - 4; i++) {
			str2 = str2 + '*';
		}
		return str1 + '  ' + str2 + '  ' + str3;
	},
	/**
	 * 金额大写转化
	 * 1000 => 壹仟
	 * @param dValue 输入金额
	 * @param maxDec 最大输入金额
	 */
	amountInWords(dValue, maxDec) {
		if (dValue === null || dValue === '') {
			return '';
		}
		// 验证输入金额数值或数值字符串：
		dValue = dValue.toString().replace(/,/g, '');
		dValue = dValue.replace(/^0+/, ''); // 金额数值转字符、移除逗号、移除前导零
		if (dValue === '') {
			return '零元整';
			// eslint-disable-next-line brace-style
		} // （错误：金额为空！）
		else if (isNaN(dValue)) {
			return '错误：金额不是合法的数值！';
		}

		let minus = ''; // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。
		let CN_SYMBOL = ''; // 币种名称（如“人民币”，默认空）
		if (dValue.length > 1) {
			if (dValue.indexOf('-') === 0) {
				dValue = dValue.replace('-', '');
				minus = '负';
			} // 处理负数符号“-”
			if (dValue.indexOf('+') === 0) {
				dValue = dValue.replace('+', '');
			} // 处理前导正数符号“+”（无实际意义）
		}

		// 变量定义：
		let vInt = '';
		let vDec = ''; // 字符串：金额的整数部分、小数部分
		let resAIW; // 字符串：要输出的结果
		let parts; // 数组（整数部分.小数部分），length=1时则仅为整数。
		let digits; let radices; let bigRadices; let
decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。
		let zeroCount; // 零计数
		let i; let p; let
d; // 循环因子；前一位数字；当前位数字。
		let quotient; let
modulus; // 整数部分计算用：商数、模数。

		// 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。
		let NoneDecLen = (typeof (maxDec) === 'undefined' || maxDec === null || Number(maxDec) < 0 || Number(maxDec) > 5); // 是否未指定有效小数位（true/false）
		parts = dValue.split('.'); // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
		if (parts.length > 1) {
			vInt = parts[0];
			vDec = parts[1]; // 变量赋值：金额的整数部分、小数部分

			if (NoneDecLen) {
				maxDec = vDec.length > 5 ? 5 : vDec.length;
			} // 未指定有效小数位参数值时，自动取实际小数位长但不超5。
			let rDec = Number('0.' + vDec);
			rDec *= Math.pow(10, maxDec);
			rDec = Math.round(Math.abs(rDec));
			rDec /= Math.pow(10, maxDec); // 小数四舍五入
			let aIntDec = rDec.toString().split('.');
			if (Number(aIntDec[0]) === 1) {
				vInt = (Number(vInt) + 1).toString();
			} // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
			if (aIntDec.length > 1) {
				vDec = aIntDec[1];
			} else {
				vDec = '';
			}
		} else {
			vInt = dValue;
			vDec = '';
			if (NoneDecLen) {
				maxDec = 0;
			}
		}
		if (vInt.length > 44) {
			return '错误：金额值太大了！整数位长【' + vInt.length.toString() + '】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！';
		}

		// 准备各字符数组 Prepare the characters corresponding to the digits:
		digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 零~玖
		radices = ['', '拾', '佰', '仟']; // 拾,佰,仟
		bigRadices = ['', '万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正']; // 万,亿,兆,京,垓,杼,穰,沟,涧,正
		decimals = ['角', '分', '厘', '毫', '丝']; // 角/分/厘/毫/丝

		resAIW = ''; // 开始处理

		// 处理整数部分（如果有）
		if (Number(vInt) > 0) {
			zeroCount = 0;
			for (i = 0; i < vInt.length; i++) {
				p = vInt.length - i - 1;
				d = vInt.substr(i, 1);
				quotient = p / 4;
				modulus = p % 4;
				if (d === '0') {
					zeroCount++;
				} else {
					if (zeroCount > 0) {
						resAIW += digits[0];
					}
					zeroCount = 0;
					resAIW += digits[Number(d)] + radices[modulus];
				}
				if (modulus === 0 && zeroCount < 4) {
					resAIW += bigRadices[quotient];
				}
			}
			resAIW += '元';

		}
		if (!vDec.replace(/0/g, '')) {

		} else {
			if (/[^0]0+\./g.test(dValue)) {
				resAIW += '零';
			} else if (/\.0+[^0]/g.test(dValue)) {
				resAIW += '零';
			}
		}
		// 处理小数部分（如果有）
		for (i = 0; i < vDec.length; i++) {
			d = vDec.substr(i, 1);
			if (d !== '0') {
				resAIW += digits[Number(d)] + decimals[i];
			}
		}

		// 处理结果
		if (resAIW === '') {
			// resAIW = "零" + "元";
			resAIW = '零';
		} // 零元
		if (vDec === '') {
			resAIW += '整';
		} // ...元整
		resAIW = CN_SYMBOL + minus + resAIW; // 人民币/负......元角分/整
		return resAIW;
	},
	/**
	 * @author 日期格式化
	 * @param date '日期字符串'
	 * @param type '分隔符'
	 * @param get   '返回日期对象'
	 * @returns {*} 'get=true时返回日期对象，get为空或者false时返回格式化后的字符串'
	 */
	formatDate(date, type, get) {
		if (get) {
			//            if (Object.prototype.toString.call(date) === "[object String]") {
			if (Core['typeof'](date, 'String')) {
				if (date.length === 8) {
					let _year = date.substr(0, 4);
					let _month = date.substr(4, 2);
					let _day = date.substr(6, 2);
					return {
						Year: _year,
						Month: _month,
						Day: _day
					};
				} else {
					return {
						Year: '',
						Month: '',
						Day: ''
					};
				}
			} else {
				return {
					Year: '',
					Month: '',
					Day: ''
				};
			}
		} else {
			//            if (Object.prototype.toString.call(date) === "[object String]") {
			if (Core['typeof'](date, 'String')) {
				if (date.length === 8) {
					let _year = date.substr(0, 4);
					let _month = date.substr(4, 2);
					let _day = date.substr(6, 2);
					return _year + type + _month + type + _day;
				} else {
					return '';
				}
			} else {
				return '';
			}
		}
	},
	/**
	 *
	 * @param Date实例，
	 * @param yyyy-MM-dd hh:mm:ss
	 * @returns 格式化的时间
	 * @desc 上面的方法有用？
	 * @desc 使用方法 {{ new Date() | dateFormat('yyyy-MM-dd hh:mm:ss') }};
	 * @desc 或者 dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
	 */
	dateFormat(date, format = 'yyyy-MM-dd hh:mm:ss') {
		// if (format === undefined) {
		// 	format = date;
		// 	format = date = new Date();
		// }
		let map = {
			'M': date.getMonth() + 1, // 月份
			'd': date.getDate(), // 日
			'h': date.getHours(), // 小时
			'm': date.getMinutes(), // 分
			's': date.getSeconds(), // 秒
			'q': Math.floor((date.getMonth() + 3) / 3), // 季度
			'S': date.getMilliseconds() // 毫秒
		};
		format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
			let v = map[t];
			if (v !== undefined) {
				if (all.length > 1) {
					v = '0' + v;
					v = v.substr(v.length - 2);
				}
				return v;
			} else if (t === 'y') {
				return (date.getFullYear() + '').substr(4 - all.length);
			}
			return all;
		});
		return format;
	},

	/**
	 * 金额数字  保留两位小数 （分组展示）
	 * @param value   要个是化的值
	 *
	 */
	splitNumFloatStr(value) {
		return filters.splitNum(parseFloat(value).toFixed(2));
	},
	/**
	 * 金额数字分组显示
	 * @param value   要个是化的值
	 * @param spar    整数值时的 小数部分是否补充
	 */
	splitNum(value) {
		if (!value) {
			return null;
		}
		let value2 = ''; // 小数点部分
		if (value.indexOf('.') >= 0) { // 含有小数点
			let valuesArr = value.split('.');
			value2 = '.' + filters.splitNumStr(valuesArr[1]);
			value = valuesArr[0]; //   整数部分
		}
		value = filters.splitNumStr(value); //   整数部分     value
		// 拼装最后的小数部分
		value += value2;
		return value;
	},
	/**
	 * 金额数字分组显示  每三位  加 ，
	 */
	splitNumStr(value) {
		if (value === null || value === '') {
			return value;
		}
		// 先替换到所有的除了小数点以外的非数值数值
		value = value.replace(/[^(\d.)]*/g, '');
		// 字符串没有反转方法，故需要先转成数组
		value = value.split('').reverse()
.join('');
		// 可以尝试不加正则后面的(?=\d),在输入的数字刚好是3的整数倍时就会出现问题
		value = value.replace(/(\d{3})(?=\d)/g, '$1,');
		value = value.split('').reverse()
.join('');
		return value;
	},
	/*
     * 显示姓名的第一个字
     * */
	showFirstName(fullName) {
		if (!fullName) return;
		let newName = '';
		let firstName = fullName.substr(0, 1);
		newName = `${firstName}先生/女士`;
		return newName;
	},
	/*
     *
     *  数字显示逗号
     * */
	toThousands(num) {
		let numtmp = (num || 0).toString(); let
result = ' ';
		while (numtmp.length > 3) {
			result = ',' + numtmp.slice(-3) + result;
			numtmp = numtmp.slice(0, numtmp.length - 3);
		}
		if (numtmp) {
			result = numtmp + result;
			return result;
		}
	},
	// 刷卡证件识别类别
	// 0       其它个人证件
	// 1       身份证
	// 2       军人军官证
	// 3       港澳台居民通行证
	// 4       中国护照
	// 6       不详
	// 8       武警警官证
	// 9       临时身份证
	// 10     联名户
	// 11     户口薄
	// 12     中国居民其它证件
	// 13     军人士兵证
	// 14     军人文职干部证
	// 15     军人其它证件
	// 16     武警士兵证
	// 17     武警文职干部证
	// 18     武警其它证件
	// 19     外国护照
	// 20     外国公民其它证件
	// 29     外国人永久居留身份证
	// 50     公务卡
	// 30     港澳居民居住证
	// 35     台湾居民居住证
	cardTypeChose(cardType) {
		if (CardType[cardType]) {
			return CardType[cardType];
		} else {
			return '不详';
		}
	},
	charDateFormat(date) {
		if (date) {
			return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
		} else {
			return '';
		}
	},
	// 获取货币对应的货币符号
	getCcyChar(ccy) {
		let ccyChar = '';
		let obj = {
			RMB: '￥', // "人民币",
			HKD: 'HKD$', // "港元",
			USD: '$', // "美元",
			AUD: '$A.', // "澳大利亚元",
			EUR: '€', // "欧元",
			GBP: '￡', // "英镑",
			CAD: 'C$', // "加拿大元",
			SGD: 'S$', // "新加坡元",
			CHF: 'SFR', // "瑞士法郎",
			JPY: '￥'// "日元"
		};
		if (obj[ccy]) {
			ccyChar = obj[ccy];
		} else {
			ccyChar = ccy;
		}
		return ccyChar;
	},
	// 获取货币对应的中文
	getCcyName(ccy) {
		let ccyName = '';
		let obj = {
			RMB: '人民币', // "人民币",
			HKD: '港币', // "港元",
			USD: '美元', // "美元",
			AUD: '澳大利亚元', // "澳大利亚元",
			EUR: '欧元', // "欧元",
			GBP: '英镑', // "英镑",
			CAD: '加拿大元', // "加拿大元",
			SGD: '新加坡元', // "新加坡元",
			CHF: '瑞士法郎', // "瑞士法郎",
			JPY: '日元'// "日元"
		};
		if (obj[ccy]) {
			ccyName = obj[ccy];
		} else {
			ccyName = ccy;
		}
		return ccyName;
	},
	sexChose(sex) {
		if (sex === 'M') {
			return '先生';
		} else if (sex === 'F') {
			return '女士';
		} else {
			return '客户';
		}
	},
	/*
        * @ function url key 过滤
        * */
	getUrlKey(url) {
		// let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let urlList;
		if (url.split('?').length <= 1) {
			return {};
		} else {
			urlList = url.split('?')[1];
		}

		let urlArr = [];
		if (urlList.split('&').length >= 1) {
			urlArr = urlList.split('&');
		} else {
			urlArr = urlList;
		}

		let urlParamObj = {};
		urlArr.forEach(item => {
			let itemList = item.split('=');
			let itemKey = item.split('=')[0];
			let itemValue = item.replace(itemKey + '=', '');
			if (itemList && itemList.length > 1) {
				urlParamObj[decodeURI(itemKey)] =  decodeURI(itemValue);
			}
		});
		return urlParamObj;
	},
	// 判断首字母  *或/时  要去掉
	/* 举例:前端可以判断第一位是否是*,如果是*则认为是掩码字段,这时候取*后面的数据作为json数据解析并展示,这种方式涉及到需要转义的情况(转义符为\,比如如果原始数据第一位为*,则转义为\*,如果第一位为\则转义为\\,也即:第一位为不为*和\则正常展示,第一位为*则显示掩码,第一位为\则去掉第一位正常展示) */
	strFirstChar(str) {
		if (str && (str.substr(0, 1) === '*')) {
			let strHandle = JSON.parse(str.substr(1));
			return strHandle.displayText;
		} else if (str && (str.substr(0, 1) === '\\')) {
			return str.substr(1);
		} else {
			return str;
		}
	},
	// 判断金额
	setMoneyText(str) {
		let num = Number(str);
		let money = null;
		if (num >= 10000) {
			money = Math.floor(num / 10000) + '万';
		} else {
			money = (num % 10000) + '元';
		}
		return money;
	},
	// 手机号掩码
	phoneNumberFormat(str) {
		if (str == null || str === '' || str.length !== 11) {
			return str;
		}
		let str1 = str.substring(0, 3);
		let str3 = str.substring(str.length - 4, str.length);
		let str2 = '';
		for (let i = 3; i < str.length - 4; i++) {
			str2 = str2 + '*';
		}
		return str1 + '  ' + str2 + '  ' + str3;
	}
};

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

export default filters;
