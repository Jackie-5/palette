/**
 * Created by Jackie.Wu on 2017/8/24.
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clone = require('clone');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackEjsTemplate = require('./webpack-ejs-template');
const webpackConfig = require('./config')();
const routerConfig = require('../router-config.json');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

webpackConfig.entry = {};

for (let i in routerConfig) {
    routerConfig[i].js.forEach((item) => {
        webpackConfig.entry[`./build${i + item.split('.js')[0]}`] = `./src/controller${i + item}`
    });
}

const ENV = process.env.npm_lifecycle_event;

webpackConfig.output = {
    filename: '[name].js',
};

if (ENV === 'dev') {
    const obj = {
        template: './src/index.ejs',
        ejsObject: {}
    };
    ['midas'].forEach((item) => {
        webpackConfig.plugins.push(
            new CopyWebpackPlugin([
                {
                    from: './src/' + item + '/',
                    to: './' + item
                }
            ]),
            new ProgressBarPlugin()
        );
    });

    for (let i in routerConfig) {
        const arrJs = [];
        const cloneI = clone(i);
        obj.filename = `${cloneI.substring(1, cloneI.length)}.html`;
        routerConfig[i].js.forEach((item) => {
            arrJs.push(`/build${i + item}`)
        });
        obj.ejsObject.pathJs = arrJs;
        obj.ejsObject.point = i;
        webpackConfig.plugins.push(
            new webpackEjsTemplate(obj)
        );
    }

    const compiler = webpack(webpackConfig);

    const server = new WebpackDevServer(compiler, {
        hot: true,
        inline: true,
        historyApiFallback: true,
        stats: { colors: true },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
        }
    });

    server.listen(3000, () => {
        console.log(`server start success, port 3000`);
    });

}

if (ENV === 'build') {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
        console.log(`compiler success`);
    });
}