const businessConfig = require('./business-dev.js');

const exportsConfig = {

	EnvConfig: {
		// APP_ENV: 'dev', //表明这是打包环境(需要打包)， 已在package.json  中用cross-env  APP_ENV=*  定义
		VUE_APP_ENV: '"dev"', // 表明应用环境模式信息
		VUE_APP_TITLE: '"开发环境"', // 表明模式应用标题信息
		VUE_APP_BASE_API: '"https://rmb-stg.pingan.com.cn/account/bank/cust/fbank/facebank/int"', // 后台测试服务器地址 , 必须是 '""' 方式定义或 JSON.stringify("") 转换
		VUE_APP_BASE_RES: '"https://rmb-stg.pingan.com.cn/account/bank/cust/fbank/facebank/int"', //   静态资源服务器地址
		VUE_APP_SERVICE: '"https://test-b-fat.pingan.com.cn/iclientstore/im"', //   在线客服
		VUE_APP_MOCK: true // 表示是否开启Mock 数据
	},
	devPort: 8291,
	devServer: {
		// open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
		// host: 'localhost',
		// overlay: {
		// 	warnings: true,
		// 	errors: true
		// },
		// lintOnSave: true,
		port: 8291 // 在这里修改端口号
		// proxy: {
		// 	'/facebank/api/': {//代理api
		// 		target: businessConfig.VUE_APP_BASE_API, //服务器api地址
		// 		ws: true,
		// 		changeOrigin: true //是否跨域   businessConfig.VUE_APP_BASE_API/facebank/api/
		// 		// pathRewrite: {//重写路径
		// 			// '^/facebank/api/': ''
		// 		// }
		// 	}
		// }
	}


};
module.exports = Object.assign(businessConfig, exportsConfig);// 把两个环境的配置进行合并
