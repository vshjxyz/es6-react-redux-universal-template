import path from 'path';
import webpack from 'webpack';
import startServer from '../server/server';

const WEBPACK_PORT = 3001;

export default {
    server: {
        port: WEBPACK_PORT,
        options: {
            publicPath: '/assets/',
            contentBase: '../dist',
            hot: true,
            quiet: false,
            noInfo: false,
            stats: {
                assets: true,
                colors: true,
                version: false,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false
            }
        }
    },
    webpack: {
        devtool: 'source-map',
        entry: {
            app: [
                './app/index.js',
                'webpack/hot/only-dev-server',
                `webpack-dev-server/client?http://localhost:${WEBPACK_PORT}`
            ]
        },
        output: {
            path: path.join(__dirname, '../dist'),
            filename: 'bundle.js',
            publicPath: 'http://localhost:3001/assets/',
            devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
        },
        module: {
            rules: [
                {
                    test: /\.scss$|\.css/,

                    loaders: [
                        'style-loader',
                        'css-loader?sourceMap',
                        'sass-loader?outputStyle=expanded&sourceMap'
                    ]
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
                        'react-hot-loader',
                        'babel-loader?retainLines=true'
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
            new webpack.PrefetchPlugin('react'),
            new webpack.PrefetchPlugin('react-router'),

            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.HotModuleReplacementPlugin(),

            // These variables are visible only through the chain of files defined on the entrypoint
            new webpack.DefinePlugin({
                'process.env': {
                    BROWSER: JSON.stringify(true),
                    NODE_ENV: JSON.stringify('development')
                }
            }),

            startServer
        ]
    }
};
