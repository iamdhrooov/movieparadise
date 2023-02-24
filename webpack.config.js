const webpack = require('webpack');
const dotenv = require('dotenv');
const {resolve} = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {version} = require('./package.json');
const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  const removeEmpty = (plugins) => plugins.filter((plugin) => !!plugin);
  const isProd = !!env.prod;
  const isLocal = !!env.local;
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const envPath =
    basePath +
    '.' +
    (env.prod ? 'production' : env.local ? 'local' : 'development');
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({path: finalPath});
  const parsedConfig = fileEnv && fileEnv.parsed;

  let envKeys = {};
  // reduce it to a nice object, the same as before
  if (parsedConfig) {
    envKeys = Object.keys(parsedConfig).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(parsedConfig[next]);
      return prev;
    }, {});
    console.log('Env variables', envKeys);
  }

  const output = {
    path: resolve(process.cwd(), 'dist'),
    filename: env.dev ? `[name].[hash].${version}.js` : `[name].${version}.js`,
    publicPath: env.prod ? './' : env.dev ? './' : 'http://localhost:9000/',
  };

  return {
    devtool: false,
    entry: ['@babel/polyfill', './src/index.tsx'],
    output,
    mode: env.prod || env.dev ? 'production' : 'development',
    context: resolve(__dirname),
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    },
    optimization: {
      usedExports: true,
      minimize: !!env.prod || !!env.dev,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
    },
    plugins: removeEmpty([
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './public/.',
            to: '.',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
      new webpack.DefinePlugin(envKeys),
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        minify: env.prod ? true : false,
      }),
      ...(isProd && !isLocal
        ? [
            new webpack.LoaderOptionsPlugin({
              minimize: true,
              debug: false,
            }),
          ]
        : []),
    ]),
    devServer: {
      historyApiFallback: true,
      static: './dist',
      compress: true,
      port: 9000,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {test: /\.tsx?$/, use: ['babel-loader', 'ts-loader']},
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader'],
          sideEffects: true,
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
  };
};
