const businessConfig = require('./business-test.js');

const exportsConfig = {

	EnvConfig: {
		// APP_ENV: 'debug-pc', //表明这是打包环境(需要打包)， 已在package.json  中用cross-env  APP_ENV=*  定义
		VUE_APP_ENV: '"debug-pc"', // 表明生产环境模式信息
		VUE_APP_TITLE: '"debug-pc模式"', // 表明生产环境模式信息
		VUE_APP_BASE_API: '"https://www-st.pafacebank.com"', // 后台测试服务器地址
		VUE_APP_BASE_RES: '"https://www-st.pafacebank.com"', //   静态资源服务器地址
		VUE_APP_SERVICE: '"https://test-b-fat.pingan.com.cn/iclientstore/im"',//   在线客服
	}
};
module.exports = Object.assign(businessConfig, exportsConfig);// 把两个环境的配置进行合并

