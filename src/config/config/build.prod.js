const businessConfig = require('./business-prod.js');

const exportsConfig = {

	EnvConfig: {
		// APP_ENV: 'prod',  //表明这是打包环境(需要打包)， 已在package.json  中用cross-env  APP_ENV=*  定义
		VUE_APP_ENV: '"prod"', // 表明应用环境模式信息
		VUE_APP_TITLE: '"生产环境"', // 表明模式应用标题信息
		VUE_APP_BASE_API: '"https://rmb.pingan.com.cn/account/bank/cust/fbank"', // 后台测试服务器地址
		VUE_APP_BASE_RES: '"https://rmb.pingan.com.cn/account/bank/cust/fbank"',//   静态资源服务器地址
		VUE_APP_SERVICE: '"https://b.pingan.com.cn/paim"',//   在线客服
		VUE_APP_MOCK: false,
	}

};
module.exports = Object.assign(businessConfig, exportsConfig);// 把两个环境的配置进行合并
