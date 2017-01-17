module.exports = {
  entry: './lib/index.js',

  output: {
    path: './dist',
    filename: process.env.NODE_ENV === 'production'
      ? 'jquery.modal.min.js'
      : 'jquery.modal.js'
  },

  module: {
    loaders: [{
      test: /$\.js/,
      exclude: /node_modules/,
      loader: 'imports-loader?$=jquery,@srph/jqt=>null',
    }]
  },

  externals: [{
    jquery: 'jQuery',
    '@srph/jqt': 'jQuery'
  }]
};