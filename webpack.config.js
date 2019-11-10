const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin, HashedModuleIdsPlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const STAGE = process.env.STAGE || 'troposphere';
const ACCEPTABLE_STAGES = ['troposphere', 'stratosphere', 'mesosphere'];

const babelLoaderOptions = {
  configFile: path.resolve(__dirname, '.babelrc')
};

function addhash(template, isProductionMode = false) {
  return isProductionMode
    ? template.replace('[name]', '[name].[hash]')
    : template;
}

if (!ACCEPTABLE_STAGES.includes(STAGE)) {
  throw new Error(
    `Invalid stage '${STAGE}' passed: should be ${ACCEPTABLE_STAGES.join(
      ' or '
    )}`
  );
}

console.log(`Using '${STAGE}' stage to start webpack`);
const config = isProduction => ({
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js')
  },

  target: 'web',

  resolve: {
    // we have to specify absolute path to node modules
    // because we want to be able to take index entry from non-project directory
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    extensions: ['.mjs', '.js', '.svelte', '.json'],
    alias: {
      // do not touch this line, bro... okay????
      svelte: path.resolve(__dirname, 'node_modules', 'svelte')
    }
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: addhash('[name].js', isProduction),
    chunkFilename: addhash('[name].chunk.js', isProduction),
    sourceMapFilename: addhash('[name].map', isProduction)
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: 'babel-loader',
        options: babelLoaderOptions,
        include: [
          // support app babel
          path.resolve(__dirname, 'src'),
          // support svelte node modules babel
          path.resolve(__dirname, 'node_modules', 'svelte'),
        ]
      },
      {
        test: /\.svelte$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelLoaderOptions
          },
          {
            loader: 'svelte-loader',
            options: {
              preprocess: require('svelte-preprocess')({ postcss: true }),
              emitCss: true,
              hotReload: true,
              dev: true
            }
          }
        ]
      },
      {
        test: [/\.css$/, /\.pcss$/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !isProduction }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: [
          /\.svg$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.woff2$/,
          /\.woff$/,
          /\.ttf$/,
          /\.eot$/
        ],
        loader: 'file-loader',
        options: {
          name: addhash('[name].[ext]', isProduction)
        }
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify({ STAGE })
    }),
    new HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: addhash('[name].css', isProduction)
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],

  devServer: {
    publicPath: '/',
    overlay: true,
    compress: true,
    historyApiFallback: {
      disableDotRule: true
    }
  }
});

module.exports = (_, { mode }) => {
  const prod = mode === 'production';
  return config(prod);
};
