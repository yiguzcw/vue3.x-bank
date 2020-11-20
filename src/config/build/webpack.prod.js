const webpack = require('webpack');

const businessConfig = require(`../config/build.${process.env.APP_ENV}`);
const projectConfig = require('../config/base-project');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css'];
/**
 * 生产环境和移交测试部署的打包配置
 * */
module.exports = Object.assign({}, {
	publicPath: '../../',

	plugins: [
		// new BundleAnalyzerPlugin({ analyzerPort: 9998 }),
		new webpack.DefinePlugin(
			{
				'process.env': {EnvConfig: businessConfig.EnvConfig} // 合并
			}
		),
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
		}),
		new CompressionWebpackPlugin({ // 开启生产环境文件压缩
			test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
			threshold: 10240,
			minRatio: 0.8,
			deleteOriginalAssets: false
		})
	],

	lintOnSave: false,	// 是否启用eslint
	productionSourceMap: false,
	splitChunk: true,	// 是否抽离js
	cssExtra: {
		filename: 'business/[name]/[name].[contenthash:8].css',
		// chunkFilename: 'business/[name]/[name].[contenthash:8].css'
	}


}, businessConfig, projectConfig);
