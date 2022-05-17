"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devServerWebpack = exports.buildWebpack = void 0;
require('module-alias/register');
var webpack_1 = __importDefault(require("webpack"));
var util_1 = require("../../util");
var file_1 = require("../../util/file");
var webpack_pro_config_1 = require("./webpack.pro.config");
var webpack_dev_config_1 = require("./webpack.dev.config");
var css_config_1 = require("./css.config");
var cache_config_1 = __importDefault(require("./cache.config"));
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
var WebpackDevServer = require('webpack-dev-server/lib/Server');
/**
 * @description:
 * @param {*} webpack 构建
 * @return {*}
 */
var buildWebpack = function () {
    util_1.loggerTiming('WEBPACK BUILD');
    //   const spinner = ora('Webpack building...')
    var rewriteConfig = file_1.loadFile(util_1.getCwdPath('./cli.config.json'), false);
    var webpackConfig = webpack_pro_config_1.getProConfig(__assign(__assign(__assign(__assign({}, rewriteConfig), { cssLoader: css_config_1.getCssLoaders(false) }), css_config_1.getCssPlugin()), cache_config_1.default));
    // const compiler = webpack(smp.wrap(webpackConfig));
    var compiler = webpack_1.default(webpackConfig);
    //   return new Promise((resolve, reject) => {
    //     loggerTiming('WEBPACK BUILD');
    //     spinner.start();
    //     compiler.run((err: any, stats: any) => {
    //       console.log(err)
    //       if (err) {
    //         if (!err.message) {
    //           spinner.fail('WEBPACK BUILD FAILED!');
    //           loggerError(err);
    //           return reject(err);
    //         }
    //       }
    //     });
    //     spinner.succeed('WEBPACK BUILD Successful!');
    //     loggerTiming('WEBPACK BUILD', false);
    //   })
    try {
        compiler.run(function (err, stats) {
            if (err) {
                util_1.loggerError(err);
            }
            else {
                util_1.loggerSuccess('WEBPACK SUCCESS!');
            }
            compiler.close(function () {
                util_1.loggerInfo('WEBPACK GENERATE CACHE');
            });
            util_1.loggerTiming('WEBPACK BUILD', false);
        });
    }
    catch (error) {
        util_1.loggerError(error);
    }
};
exports.buildWebpack = buildWebpack;
/**
 * @description:
 * @param {*} webpack 开发环境
 * @return {*}
 */
var devServerWebpack = function () {
    util_1.loggerTiming('WEBPACK DEV');
    var rewriteConfig = file_1.loadFile(util_1.getCwdPath('./cli.config.json'), false);
    var webpackConfig = webpack_dev_config_1.getDevConfig(__assign(__assign(__assign({}, rewriteConfig), { cssLoader: css_config_1.getCssLoaders(true) }), cache_config_1.default));
    var compiler = webpack_1.default(webpackConfig);
    var devServerOptions = {
        stats: 'errors-only',
        contentBase: 'dist',
        hot: true,
        disableHostCheck: true,
        historyApiFallback: true,
        compress: true,
        open: true
    };
    var server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(8080, "0.0.0.0", function () {
        util_1.loggerTiming('WEBPACK DEV', false);
        util_1.loggerInfo('Starting server on http://localhost:8000');
    });
};
exports.devServerWebpack = devServerWebpack;
