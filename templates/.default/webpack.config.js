const path = require('path');
const webpack = require('webpack');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: ['./src/main.js', './src/style.scss'],
    output: {
        path: path.resolve(__dirname, './'),
        publicPath: '/',
        filename: 'script.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                        },
                    },
                    {
                        loader: 'extract-loader',
                    },
                    {
                        loader: 'css-loader?-url',
                        options: {
                            minimize: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({}),
                            ],

                        },
                    },
                    {
                        loader: "group-css-media-queries-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    "group-css-media-queries-loader",
                    'sass-loader?indentedSyntax',
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader',
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax',
                        ],
                    },
                    // other vue-loader options go here
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|jpe?g)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
            {
                test: /\.(png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]',
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: 'file?name=fonts/[name].[ext]!static'
            }
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.js', '.vue', '.json', '.css',],
        modules: ['node_modules', './']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    },
    performance: {
        hints: false,
    },
    devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ]);
}
