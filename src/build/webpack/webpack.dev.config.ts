import getBaseConfig from './webpack.base.config'
import { getCwdPath, } from '../../util'
import { Configuration } from 'webpack'

interface IDevWebpackConfig extends Configuration {
  entry?: {
    app?: string
  }
  output?: {
    chunkFilename: string
    filename: string,
    path: string
  }
  template?: string,
  cssLoader?: any
}

export const getDevConfig = (config: IDevWebpackConfig): Configuration => {

  const { entry, template, output, cssLoader, plugins, ...rest } = config

  return {
    ...getBaseConfig({
      mode: 'development',
      entry: {
        app: getCwdPath(entry?.app || './src/index.js')
      },
      output: {
        chunkFilename: output?.chunkFilename || '[name].[chunkhash].js',
        filename: output?.filename || '[name].[chunkhash].js',
        path: getCwdPath(output?.path || './dist'), // 打包好之后的输出路径
      },
      template: getCwdPath(template || 'public/index.html'),
      cssLoader,
      plugins
    }),
    ...rest
  }
}