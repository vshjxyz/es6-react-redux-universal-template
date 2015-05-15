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
                './app/app.js',
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
                    loader: "style-loader!raw-loader!sass-loader?" +
                        "includePaths[]=" + path.resolve(__dirname, "../../node_modules/compass-mixins/lib/compass")
                },
                {
                    test: /\.css$/,
                    loader: "style!css"
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
                    loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]'
                }
            ]
        },
        resolve: {
            // Allow to omit extensions when requiring these files
            extensions: ['', '.js', '.jsx']
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            function () { this.plugin('done', startServer); }
        ]
    }
};