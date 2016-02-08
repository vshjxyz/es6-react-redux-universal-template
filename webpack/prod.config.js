require('babel-register');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './app/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!autoprefixer?browsers=last 2 version!sass')
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.js$|.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'babel'
                ]
            }
        ]
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'app']
    },
    plugins: [
        // extract css
        new ExtractTextPlugin("[name].css", {
            allChunks: true
        })
    ]
};