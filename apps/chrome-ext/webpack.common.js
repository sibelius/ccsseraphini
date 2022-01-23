const path = require('path');

module.exports = {
  entry: {
    backgroundPage: path.join(__dirname, 'src/backgroundPage.ts'),
    popup: path.join(__dirname, 'src/popup/index.tsx'),
    content: path.join(__dirname, 'src/content/index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx|ts|tsx)?$/,
      //   exclude: [/node_modules/],
      //   use: [
      //     {
      //       loader: 'babel-loader?cacheDirectory',
      //     },
      //   ],
      // },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
