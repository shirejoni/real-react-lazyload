const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
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

