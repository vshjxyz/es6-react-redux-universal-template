import path from 'path';
import webpack from 'webpack';
import startServer from '../server';

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
            publicPath: 'http://localhost:3001/assets/'
        },
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: [
                        'style',
                        'css?sourceMap',
                        'autoprefixer?browsers=last 2 version',
                        'sass?outputStyle=expanded&sourceMap'
                    ]
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
                    exclude: /node_modules/,
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
            new webpack.HotModuleReplacementPlugin(),
            function () { this.plugin('done', startServer); }
        ]
    }
};