const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const mode = process.env.NODE_ENV;
const isProd = mode === 'production';
const { resolveAlias, externals, lessMixins, getPluginsConfig } = require('./scripts/buildTools');
const { pages, businessListHtml, serverPort } = require('./getEntryConfig.js');

console.log(pages);
const wenpackConfig = {
    ...pages,
    publicPath: '/', //publicPath: process.env.NODE_ENV === 'production' ? '/mooc-mogujie/' : '/', '../../',
    outputDir: 'dist',
    // 其他资源输出路径，默认都放common（与business同级），debug、debugMock则放到业务文件夹下
    assetsDir: 'static',
    chainWebpack: (config) => {
        // config.resolve.alias
        //     .set('@', resolve('src/examples'))
        //     .set('@packages', resolve('src/packages'));
        // 	config.module
        // 		.rule("svg")
        // 		.exclude.add(resolve('src/style/base/fonts'))
        // 		.end()
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // // 移除 preload 插件
        // config.plugins.delete('preload');

        // console.log('生产或者测试环境  代码压缩 == ' + isProd);
        if (isProd) {
            // 表示生产或者测试环境 , 进行压缩处理，并移除所有的日志和debugger
            //  修改默认的TerserPlugin插件配置, 进行代码压缩处理

            config.optimization.minimize = true; // 进行代码压缩
            // 修改默认的splitChunks插件配置
            config.optimization.splitChunks({
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
                        reuseExistingChunk: true,
                    },
                    vendor: {
                        // node_mudules 文件夹中的模块打包进一个叫 vendors  第三方库抽离
                        name: 'vendor',
                        test: /node_modules/,
                        priority: 10,
                        chunks: 'initial',
                        minChunks: Object.getOwnPropertyNames(pages).length,
                    },
                    common: {
                        // 公用模块抽离
                        // minChunks: 2, // 模块的最小被引用次数
                        name: 'common',
                        priority: 1,
                        chunks: 'initial',
                        minChunks: Object.getOwnPropertyNames(pages).length,
                    },
                },
            });
            // 	// config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
            // 	// config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            // 	// config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
            // 	// config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
            config.optimization.minimizer([
                new TerserPlugin({
                    cache: false,
                    parallel: true,
                    sourceMap: false, // 生产部开启映射
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'],
                        },
                    },
                }),

                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: {
                                    removeAll: true,
                                },
                                normalizeUnicode: false,
                            },
                        ],
                    },
                    canPrint: true,
                }),
            ]);
            //
            //
        } else {
            config.optimization.minimize = false; // 进行代码压缩
        }
    },

    configureWebpack: (config) => {
        // 配置别名
        let alias = resolveAlias();
        alias && Object.assign(config.resolve.alias, alias); // 合并

        // 不打包文件过滤，使用cdn方式外部资源直接引入,一般用于生产
        externals && (config.externals = externals);

        // 合并plugins
        config.plugins = config.plugins.concat(getPluginsConfig(businessListHtml));

        // config.output.chunkFilename = 'business/[name]/[name].[contenthash:8].js';
        // 修改打包的业务js文件，放到入口下
        // 有个小问题：只用hash:8。生产所有业务js的hash值是一样的。而用contenthash:8非生成环境会报错！！！！
        // if (process.env.WEBPACK_ENV === 'pro' || process.env.WEBPACK_ENV === 'test') {
        if (mode === 'production') {
            // 正式发布时移除console语句
            // config.optimization.minimizer[0].options.terserOptions.compress.dropConsole = true;
            // 生产环境
            config.output.filename = 'business/[name]/[name].[contenthash:8].js';
            // config.output.chunkFilename = 'business/[name]/[name].[contenthash:8].js';
        } else {
            config.output.filename = 'business/[name]/[name].[hash:8].js';
            // config.output.chunkFilename = 'business/[name]/[name].[hash:8].js';
        }
        // 全局注入less变量、mixins
        // 拿到lessLoaders
        let lessLoaders = config.module.rules.find((v) => v.test.toString().includes('.less'));
        // 插入配置
        lessLoaders.oneOf.map((v) => {
            v.use.push({
                loader: 'style-resources-loader',
                options: {
                    patterns: lessMixins(),
                },
            });
        });
    },
    css: {
        sourceMap: true, // 开启 CSS source maps
        loaderOptions: {
            postcss: {
                plugins: [
                    // require('postcss-plugin-px2rem')({
                    //     rootValue: 75,
                    //     exclude: /(node_module)/,
                    //     minPixelValue: 3,
                    // }),
                ],
            },
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
            scss: {
                prependData: `
					@import "@/style/gobal.scss";
                `,
            },
        },
        // 作用于ExtractTextWebpackPlugin。修改css输出路径
        extract: isProd
            ? false
            : {
                  filename: 'business/[name]/[name].[contenthash:8].css',
                  // chunkFilename: 'business/[name]/[name].[contenthash:8].css'
              },
    },
    lintOnSave: false, // 是否需要eslint
    productionSourceMap: true, // 是否需要sourcemap
    devServer: {
        // open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
        port: serverPort, // 在这里修改端口号
        // proxy: {
        //     '/api/*': {
        //         target: 'https://www.easy-mock.com/mock/5fb49a3d8ab3eb27be073c08/mogujie',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '',
        //         },
        //     },
        // 	'/facebank/api/': {//代理api
        // 		target: businessConfig.VUE_APP_BASE_API, //服务器api地址
        // 		ws: true,
        // 		changeOrigin: true //是否跨域   businessConfig.VUE_APP_BASE_API/facebank/api/
        // 		// pathRewrite: {//重写路径
        // 			// '^/facebank/api/': ''
        // 		// }
        // 	}
        // },
    },
};
console.log(wenpackConfig);
module.exports = wenpackConfig;
