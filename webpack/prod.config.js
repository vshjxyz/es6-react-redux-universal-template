require('babel-register');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

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
        rules: [
            {
                test: /\.scss|\.css$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
            {
                test: /\.(svg|woff|eot|ttf|woff2)/,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        },
                    }
                ]
            },
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'babel-loader'
                ]
            }
        ]
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            path.join(__dirname, 'app')
        ]
    },
    plugins: [
        new PrepackWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[id].[hash].vendor.bundle.js',
            minChunks: function(module){
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
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
        new ExtractTextPlugin({
            filename: '[id].[hash].[name].css',
            allChunks: true
        })
    ]
};
