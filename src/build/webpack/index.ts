require('module-alias/register')
import webpack from 'webpack';
import { getCwdPath, loggerTiming, loggerError, loggerInfo, loggerSuccess } from '../../util'
import { loadFile } from '../../util/file'
import { getProConfig } from './webpack.pro.config'
import { getDevConfig } from './webpack.dev.config'
import { getCssLoaders, getCssPlugin } from './css.config'
import cacheConfig from './cache.config';
import ora from "ora";

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

const WebpackDevServer = require('webpack-dev-server/lib/Server')

/**
 * @description: 
 * @param {*} webpack 构建
 * @return {*}
 */
export const buildWebpack = () => {

  loggerTiming('WEBPACK BUILD');
//   const spinner = ora('Webpack building...')
  const rewriteConfig = loadFile<any>(getCwdPath('./cli.config.json'), false)

  const webpackConfig = getProConfig({
    ...rewriteConfig,
    cssLoader: getCssLoaders(false),
    ...getCssPlugin(),
    ...cacheConfig
  })

  // const compiler = webpack(smp.wrap(webpackConfig));
  const compiler = webpack(webpackConfig);
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
    compiler.run((err: any, stats: any) => {
      if (err) {
        loggerError(err);
      } else {
        loggerSuccess('WEBPACK SUCCESS!');
      }
      compiler.close(() => {
        loggerInfo('WEBPACK GENERATE CACHE');
      });
      loggerTiming('WEBPACK BUILD', false);
    });
  } catch (error) {
    loggerError(error)
  }
}

/**
 * @description: 
 * @param {*} webpack 开发环境
 * @return {*}
 */
export const devServerWebpack = () => {

  loggerTiming('WEBPACK DEV');
  const rewriteConfig = loadFile<any>(getCwdPath('./cli.config.json'), false)
  const webpackConfig = getDevConfig({ ...rewriteConfig, cssLoader: getCssLoaders(true), ...cacheConfig })

  const compiler = webpack(webpackConfig);

  const devServerOptions = {
    stats: 'errors-only',
    contentBase: 'dist',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    open: true
  };

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, "0.0.0.0", () => {
    loggerTiming('WEBPACK DEV', false);
    loggerInfo('Starting server on http://localhost:8000');
  });

}
