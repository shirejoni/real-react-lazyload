const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js",
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },
    externals: {
        react: "commonjs react",
        "react-dom": "commonjs react-dom",
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }

}

