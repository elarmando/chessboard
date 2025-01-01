const path = require('path');

module.exports = {
  entry: {
    "app": './src/app.js',
    "mate/mate": "./src/mate/mate.js"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.'),
  },
  mode:"development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
};