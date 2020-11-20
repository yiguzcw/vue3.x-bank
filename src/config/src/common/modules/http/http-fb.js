import httpBase from './http-base';
import $axios from 'axios';
// 定义axios实例对象
$axios.defaults.withCredentials = true;
let $axiosIns = $axios.create({
	timeout: 10 * 9000 // 设置超时时间,
});
// 进行请求拦截
$axiosIns.interceptors.request.use(function (config) {
	console.log('------ 进行请求拦截----request----');

	// 设置头部数据
	config.headers['x-trace-id'] = httpBase.createUuid();
	// 设置头部数据
	config.headers['X-Accept-Json-Format'] = 'Wrapped';

	console.log(config);
	return config;

}, function (err) {
	console.log('------ 进行请求拦截-- err------');
	console.log(err);
	return Promise.reject(err);
});
// 进行返回拦截
$axiosIns.interceptors.response.use(response => {
	console.log('------进行返回拦截---------');
	console.log(response);
	return response;
}, error => {
	console.log('------进行返回拦截 error ---------');
	console.log(error);
	return Promise.reject(error);
});
// 添加实例方法
let methods = {
	/**
	 * 请求接口
	 * @param method 请求方式
	 * @param options 请求参数
	 * @param isFire 是否fire接口
	 * */
	fetch(method, options, isFire = false) {
		console.log('------ http  url ---------' + options.url);

		let url = httpBase.joinUrl(options.url); // 请求连接
		let params, data;

		// 只传入一个数据 =》 params。 如果是get。放到params里，如果是post请求，放到data里
		if (method === 'get' || method === 'delete') {
			params = options.params;	 // get参数
		} else if (method === 'post' || method === 'put') {
			data = options.params; // post请求参数
		} else {
			data = options.params;
			params = options.params;
		}
		!data && (data = {});
		!params && (params = {});

		let headers = options.headers || {}; // 业务header


		// 判断请求是否正确
		if (!httpBase._isCorrectRequest(options)) {
			return;
		}
		// 队列管控
		if (httpBase.httpManagerReq(url, params)) {
			Ui.loading(false);
			return;
		}
		console.log('请求前 headers', headers);
		console.log('请求前 params', params);
		console.log('请求前 data', data);
		$axiosIns({
			method,
			url,
			headers,
			params,		// get参数
			data	// post参数
		}).then(res => {
			console.log(res);
			// 判断请求是否正确
			httpBase.httpManagerRov(url, params);
			Ui.loading(false);
			if (res.status === 200) {
				let result = res.data; // 服务器返回数据
				httpBase.onHttpResSuccess(result, options);
			} else { // 204 no content
				// // 请求异常的处理 非 200  的情况
				httpBase.onHttpResError(res, options);
			}
		}, e => { // 404、503、请求超时之类的错误
			Ui.loading(false);
			// 判断请求是否正确
			httpBase.httpManagerRov(url, params);
			httpBase._handleError(e, options);
		});
	},


	// fetchPromise  调用网络请求
	fetchPromise(method = 'get', options) {
		let that = this;
		return new Promise((resolve, reject) => {
			options.reqModel = 'Promise';
			options.resolve = resolve;
			options.reject = reject;
			that.fetch(method, options);
		});
	},

	/**
	 * 请求fire接口  除个别业务外，每个业务只调用一次
	 * @param options 请求参数
	 * */
	initBusinessAuthPost(options) {
		this.post(options, true);
	}
};
// 遍历声明接口调用方法
httpBase.forEachHttpMethods(methods);

export default {
	...httpBase,
	...methods
};

