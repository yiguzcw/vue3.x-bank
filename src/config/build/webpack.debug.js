const webpack = require('webpack');
const VConsolePlugin = require('vconsole-webpack-plugin');

const businessConfig = require(`../config/build.${process.env.APP_ENV}`);
const projectConfig = require('../config/base-project');

module.exports = Object.assign({}, {
	publicPath: '../../',
	// 插件
	plugins: [
		new VConsolePlugin({
			enable: true
		}),
		new webpack.DefinePlugin(
			{
				'process.env': {EnvConfig: businessConfig.EnvConfig} // 合并
			}
		)

	],

	lintOnSave: false,	// 是否启用eslint
	productionSourceMap: true,	// 是否启用sourcemap
	cssExtra: {
		filename: 'business/[name]/[name].[contenthash:8].css'
		// chunkFilename: 'business/[name]/[name].[contenthash:8].css'
	},
	splitChunk: true		// 是否抽离js
}, businessConfig, projectConfig);
