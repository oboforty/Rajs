var path = require('path');


module.exports = {
  mode: 'production',
  entry: {
    ra: __dirname + "/src/ra.js",
    './examples/ra': __dirname + "/src/ra.js"
  },
  resolve: {
    // alias: {
    //   //'/client': path.resolve(__dirname, 'client/'),
    //   //'/engine': path.resolve(__dirname, 'engine/'),
    // }
  },
  output: {
    path: __dirname,
    filename: '[name].min.js',

    // libraryExport: 'default',
    // libraryTarget: 'umd',
    // library: '[name]',
    // globalObject: 'this',
  }
};
