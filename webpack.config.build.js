/**
 * Created by Administrator on 2017/4/7.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//这个插件不支持热加载，所以开发环境不支持
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const isDev = ENV === 'devlopment';
console.log(isDev);
module.exports = {
    entry : {
        app: ['babel-polyfill', path.resolve(__dirname, 'src/main.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js',
        publicPath: ''
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src')
        },
        extensions: ['.web.js', '.js', '.vue', '.json']

    },
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader',
        },
    },
    module: {
        rules: [
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[hash:8].[name].[ext]',
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: [{
                            test: /\.scss/,
                            use: [
                                'style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 1,
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        sourceMap: 'inline',
                                    }
                                },
                                'sass-loader',
                            ],
                            exclude: /node_modules/
                        },
                        {
                            test: /\.less/,
                            use: [
                                'style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 1,
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        sourceMap: 'inline',
                                    }
                                },
                                'less-loader',
                            ],
                            exclude: /node_modules/
                        }
                    ]
                }
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: 'inline',
                            }
                        },
                        'sass-loader',
                    ]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract([
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline',
                        }
                    }
                ]),
            }
        ]
    },
    context: __dirname,
    plugins: [

        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
              // any required modules inside node_modules are extracted to vendor
              return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
                ) === 0
              )
            }
          }),
        new ExtractTextPlugin({
            filename: '[name].[hash:8].css',
            allChunks: true,
            disable: isDev,   // Disable css extracting on development
            ignoreOrder: true,
        }),

        new HtmlWebpackPlugin({
            title: '',
            hash: true,
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.DefinePlugin({
            __DEV__: isDev,
            'process.env': {
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(), //webpack3新增
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};
