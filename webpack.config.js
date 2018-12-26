var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' 
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src'),
            use: [ 'style-loader', 'css-loader' ]
        },
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react']
            }
          }
        ]
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};