var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'script.js'),

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  devtool: 'source-map'
};