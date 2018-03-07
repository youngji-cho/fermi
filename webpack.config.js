module.exports = {
    entry: './client/render.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    // bundle.js에서 최종적으로 실행된다.

    devServer: {
        inline: true,
        port: 8081,
        contentBase: __dirname + '/public/',
        historyApiFallback: true
    },

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
};
