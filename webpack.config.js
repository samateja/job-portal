module.exports = {
  entry : './src/index.js',
  output: {
    path : __dirname + '/public',
    filename : 'bundle.js'
  },
  module: {
    rules:  [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ['sass-loader']
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         exclude: [/\.js$/, /\.html$/, /\.json$/, /\.ejs$/],
         loader:'file-loader'
      }
    ]
  }
};