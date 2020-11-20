/**
 * webpack打包环境过滤器
 * */
const webpackBuildFilter = {
	env_prod_test: false, // 是否移交部署测试或者生产
	webpackFilter: env => { // 进行打包环境的过滤
		// 打包生产或者移交测试包， 统一使用 prod 的打包方式，准同生产
		let set_build_prod = new Set(['prod', 'production', 'st-test', 'uat-test', 'uat1-test']);
		// 打包debug或者debug 离线加载测试包， 统一使用 debug  的打包方式
		let set_build_debug = new Set(['debug', 'debug-pc', 'debug-offline']);
		// 打包dev或者dev 离线加载测试包， 统一使用 dev  的打包方式
		let set_build_dev = new Set(['dev', 'development']);

		if (set_build_prod.has(env)) { // 表示生产环境或者测试
			webpackBuildFilter.env_prod_test = true;
			return 'prod';
		} else if (set_build_debug.has(env)) { // 表示debug环境或者debug离线
			webpackBuildFilter.env_prod_test = false;
			return 'debug';
		} else if (set_build_dev.has(env)) { // 表示开发环境
			webpackBuildFilter.env_prod_test = false;
			return 'dev';
		}
	}

};
module.exports = webpackBuildFilter;
