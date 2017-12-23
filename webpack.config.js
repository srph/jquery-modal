var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'lib/index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production'
      ? 'jquery.modal.min.js'
      : 'jquery.modal.js'
  },

  externals: [{
    jquery: 'jQuery',
    '@srph/jqt': 'jQuery'
  }]
};