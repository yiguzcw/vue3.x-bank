const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const businessConfig = require(`../config/build.${process.env.APP_ENV}`);
const projectConfig = require('../config/base-project');

let businessListHtml = '';

businessConfig.businessArray.forEach(business => {
	//循环创建已经打包的业务
	let url = `http://localhost:${businessConfig.devPort}/business/${business.chunk.trim()}`;
	businessListHtml += `<li>
			<span>${business.chunkName}：</span><a href="${url}">${url}</a>
		</li>`;
});

businessListHtml = `<ul>${businessListHtml}</ul>`;

/**
 * 开发环境打包配置
 * */

module.exports = Object.assign({}, {
	
	publicPath: '/',
	plugins: [
		
		// new BundleAnalyzerPlugin(), // 打包分析
		new webpack.DefinePlugin( // DefinePlugin允许我们创建全局变量，可以在编译时进行设置，因此我们可以使用该属性来设置全局变量来区分开发环境和正式环境
			{
				'process.env': {EnvConfig: businessConfig.EnvConfig} // 合并
			}
		),
		// 额外的HtmlWebpackPlugin是为了展示当前运行的项目
		new HtmlWebpackPlugin({
			title: '当前运行的项目',
			filename: 'index.html',
			template: `${projectConfig.src}/template/entry.html`,
			businessListHtml,
			chunks: []
		})
	
	],
	
	
	lintOnSave: false,	// 是否启用eslint
	splitChunk: false,	// 是否抽离js
	productionSourceMap: true,
	cssExtra: false	// 是否抽离css
	
}, businessConfig, projectConfig);
