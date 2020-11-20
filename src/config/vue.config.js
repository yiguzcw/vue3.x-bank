const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBuildFilter = require('./build/base-webpack');// 导入webpack打包配置的基本方法及环境过滤

console.log('********* 当前打包的webpack环境 === ' + process.env.APP_ENV + '   ;webpack build模式 = ' + webpackBuildFilter.webpackFilter(process.env.APP_ENV));

const config_app = require(`./build/webpack.${webpackBuildFilter.webpackFilter(process.env.APP_ENV)}`); // 根据环境判断需要加载的webpack 配置


console.log('********* 当前打包的 web-app 环境 env_prod_test === ' + webpackBuildFilter.env_prod_test);


// console.log('********* 当前打包的 config   === ' + JSON.stringify(config_app));

console.log('********* << web-app  build  start >> *********');

let pages = {};

config_app.businessArray && config_app.businessArray.forEach(v => {
	pages[v.chunk.trim()] = {
		// page 的入口
		entry: config_app.pagesEntry(v),
		// 模板来源
		template: config_app.pagesTemplate(v),
		// 在 dist/index.html 的输出
		filename: config_app.pagesFileName(v),
		// 当使用 title 选项时，
		// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
		title: v.chunkName,
		chunkId: v.chunkId,
		h5AppId: config_app.h5AppId,
		// 指定在index.html里要引入哪个js
		chunks: [v.chunk, 'common', 'vendor'],
		BASE_URL: config_app.BASE_URL, // HTML 文件中，你需要通过 <%= BASE_URL %> 设置链接前缀：<link rel="icon" href="<%= BASE_URL %>favicon.ico">
		libList: config_app.libList || { css: [], js: [] }, // public 文件夹中的项目依赖
		cdnList: config_app.cdnList || { css: [], js: [] }//  cdn 资源依赖
	};
});

// 直接修改webpack配置，不需要return ，   更倾向于整体替换和修改
let configureWebpack = webpackConfig => {

	// 配置别名
	let alias = config_app.alias();
	alias && Object.assign(webpackConfig.resolve.alias, alias); // 合并

	// 不打包文件过滤，使用cdn方式外部资源直接引入,一般用于生产
	config_app.externals && (webpackConfig.externals = config_app.externals);

	// 合并plugins
	webpackConfig.plugins = webpackConfig.plugins.concat(config_app.plugins || []);


	// webpackConfig.output.chunkFilename = 'business/[name]/[name].[contenthash:8].js';
	// 修改打包的业务js文件，放到入口下
	// 有个小问题：只用hash:8。生产所有业务js的hash值是一样的。而用contenthash:8非生成环境会报错！！！！
	// if (process.env.WEBPACK_ENV === 'pro' || process.env.WEBPACK_ENV === 'test') {
	if (webpackBuildFilter.env_prod_test) { // 生产环境
		webpackConfig.output.filename = 'business/[name]/[name].[contenthash:8].js';
		// webpackConfig.output.chunkFilename = 'business/[name]/[name].[contenthash:8].js';
	} else {
		webpackConfig.output.filename = 'business/[name]/[name].[hash:8].js';
		// webpackConfig.output.chunkFilename = 'business/[name]/[name].[hash:8].js';
	}

	// 修改打包的业务js文件，放到入口下
	// webpackConfig.output.filename = config_app.jsFileName;


	// 全局注入less变量、mixins
	// 拿到lessLoaders
	let lessLoaders = webpackConfig.module.rules.find(v => v.test.toString().includes('.less'));
	// 插入配置
	lessLoaders.oneOf.map(v => {
		v.use.push({
			loader: 'style-resources-loader',
			options: {
				patterns: config_app.lessMixins()
			}
		});
	});
	/* webpackConfig.module.rules.push({
	   test: /\.(vue)$/,
	   loader: ['eslint-loader'],
	   enforce: 'pre',
	   exclude: /node_modules/,
	   // options: {
	   // 	fix: true
	   // }
   }); */

	// webpackConfig.module
	//     .rules.push({
	//     // 匹配 *.worker.js
	//     test: /\.worker\.js$/,
	//     use: {
	//         loader: 'worker-loader',
	//         options: {
	//             name: 'work_[name].[hash:8].js',
	//             inline: true,
	//             fallback: false
	//             // publicPath: '/scripts/workers/'
	//         }
	//     }
	// });

};

// 链式修改webpack内部配置，灵活性更高，操作难度更大
const chainWebpack = webpackConfig => {

	// webpackConfig.plugins.delete('html');
	// webpackConfig.plugins.delete('preload');
	// webpackConfig.plugins.delete('prefetch');
	// 移除 prefetch 插件
	webpackConfig.plugins.delete('prefetch');
	// // 移除 preload 插件
	// webpackConfig.plugins.delete('preload');


	console.log('web-app  build 是否chunk 抽离：= ' + config_app.splitChunk);
	// 修改默认的splitChunks插件配置
	webpackConfig.optimization.splitChunks({
		chunks: 'all',
		minSize: 30000, // 模块的最小体积 30k
		// maxSize: 1000000, // 最大1M
		minChunks: 2, // 模块的最小被引用次数,不能设置为1
		// maxAsyncRequests: 5, // 按需加载的最大并行请求数
		// maxInitialRequests: 3, // 一个入口最大并行请求数
		// automaticNameDelimiter: '-', // 文件名连接
		cacheGroups: {
			default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			},
			vendor: { // node_mudules 文件夹中的模块打包进一个叫 vendors  第三方库抽离
				name: 'vendor',
				test: /node_modules/,
				priority: 10,
				chunks: 'initial',
				minChunks: Object.getOwnPropertyNames(pages).length
			},
			common: { // 公用模块抽离
				// minChunks: 2, // 模块的最小被引用次数
				name: 'common',
				priority: 1,
				chunks: 'initial',
				minChunks: Object.getOwnPropertyNames(pages).length
			}
		}

	});
	// console.log('生产或者测试环境  代码压缩 == ' + webpackBuildFilter.env_prod_test);
	if (webpackBuildFilter.env_prod_test) { // 表示生产或者测试环境 , 进行压缩处理，并移除所有的日志和debugger
		//  修改默认的TerserPlugin插件配置, 进行代码压缩处理

		webpackConfig.optimization.minimize = true; // 进行代码压缩

		// 	// webpackConfig.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
		// 	// webpackConfig.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
		// 	// webpackConfig.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
		// 	// webpackConfig.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
		webpackConfig.optimization.minimizer([
			new TerserPlugin({
				cache: false,
				parallel: true,
				sourceMap: false, // 生产部开启映射
				terserOptions: {
					compress: {
						warnings: false,
						drop_console: true,
						drop_debugger: true,
						pure_funcs: ['console.log']
					}
				}
			}),

			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true
						},
						normalizeUnicode: false
					}]
				},
				canPrint: true
			})
		]);
		//
		//

	} else {
		webpackConfig.optimization.minimize = false; // 进行代码压缩
	}

};

module.exports = {
	publicPath: config_app.publicPath,
	pages,
	outputDir: config_app.outputDir(),
	// 其他资源输出路径，默认都放common（与business同级），debug、debugMock则放到业务文件夹下
	assetsDir: config_app.assetsDir || 'assets',
	lintOnSave: config_app.lintOnSave, // 是否需要eslint
	productionSourceMap: config_app.productionSourceMap, // 是否需要sourcemap
	configureWebpack,
	chainWebpack,
	css: {
		// 作用于ExtractTextWebpackPlugin。修改css输出路径
		extract: config_app.cssExtra
	},
	devServer: config_app.devServer || {}
};
