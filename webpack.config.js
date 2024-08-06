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
  mode:"development"
};