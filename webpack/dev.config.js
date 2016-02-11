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
            loaders: [
                {
                    test: /\.scss$|\.css/,
                    loaders: [
                        'style',
                        'css?sourceMap',
                        'autoprefixer?browsers=last 2 version',
                        'sass?outputStyle=expanded&sourceMap'
                    ]
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
                        'react-hot',
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
            new webpack.PrefetchPlugin('react'),
            new webpack.PrefetchPlugin('react-router'),

            new webpack.NoErrorsPlugin(),
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