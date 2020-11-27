const path = require('path');
// const webpack = require('webpack');
// const VConsolePlugin = require('vconsole-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { businessListHtml } = require('../getEntryConfig');

const resolveApp = (filePath) => path.join(__dirname, filePath);
const resolvePath = (relativePath, filePath) => path.resolve(resolveApp(relativePath), filePath);
const lessMixins = () => [
    // path.resolve(__dirname, `../src/assets/styles/vars.less`)
];
// 别名配置
const resolveAlias = () => ({
    vue$: 'vue/dist/vue.esm.js',
    '@src': path.resolve(`src/`), // src 资源
    '@components': path.resolve(`src/components/`),
    '@common': path.resolve(`src/common/`),
    '@assets': path.resolve(`src/assets/`),
});

const externals = {
    // 用cdn方式引入, 不进行打包
    vue: 'Vue',
    // 'vuex': 'Vuex',// 'vue-router': 'VueRouter',
    // 'axios': 'axios',
    poppy: 'poppy',
};

const getPluginsConfig = (businessListHtml) => [
    // new VConsolePlugin({
    //     enable: true,
    // }),
    // new webpack.DefinePlugin(
    //     {
    //         'process.env': {EnvConfig: businessConfig.EnvConfig} // 合并
    //     }
    // ),
    // 额外的HtmlWebpackPlugin是为了展示当前运行的项目
    new HtmlWebpackPlugin({
        title: '当前运行的项目',
        filename: 'index.html',
        template: `src/template/entry.html`,
        businessListHtml,
        chunks: [],
    }),
];

module.exports = {
    resolveAlias,
    externals,
    lessMixins,
    getPluginsConfig,
};
