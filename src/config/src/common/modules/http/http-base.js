let httpQueue = new Set(); // 声明一个数组用于存储每个axio请求的取消函数和axio标识

export default {
	getBaseUrl() {
		// window.winApp.apiUrl灰度传入
		let baseUrl = window.winApp.apiUrl || winApp.envConfig.VUE_APP_BASE_API;
		if (!baseUrl) {
			console.warn('baseUrl is not defined');
		}
		return baseUrl;
	},
	// 读取配置拼接URL,如果原url已经是http开头，视为完整url，不用拼接
	joinUrl(url) {
		// 优先使用原生提供的baseUrl，没有再使用配置的baseUrl
		let baseUrl = this.getBaseUrl();
		let wholeUrl = '';
		if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
			wholeUrl = url;
		} else {
			wholeUrl = baseUrl + url;
		}
		return wholeUrl;
	},
	/**
	 *判断请求是否正确
	 * @options
	 */
	_isCorrectRequest(options) {
		if (!options.url) {
			Ui.loading(false);
			Ui.error('Url为空');
			return false;
		}
		// if (!Device.checkNet()) { // 没有网络
		//     Ui.loading(false);
		//     Ui.error('网络链接异常，请检查网络');
		//     return false;
		// }
		return true;
	},

	/**
	 *请求队列管控
	 * @return     false   允许继续访问 true,停止访问
	 */
	httpManagerReq(url, param) {
		let httptmp = url + JSON.stringify(param);
		if (!httpQueue.has(httptmp)) {
			// 进行请求队列管理
			console.log('-------加入请求队列管理---------', url, param);
			return false;
		}
		Ui.loading(false);
		return true;
	},

	/**
	 *请求队列管控
	 * @param  return  true  允许继续访问
	 */
	httpManagerRov(url, param) {
		console.log('httpManagerRov', url, param);
		let httptmp = url + JSON.stringify(param);
		if (httpQueue.has(httptmp)) {
			console.log('-------从请求队列管理移除---------', url, param);
			// 进行请求队列管理
			httpQueue.delete(httptmp); // 把这条记录从数组中移除
		}
	},
	// /**
	//  *设置fire 返回的数据信息
	//  * （后端新框架）以后每个接口请求header里面都要传这个值给 authorization
	//  */
	// setFireResultData(result) {
	// 	Store.state.fireTimestamp = result.timestamp;
	// 	Store.state.businessTokenId = result.data.businessTokenId;
	// 	Store.state.businessJnlNo = result.data.businessJnlNo; // 业务流水号 明文
	// 	Store.state.businessJnlNoEncrypt = result.data.businessJnlNoEncrypt; // 业务流水号 密文
	// 	Store.state.businessType = result.data.businessType; // idType用来拼接url接口字符串
	// 	Store.state.agreementUrl = result.data.agreementUrl;
	// 	console.log('--------------设置业务信息------------');
	// 	console.log(Store.state);
	// 	console.log('--------------设置业务信息-- end----------');
	// 	// 初始化话成功后，原生保存
	// 	Device.SetBusninessInfo(
	// 		{
	// 			businessTokenId: Store.state.businessTokenId || '',
	// 			businessJnlNo: Store.state.businessJnlNo || '',// 业务流水号 明文
	// 			businessJnlNoEncrypt: Store.state.businessJnlNoEncrypt || '',// 业务流水号 密文
	// 			businessType: Store.state.businessType || '', // idType用来拼接url接口字符串
	// 			header: {
	// 				authorization: 'businessTokenId ' + Store.state.businessTokenId
	// 			}
	// 		}
	// 	);
	// },
	/**
	 * 请求  200  成功获取信息的
	 * @param  result  ：200时 服务器返回的响应信息
	 * {
	 *    status : ''，   S为业务成功,其它状态表示失败
	 *    data:''         返回的业务数据
	 *  }
	 * @param success : 成功回调
	 * @param  error  失败回调
	 * */
	onHttpResSuccess(result, options) {
		if (!result) {
			Core.commonTraceInfo(`request-error-请求服务数据为空`, '', { result, options });
			Ui.error('抱歉！请求服务数据为空！');
			return;
		}
		// 返回不包裹的情况
		if (options.nowrapper) {
			console.log('nowrapper onHttpResSuccess  成功回调 ==== ', result);
			options.success && options.success(result);
			Core.commonTraceInfo(`request-success-${JSON.stringify(options)}`, 'request-success', { result, options });
			return;
		}
		if (result.status === 'S' || !result.status) {
			//  返回的信息体中的字段非 http的状态码 FB 后台返回成功处理， 其他平台没有status  字段
			console.log('onHttpResSuccess  成功回调 ==== ', result.data);
			Core.commonTraceInfo(`request-success-${JSON.stringify(result.data)}-${JSON.stringify(options)}`, 'request-success', { result, options });
			if (options.reqModel === 'Promise') {
				// 如果使用的是Promise 请求 ，
				options.resolve(result.data);
				return;
			}
			options.success && options.success(result.data);
			return;
		} else {
			console.log('onHttpResSuccess  status ！=S 失败处理 ==== ', result);
			// if (result.status === 'F' || result.status === 'E' || result.status === 'T' || result.status === 'I') {  // 如果需要对 错误特殊化处理
			if (!result.msg) {
				result.msg = `msg:${result.msg},code:${result.code},ts:${result.ts}`; // 网络异常提
			}
			Core.commonTraceInfo(`request-error-${result.msg}-${JSON.stringify(options)}`, 'request-error', { result, options });
			if (options.reqModel === 'Promise') {
				// 如果使用的是Promise 请求 ，
				if (options.errorFlag) {
					// 需要特殊化处理回调
					options.reject(result.code, result.msg);
				} else {
					Ui.popError('抱歉，无法继续操作', result.msg);
				}
				return;
			}
			if (options.error) {
				// 如果有错误回调时 ，进行错误回调处理 ， 和Promise只能二选其一
				options.error && options.error(result.code, result.msg);
			} else {
				Ui.popError('抱歉，无法继续操作', result.msg);
			}
			return;
		}
	},
	/**
	 * 请求异常的处理 非 200  的情况
	 * */
	onHttpResError(res, options) {
		Core.commonTraceInfo(`request-error-${JSON.stringify(res)}-${JSON.stringify(options)}`, 'request-error', { res, options });
		console.log('onHttpResError  失败处理 ==== ', res);
		if (!res.data || !res.data.errorMsg) {
			// 后台无返回，兼容 400 500 403  的网路异常
			res.data = {};
			res.data.errorCode = 'NET-' + (res.status || '未知'); // 网络异常码
			let msg = res.statusText || res.data.errorCode; // 网络异常提示
			res.data.errorMsg = `网络请求异常失败,${msg}`; // 网络异常提
		}
		if (options.reqModel === 'Promise') {
			// 如果使用的是Promise 请求 ，
			if (options.errorFlag) {
				// 需要特殊化处理回调
				options.reject(result.code, result.msg);
			} else {
				Ui.popError('抱歉，无法继续操作', result.msg);
			}
			return;
		}
		if (options.error) {
			// 如果有错误回调时 ，进行错误回调处理 ， 和Promise只能二选其一
			options.error(res.data.errorCode, res.data.errorMsg);
		} else {
			// Ui.error(`${res.data.errorMsg}(${res.data.errorCode})`);//
			Ui.popError('抱歉，无法继续操作', res.data.errorMsg);
		}
	},

	/**
	 * 处理拦截错误
	 * 用于统一处理，接口报错之后需要重试或退出业务的弹窗，一般用于init接口
	 * 表现为，
	 * 如果接口超时，则弹出有“重试”、“退出业务”的弹窗
	 * 如果接口报错，则弹出“退出业务”弹窗
	 * 使用方法参考 icm-pa-facebank-src\business\note\pages\editInfo.vue 的initData方法
	 * initData() {
	 *      App.post({
	 *          ...
	 *          error: App.handleInterCeptError(this.initData)
	 *      })
	 *  }
	 *  @param: 点击超时“重试”按钮的回调函数引用
	 * */
	handleInterCeptError(initCallback, args) {
		return function (resCode, resMsg, failflag) {
			Ui.loading(false);
			if (failflag) {
				// 请求超时异常，允许进行重新请求
				Ui.popErrorPlus(
					'抱歉，服务请求超时',
					resMsg,
					'重试',
					() => {
						typeof initCallback === 'function' && initCallback.apply(this, args);
					},
					'结束业务',
					() => {
						Device.close();
					}
				);
			} else {
				Ui.popError('抱歉，无法继续操作', resMsg, '结束业务', () => {
					Device.close();
				});
			}
		};
	},

	/**
	 * 异常请求的处理  android ios fb
	 * */
	_handleError(error, options) {
		// 服务器正常返回请求
		console.log('http _handleError catch=response= ' + JSON.stringify(error));
		let eRes = error.response;
		let eCallback = options.error;
		let failflag = false; // 超时请求异常的情况可重试
		if (eRes) {
			// 400、500、404、503等错误
			if (!eRes.data || !eRes.data.errorMsg) {
				// 后台无返回，兼容 400 500 403  的网路异常
				eRes.data = {};
				eRes.data.errorCode = 'NET' + eRes.status; // 网络异常码
				eRes.data.errorMsg = `服务请求失败-${eRes.data.errorCode}-${eRes.statusText}`; // 网络异常提示
			}
			// else if (!(eRes.data.errorMsg)) {
			//     eRes.data = {};
			//     eRes.data.errorCode = 'NET' + eRes.status; // 网络异常码
			//     eRes.data.errorMsg = `网络请求异常-${eRes.data.errorCode}`;// 网络异常提示
			// }
			// if ((eRes.headers) && (eRes.headers['x-trace-id'])) { //暂时去掉
			//     eRes.data.errorMsg = eRes.headers['x-trace-id'] + '-' + eRes.data.errorMsg;
			// }
		} else if (/^timeout/.test(error.message)) {
			// 超时的处理
			eRes = {};
			eRes.data = {};
			eRes.data.errorCode = 'NET-TimeOut'; // 网络异常码
			eRes.data.errorMsg = `网络请求超时，${error.message}`; // 网络异常提示
			failflag = true;
			// Ui.error('服务端请求超时，交易状态未明，请核实后再进行后续操作！', eCallback);
		} else {
			// 没有联网的情况、json转换异常
			eRes = {};
			eRes.data = {};
			eRes.data.errorCode = 'NET-ERROR'; // 网络异常码
			eRes.data.errorMsg = `网络请求超时，${error.message}`; // 网络异常提示
			failflag = true;
		}
		if (eCallback) {
			eCallback(eRes.data.errorCode, eRes.data.errorMsg, failflag);
		} else {
			// Ui.error(`${eRes.data.errorMsg}(${eRes.data.errorCode})`);
			if (failflag) {
				Ui.popTimeout('抱歉，请求超时，请重试', eRes.data.errorMsg);
			} else {
				Ui.popError('抱歉，无法继续操作', eRes.data.errorMsg);
			}
		}
	},
	// 随机生成uuid
	/*
	 * len  生产随机数的长度 默认16位
	 * radix  基数（二进制、八进制、十进制、十六进制） 默认16进制
	 * uuid前面加上6位日期,为保证总长度16位，随机数长度调整为10位
	 * */
	createUuid(len, rad) {
		let length = len || 10;
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
		let radix = rad || chars.length || 16;
		let uuid = [],
			i;
		if (length) {
			for (i = 0; i < length; i++) {
				uuid[i] = chars[0 | (Math.random() * radix)];
			}
			// } else {
			// 	let r;
			// 	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			// 	uuid[14] = '4';
			// 	for (i = 0; i < 36; i++) {
			// 		if (!uuid[i]) {
			// 			r = 0 | (Math.random() * 16);
			// 			uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
			// 		}
			// 	}
		}
		return dateFlag + uuid.join('');
	},

	// url编码
	toQueryurl(o) {
		let arr = [];
		for (let i in o) {
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(o[i]));
		}
		return arr.join('&');
	},
	// 环境判断
	isDevDebugMock() {
		return Env === 'dev' || Env === 'debugMock';
	},
	isDevNative() {
		return Env === 'devNative';
	},
	jsonp(params) {
		let callbackName = 'json_' + ~~(Math.random() * 100); // 随机生成回调函数名称
		params.data.callback = callbackName; //注意
		let script = document.createElement('script');
		let flag = params.url.indexOf('?') > -1 ? '&' : '?';
		let queryUrl = params.url + flag + this.toQueryurl(params.data);
		let head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
		script.src = queryUrl;
		//回调函数要接口返回后执行
		window[callbackName] = function (json) {
			window[callbackName] = null;
			clearTimeout(script.timer);
			head.removeChild(script);
			params.success && params.success(json);
		};

		//超时处理
		if (params.timer) {
			script.timer = setTimeout(function () {
				window[callbackName] = null;
				head.removeChild(script);
				params &&
					params.error({
						message: '网络超时'
					});
			}, params.timer);
		}
	},

	//根据地区获取经纬度坐标
	getLocation(address) {
		Ui.loading(true, '正在解析地址');
		return new Promise((resove, reject) => {
			this.jsonp({
				url: url,
				data: {
					address: address,
					ak: ak,
					output: 'json'
				},
				success: function (res) {
					console.log(res);
					Ui.loading(false);
					if (res.status === '0') {
						resove(res.result.location);
					} else {
						Ui.toasted('解析地址异常，请手动输入');
					}
				},
				error: function (error) {
					Ui.loading(false);
					// reject(error)
					Ui.toasted('解析地址异常，请手动输入');
				},
				timer: 8000
			});
		});
	},


	// 遍历声明接口调用方法  httpMethods : 为http 请求方法
	forEachHttpMethods(httpMethods) {
		// 遍历声明接口调用方法
		// 生成App.get、App.post、App.put、App.delete
		// 并且每种method 下分别有 App.get.channel、App.get.order、App.get.business快捷方法，
		['get', 'post', 'put', 'delete'].forEach(v => {
			let getAuthInfos = function () {
				let loginInfo = Store.getters.getLoginInfo || {};
				let deviceInfo = Store.getters.getDeviceInfo || {};

				//   渠道信息
				let channelAuthInfo = Store.getters.getChannelAuthInfo || {};
				// 订单信息
				let orderAuthInfo = Store.getters.getOrderAuthInfo || {};
				// 业务认证信息
				let businessAuthInfo = Store.getters.getBusinessAuthInfo || {};
				return {
					loginInfo,
					deviceInfo,
					channelAuthInfo,
					orderAuthInfo,
					businessAuthInfo
				};
			};
			// 常规调用
			httpMethods[v] = function (options = {}) {
				options.headers = options.headers || {};
				let { loginInfo, deviceInfo, channelAuthInfo, orderAuthInfo, businessAuthInfo } = getAuthInfos();
				console.log('http-base 常规调用options', options, loginInfo, channelAuthInfo);

				if (loginInfo && loginInfo.deviceId) {
					// 判断设备id 是否存在
					// 设置头部数据
					options.headers['x-device-id'] = loginInfo.deviceId || '';
					options.headers['x-ip-id'] = deviceInfo.ip || '';
					options.headers['x-mac-id'] = deviceInfo.macAdd || '';
				}

				// 如果没有主动传递JWT，则自动加上JWT，优先businessJwt，其次orderJwt
				if (!options.headers || !options.headers.Authorization) {
					let jwt = businessAuthInfo.businessJwt || orderAuthInfo.orderJwt || channelAuthInfo.channelJwt || Core.getSessionData('fb-authorization');

					if (jwt) {
						if (jwt.indexOf('Bearer ') < 0) {
							jwt = 'Bearer ' + jwt;
						}
						options.headers['Authorization'] = jwt;
					}
				}
				httpMethods.fetch(v, options);

				// httpMethods.fetchPromise(v, options);
			};
			// 工作台审核和渠道认证
			httpMethods[v].channel = function (options = {}) {
				options.headers = options.headers || {};

				if (loginInfo && loginInfo.deviceId) {
					// 判断设备id 是否存在
					// 设置头部数据
					options.headers['x-device-id'] = loginInfo.deviceId;
					options.headers['x-ip-id'] = deviceInfo.ip || '';
					options.headers['x-mac-id'] = deviceInfo.macAdd || '';
				}
				// 如果没有主动传递JWT，则自动加上JWT，
				if (!options.headers || !options.headers.Authorization) {
					if (Store.getters.getAuthorizationToken) {
						options.headers['Authorization'] = Store.getters.getAuthorizationToken;
					}
				}
				httpMethods.fetch(v, options);
				// httpMethods.fetchPromise(v, options);
			};

			// 业务审核模块及签字确认模块
			httpMethods[v].order = function (options = {}) {
				options.headers = options.headers || {};
				let { loginInfo, deviceInfo, channelAuthInfo, orderAuthInfo, businessAuthInfo } = getAuthInfos();
				if (loginInfo && loginInfo.deviceId) {
					// 判断设备id 是否存在
					// 设置头部数据
					options.headers['x-device-id'] = loginInfo.deviceId;
					options.headers['x-ip-id'] = deviceInfo.ip || '';
					options.headers['x-mac-id'] = deviceInfo.macAdd || '';
				}
				// 如果没有主动传递JWT，则自动加上JWT，
				if (!options.headers || !options.headers.Authorization) {
					if (Store.getters.getAuthorizationToken) {
						options.headers['Authorization'] = Store.getters.getAuthorizationToken;
					}
				}
				httpMethods.fetch(v, options);
				// httpMethods.fetchPromise(v, options);
			};

			httpMethods[v].business = function (options = {}) {
				options.headers = options.headers || {};
				// 如果没有主动传递JWT，则自动加上JWT，
				if (!options.headers || !options.headers.Authorization) {
					if (Store.getters.getAuthorizationToken) {
						options.headers['Authorization'] = Store.getters.getAuthorizationToken;
					}
				}

				httpMethods.fetch(v, options);
				// httpMethods.fetchPromise(v, options);
			};
		});
	}
};
