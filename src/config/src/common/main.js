// 公共处理js
import FastClick from 'fastclick';
// import Vue from 'vue';
import App from '@common/app.vue';
import commonApis from '@common_modules/apis';

import commonRouter from '@common_modules/router.js';
import commonStore from '@common/store';
import routerCacheControl from '@common/routerCacheControl.js';

// import '@assets/styles/animate.css';
// import '@components/base-ui/icon/_icon.less';

// import '@/libs/flexible'; // 引人rem适配

import onepx from '@common_modules/onepx'; // 1像素指令
import keyCode from '@common_modules/keycode'; // 关键码

import core from '@common_modules/core.js';
import Filter from '@common_modules/filter.js';

import utils from '@common/modules/utils';
import Ui from '@common/modules/ui';

// import PaHeader from '@components/base-ui/header';
// import PaNavigator from '@components/base-ui/navigator';
// import PaIcon from '@components/base-ui/icon/index.vue';

// import PopUps from '@components/business-ui/pop-ups/index.js';
import DomPortal from 'vue-dom-portal'; // 全局弹框

import webtrends from './webtrends-mixin.js';

// Vue.component('PaHeader', PaHeader);
// Vue.component('PaNavigator', PaNavigator);
// Vue.component(PaIcon.name, PaIcon);

// Vue.use(PopUps);
Vue.use(DomPortal);

// 多人使用手机授权
// import MobileAuth from '@/components/business-ui/mobile-auth';
// Vue.use(MobileAuth);


// CDN引人poppy
// Vue.use(poppy);
// Vue.use(keyboard);
// Vue.use(vericode);

export default function (businessModule) {
	// 环境信息在最前面！！！
	window.Env = process.env.EnvConfig.VUE_APP_ENV;

	// 封装vue原生方法 -- 通过ref获取组件
	Vue.prototype.getRef = (refStr, context) => context.$refs[refStr];

	// 封装vue原生方法 -- 通过$route.params获取路由参数
	Vue.prototype.getRouteParams = (key, context) => {
		let paramsStr = window.location.search; // 查看url携带参数
		let params = {};
		// let params = Object.assign(context.$route.params,context.$route.query);
		if (typeof paramsStr !== 'undefined' && paramsStr) {
			// 判断携带的参数是否存在
			params = Filter.getUrlKey(paramsStr);
		}
		console.log('getRouteParams params type ==', params);
		params = Object.assign(context.$route.params, context.$route.query, params); // 拼接url query params的参数

		return key ? params[key] : params;
	};

	// apis,mock,router,store 共有与业务的模块进行合并
	let apis = commonApis(businessModule.apis);
	// let mock = commonMock(businessModule.mock);
	let router = commonRouter(businessModule.router.routerList);
	let store = commonStore(businessModule.store);

	console.log('当前为web-app- process.env.EnvConfig = ' + JSON.stringify(process.env.EnvConfig));
	// 加载mock数据
	if (process.env.EnvConfig.VUE_APP_MOCK) { // 表示mock  方案处理。 配置在 build  打包层
		console.log('当前为web-app-mock方案处理，　离线访问');
		let commonMock = require('@/common/modules/mock.js').default;
		commonMock(businessModule.mock);
	}

	// 将业务路由name单独抽离出来，避免直接在业务当中使用字符串去路由跳转
	const routerNames = {};
	let routerNameHandle = routerList => {
		routerList.forEach(item => {
			routerNames[item.name] = item.name;
			item.children && item.children.length !== 0 && routerNameHandle(item.children); // 递归
		});
		return routerNames;
	};

	window.routerNames = routerNameHandle(router.options.routes);
	console.log('业务路由names  routerNames==', routerNames);


	// 全局对象
	window.winApp = window.winApp || Object.create({});
    window.winApp = Object.assign(window.winApp, {

    })
	// 全局挂载， 方便使用
	window.winApp.UrlApi = apis;
	window.winApp.Device = require('@common_modules/device/index.js').default;
	window.winApp.Http = require('@common_modules/http/index.js').default;
	window.winApp.Ui = Ui;
	window.winApp.keyCode = keyCode; // 把关键的码
	window.winApp.Filter = Filter; // 公有的数据处理方法
	window.winApp.Router = router;
	window.winApp.Store = store; // 把VUEX  挂载全局方便使用其所有的实例和属性
	window.winApp.coreVue = core;
	window.winApp.Utils = utils;
	window.winApp.envConfig = process.env.EnvConfig;

	window.Store = store; // 把VUEX  挂载全局方便使用其所有的实例和属性
	// 引入项目公共值，如App、device、等等
	// winApp.config = require('@/config').default;
	window.UrlApi = apis;
	window.Device = require('@common_modules/device/index.js').default;
	window.App = require('@common_modules/http/index.js').default;
	window.Ui = Ui;
	window.keyCode = keyCode; // 把关键的码
	window.Filter = Filter; // 公有的数据处理方法
	window.Router = router;
	window.Core = core;
	window.Utils = utils;
	// 冻结全局对象
	// Object.deepFreeze(window.winApp);

	FastClick.attach(document.body); // 解决IOS点击延迟的问题
	console.log('********* 当前 web-app-mock 环境 VUE_APP_MOCK === ' + process.env.EnvConfig.VUE_APP_MOCK);


	// 引入路由管控
	routerCacheControl(router, store);
	// 重写PaNavigator的组件的data方法，让其data新增一个navList数据
	// let navData = PaNavigator.data();
	// navData.navList = businessModule.router.navList;
	// PaNavigator.data = function () {
	// 	return navData;
	// };

	// 全局混入:1像素指令
	Vue.mixin({
		directives: onepx
	});

	// 让业务通过this._isFirstIn字段判断是否是第一次进入页面。
	Vue.mixin({
		mounted() {
			[].forEach.call(document.getElementsByTagName('input'), x => {
				// 解决input轻点不生效的问题
				x.addEventListener('click', function (event) {
					event.srcElement.focus();
				});
				// 解决关闭弹出框不回缩的BUG
				x.addEventListener('blur', function (event) {
					window.scrollTo(0, 0);
				});
			});
		},
		activated() {
			// 让业务通过this._isFirstIn字段判断是否是第一次进入页面。
			this._isFirstIn = !this.__isActivated__;
			this.__isActivated__ = true;
		}
	});

	// 混入埋点
	Vue.mixin(webtrends);

	// 业务公共混入
	const businessMixin = businessModule.mixin;
	businessMixin && Vue.mixin(businessMixin);

	window.Vm = new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
}

// 冻结全局对象，全局应该是只读的。避免使用全局对象来传值，逻辑控制
// Object.deepFreeze = function(obj) {
// 	let propNames = Object.getOwnPropertyNames(obj);
// 	propNames.forEach(function(name) {
// 		let prop = obj[name];
// 		if (typeof prop === 'object' && prop !== null) {
// 			Object.deepFreeze(prop);
// 		}
// 	});
// 	return Object.freeze(obj);
// };
