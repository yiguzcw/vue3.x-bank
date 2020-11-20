const businessConfig = require('./business-test.js');

const exportsConfig = {

	EnvConfig: {
		// APP_ENV: 'uat1-test',  //表明这是打包环境(需要打包)， 已在package.json  中用cross-env  APP_ENV=*  定义
		VUE_APP_ENV: '"uat1-test"', // 表明应用环境模式信息
		VUE_APP_TITLE: '"uat1-测试环境"', // 表明应用环境标题信息
		VUE_APP_BASE_API: '"https://www-uat1.pafacebank.com"', // 后台测试服务器地址
		VUE_APP_BASE_RES: '"https://www-uat1.pafacebank.com"'//   静态资源服务器地址
	}

};
module.exports = Object.assign(businessConfig, exportsConfig);// 把两个环境的配置进行合并
