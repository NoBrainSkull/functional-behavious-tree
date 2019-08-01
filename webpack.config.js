const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    nodeEnv: false,
    minimize: false
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      ':src': path.resolve(__dirname, '/src'),
      ':test': path.resolve(__dirname, '/__test__')
    }
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'imports-loader',
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        ]
      }
    ]
  }
}
