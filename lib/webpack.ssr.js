const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const cssnano = require('cssnano')
const baseConfig = require('./webpack.base')

const ssrConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader'
            },
            {
                test: /\.less$/,
                use: 'ignore-loader'
            }
        ]
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@16/umd/react.development.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
                    global: 'ReactDOM'
                }
            ]
        })
    ],
    optimization: {
        splitChunks: {
            inSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
}
module.exports = merge(baseConfig, ssrConfig)
