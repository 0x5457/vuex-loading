const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'vuex-loading.js',
    path: path.join(__dirname, 'dist'),
    library: 'vuexLoading',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
