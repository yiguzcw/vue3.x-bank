/**
 * 整个项目的配置源
 * */
const path = require('path');

const config = {
	// 当前打包的项目源码文件夹
	src: 'src',
	BASE_URL: '../../', //  静态资源中 HTML 文件中，你需要通过 <%= BASE_URL %> 设置链接前缀：<link rel="icon" href="<%= BASE_URL %>favicon.ico">
	pagesEntry: v => `${config.src}/business/${v.chunk.trim()}/index.js`, // 对应vue.config.js 的pages.entry
	pagesTemplate: () => `${config.src}/template/index.html`, // 对应vue.config.js 的pages.template
	pagesFileName: v => `business/${v.chunk.trim()}/index.html`, // 对应vue.config.js 的pages.filename
	// 要注入全局的less mixins、变量；对应lessLoaders
	lessMixins: () => [
		path.resolve(__dirname, `../${config.src}/assets/styles/vars.less`)
	],
	// 对用vue.config.js的outputDir  输出额文件夹
	outputDir: () => `dist/${process.env.APP_ENV}`,
	assetsDir: 'assets', // 打包后资源输出文件夹
	// 别名配置
	alias: () => ({
		vue$: 'vue/dist/vue.esm.js',

		common: path.resolve(`${config.src}/common/`),
		assets: path.resolve(`${config.src}/assets/`),
		
		'@src': path.resolve(`${config.src}/`), // src 资源
		'@components': path.resolve(`${config.src}/components/`),
		'@common': path.resolve(`${config.src}/common/`),
		'@common_modules': path.resolve(`${config.src}/common/modules/`),
		'@assets': path.resolve(`${config.src}/assets/`),
		'@business-ui': path.resolve(`${config.src}/components/business-ui`),
		'@base-ui': path.resolve(`${config.src}/components/base-ui`)
	})
};
module.exports = config;
