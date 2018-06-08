const path=require("path")
module.exports = {
  entry: __dirname + '/Fermi-Client/render.js',
  output: {
    path: __dirname + '/Fermi-Client',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname,'Fermi-Client/assets'),
      components: path.resolve(__dirname,'Fermi-Client/components'),
      pages: path.resolve(__dirname,'Fermi-Client/pages'),
      routes: path.resolve(__dirname,'Fermi-Client/routes'),
    },
  },
    // bundle.js에서 최종적으로 실행된다.
  devServer: {
    inline: true,
    port: 4000,
    contentBase: __dirname + '/Fermi-Client',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['env', 'react'],
          plugins: ["transform-object-rest-spread","transform-es2015-arrow-functions"]
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['env', 'react'],
          plugins: ["transform-object-rest-spread","transform-es2015-arrow-functions"]
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  externals: [
    {
     './cptable': 'var cptable'
    }
  ],
  watch:true
};
