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
        filename: '[id].[hash].bundle.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.scss|\.css$/,
                loader: ExtractTextPlugin.extract('css!autoprefixer?browsers=last 2 version!sass')
            },
            {
                test: /\.(svg|woff|eot|ttf|woff2)/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.js$|\.jsx$/,
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
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', '[id].[hash].vendor.bundle.js'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: {
                warnings: false,
                screw_ie8: true,
                sequences: true,
                dead_code: true,
                drop_debugger: true,
                comparisons: true,
                conditionals: true,
                evaluate: true,
                booleans: true,
                loops: true,
                unused: true,
                hoist_funs: true,
                if_return: true,
                join_vars: true,
                cascade: true,
                drop_console: true
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin('[id].[hash].[name].css', {
            allChunks: true
        })
    ]
};