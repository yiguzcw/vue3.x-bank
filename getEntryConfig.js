const path = require('path');
const fs = require('fs-extra');

const serverPort = 8091;
const rootPath = './src/business';
const businessArray = fs.readdirSync(rootPath);
function getPagesConfig() {
    let pages = {};
    let businessListHtml = '';
    businessArray &&
        businessArray.forEach((v) => {
            let pageConfig = JSON.parse(fs.readFileSync(`${rootPath}/${v}/config.json`));
            console.log(pageConfig);
            pages[v] = {
                // page 的入口
                entry: `${rootPath}/${v}/${pageConfig.main}`,
                // 模板来源
                template: pageConfig.template || './src/template/index.html',
                // 在 dist/index.html 的输出
                filename: `${v}/index.html`,
                // 当使用 title 选项时，
                // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
                title: pageConfig.title || '',
                chunkId: pageConfig.chunkId || '',
                // 指定在index.html里要引入哪个js
                chunks: [v, 'common', 'vendor'],
                h5AppId: pageConfig.chunkId || '',
                // BASE_URL: config_app.BASE_URL, // HTML 文件中，你需要通过 <%= BASE_URL %> 设置链接前缀：<link rel="icon" href="<%= BASE_URL %>favicon.ico">
                // libList: config_app.libList || { css: [], js: [] }, // public 文件夹中的项目依赖
                // cdnList: config_app.cdnList || { css: [], js: [] }, //  cdn 资源依赖
            };
            //循环创建已经打包的业务
            let url = `http://localhost:${serverPort}/business/${v}`;

            businessListHtml += `<li><span>${pageConfig.title}：</span><a href="${url}">${url}</a></li>`;
        });

    businessListHtml = `<ul>${businessListHtml}</ul>`;
    return {
        serverPort,
        businessListHtml,
        pages,
    };
}

module.exports = getPagesConfig();
