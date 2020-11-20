import httpBase from './http-base';

let httpTimeOut = 90000; // 超时时间
// 添加实例方法
let methods = {
    // 头部配置
    configHeader(method, options) {
        let commHeaders = { // 公共头部
            'Content-Type': (method === 'post' || method === 'put') ? 'application/json' : 'application/x-www-form-urlencoded',
            'x-trace-id': httpBase.createUuid(),
            'X-Accept-Json-Format': 'Wrapped'

        };
        // 拼接请求头部
        return Object.assign(commHeaders, options.headers);
    },
    setParams(method, options) {
        console.log('------ http  url ---------' + options.url);
        let url = httpBase.joinUrl(options.url); // 请求连接
        // 拼接请求头部
        let httpHeaders = this.configHeader(method, options);
        // let headers = options.headers || {}; // 业务header
        let params = options.params || {}; // 请求参数

        // 判断请求是否正确
        if (!httpBase._isCorrectRequest(options)) {
            return;
        }
        // 队列管控
        if (httpBase.httpManagerReq(url, params)) {
            Ui.loading(false);
            return;
        }
        let body;
        let qs;
        if (method === 'post' || method === 'put') {
            body = params;
            qs = {};
        } else {
            body = {};
            qs = params;
        }
        let httpOptions = {
            url: url,
            method: (method || 'get').toLowerCase(),
            body: body,
            qs: qs,
            timeout: httpTimeOut,
            headers: httpHeaders
        };
        console.log('aladdin.http.request 请求前', httpOptions);
        return httpOptions;
    },
	/**
	 * 请求接口
	 * @param method 请求方式
	 * @param options 请求参数
	 * @param isFire 是否fire接口
	 * */
    fetch(method, options) {
        let params = this.setParams(method, options);
        aladdin.http.request(params, (err, res) => {
            console.log('aladdin.http.request 响应 err,res', err, res);
            this.httpResponse(options, res);
        });
    },
    // 对请求结果的处理
    httpResponse(options, res) {
        Ui.loading(false);
        // 请求完成后，从队列中移除
        httpBase.httpManagerRov(options.url, options.params);
        if (res.status === 200) {
            let result;
            
            if (res.body) { // 返回是body
                result = JSON.parse(res.body);
            } else { // 返回是data
                result = res.data;
            }

            console.log('Http-fetch Response  result ==== ', result);
            // fire 初始化 结果处理
            httpBase.onHttpResSuccess(result, options);
        } else {
            httpBase.onHttpResError(res, options);
            // httpBase._handleError(e, options);
        }
    },

};
// 遍历声明接口调用方法
httpBase.forEachHttpMethods(methods);

export default {
    ...httpBase,
    ...methods
};

