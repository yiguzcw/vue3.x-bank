const path = require('path')
const resolve = (dir) => path.join(__dirname, dir);
const mode = process.env.NODE_ENV;

module.exports = {
    // 修改 src 目录 为 examples 目录
    // pages: {
    //     index: {
    //         entry: 'examples/main.ts',
    //         template: 'public/index.html',
    //         filename: 'index.html',
    //     },
    // },
    publicPath: '/', //publicPath: process.env.NODE_ENV === 'production' ? '/mooc-mogujie/' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src/examples'))
            .set('@packages', resolve('src/packages'));
        // 	config.module
        // 		.rule("svg")
        // 		.exclude.add(resolve('src/style/base/fonts'))
        // 		.end()
    },


    configureWebpack: config => {
        if (mode === "production") {
            // 正式发布时移除console语句
            // config.optimization.minimizer[0].options.terserOptions.compress.dropConsole = true;
        }
    },
    css: {
        sourceMap: true, // 开启 CSS source maps
        loaderOptions: {
            postcss: {
				plugins: [
					require('postcss-plugin-px2rem')({
						rootValue: 75,
						exclude: /(node_module)/,
						minPixelValue: 3
					})
				]
            },
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
			scss: {
				prependData: `
					@import "@/style/gobal.scss";
                `
			}
        },
    },
    lintOnSave: false,
    productionSourceMap: true,
    devServer: {
        port: 9000,
        proxy: {
            '/api/*': {
                target: 'https://www.easy-mock.com/mock/5fb49a3d8ab3eb27be073c08/mogujie',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}