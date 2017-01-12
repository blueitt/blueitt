const path = require('path');
const webpack = require('webpack');

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'src');
const nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        path: distPath,
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: [srcPath],
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass'],
                include: [srcPath, nodeModulesPath],
            },
            {
                // This regex is intentionally strict. Currently, it is only
                // expected it to match font-awesome.
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=4\.7\.0)?$/,
                loaders: ['file'],
                include: [nodeModulesPath],
            },
        ],
    },
    resolve: {
        root: [path.join(__dirname, 'src')],
    },
};
