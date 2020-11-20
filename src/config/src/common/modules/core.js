// 用于记录节流throttle开始时间，traceStartTime,traceStartTime,tracePageTime 这两个key值请勿占用，用于埋点使用；使用请新增key，默认commonStartTime
let throttleTimes = {
	commonStartTime: 0,
	traceStartTime: 0,
	traceEndTime: 0,
	tracePageTime: 0
};

// 添加实例方法, 兼容ui里的老代码
let core = {
	commonTraceInfo(title, label, params) {
		window.Vm && Vm.traceBehavior && Vm.traceBehavior(title, label, params);
	},

	toPage(toRouteName, params, query) {
		if (!toRouteName) {
			Ui.error(`路由name不存在: ${toRouteName}`);
			return;
		}

		Router.push({
			name: toRouteName,
			params: params,
			query: query
		});
	},
	replacePage(toRouteName, params, query) {
		if (!toRouteName) {
			Ui.error(`路由name不存在: ${toRouteName}`);
			return;
		}

		Router.replace({
			name: toRouteName,
			params: params,
			query: query
		});
	},

	// 业务跳转
	toMultipage(toBusinessName, params, query) {
		let currentBusinessName;
		if (Env === 'dev') {
			currentBusinessName = window.location.href.split('business/')[1].split('?')[0];
		} else {
			currentBusinessName = window.location.href.split('business/')[1].split('/')[0];
		}
		console.log('currentRouterName', currentBusinessName);
		let url = window.location.href.replace(currentBusinessName, toBusinessName);
		window.location.href = url.replace(/(#\/).*/g, '');
	},

	/**
	 * 按配置进行路由跳转
	 * @param routerList {Array} 数组内为对象，根据业务流程排序，参考如下：
	 * ｛
	 *    name: toRouteName,
	 *    params: params,
	 *    query: query,
	 *    flag： true // 是否跳转
	 * ｝
	 */
	toPageByConfig(routerList) {
		console.log('currentRouterName', Router.history.current.name);
		let index = routerList.findIndex(item => item.name === Router.history.current.name);
		for (let i = index + 1; i < routerList.length; i++) {
			if (routerList[i].flag) {
				Router.push(routerList[i]);
				break;
			}
		}
	},

	// 返回之前的某个指定路由页面 若routeName为空，则返回上一步
	toBack(routeName, params = {}, query = {}) {
		if (routeName) {
			Router.push({
				name: routeName,
				params: params,
				query: query
			});
		} else {
			Router.go(-1);
		}
	},

	// 判断类型 包括区分[]空数组与{}空对像
	typeof(object, type) {
		let typeStr = Object.prototype.toString.call(object).slice(8, -1);
		return typeStr === type;
	},

	// 获取url中传递的信息
	getUrlParam() {
		let params = {}; // 存储从url上获取的信息
		let paramsStr = window.location.search; // 获取url信息
		if (typeof paramsStr !== 'undefined' && paramsStr) { // 如果当时url有传值 没有传值则默认是第一次进入页面
			params = Filter.getUrlKey(paramsStr);
		}
		return params;
	},
	/**
	 * @function 通过Store.commit 设置 state中的值 -- mutation
	 * */
	setData(key, value) {
		Store.commit('setState', {
			key,
			value
		});
	},
	/**
	 * @function 通过getter获取 state中的值
	 * */
	getData(key) {
		return Store.getters.getState(key);
	},

	getGlobalData(name) {
		return JSON.parse(localStorage.getItem(name));
	},
	setGlobalData(name, obj) {
		localStorage.setItem(name, JSON.stringify(obj));
	},
	getSessionData(name) {
		return JSON.parse(sessionStorage.getItem(name));
	},
	setSessionData(name, obj) {
		sessionStorage.setItem(name, JSON.stringify(obj));
	},
	throttle2(func, delay = 1000, args, key = 'commonStartTime') {
		console.log(Date.now(), throttleTimes[key], 'throttle========================');
		if (Date.now() - throttleTimes[key] > delay) {
			throttleTimes[key] = Date.now();
			console.log(func, 'throttle==============');
			if (core.typeof(args, 'Array')) {
				func && func(...args);
			} else {
				func && func();
			}
		}
	},
	// 获取协议URL
	getAgreementUrl(type) {
		let protocolType = type;
		let businessType = Store.state.businessType;
		let subBranchId = Core.getData('channelAuthInfo').subBranch.subBranchId;
		if (typeof type !== 'string') {
			protocolType = type['type'];
			businessType = type['businessType'];
			subBranchId = type['subBranchId'];
		}
		const url = UrlApi.getAgreementOnWeFile(protocolType, businessType, subBranchId);
		Ui.loading(true, '加载中');
		return new Promise((resolve, reject) => {
			App.get({
				url,
				success: res => {
					if (res.agreementUrl && res.agreementUrl !== null) {
						console.log('agreementUrl', res.agreementUrl);
						resolve(res.agreementUrl);
					} else {
						// Core.traceBehavior('error-暂无可用协议');
						resolve('');
						// Ui.error('暂无可用协议');
					}
				},
				error: () => {
					// Core.traceBehavior('error-暂无可用协议');
					resolve('');
					// Ui.error('暂无可用协议');
				}
			});
		});
	}
};
export default core;
