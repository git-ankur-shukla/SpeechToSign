var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./index.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-1'],
          plugins: ['react-html-attrs', 'transform-react-jsx', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "./images/[hash].[ext]"
            }
          }
        ]
      },
    ]
  },
  output: {
    path: __dirname + "/dist/",
    filename: "index.min.js"
  },
  node: {
  fs: 'empty'
},
plugins: [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    MS_SpeechKey: JSON.stringify(process.env.MS_SpeechKey),
    BACKEND_API: JSON.stringify('https://stsbackend.herokuapp.com/')
}),
],
};
