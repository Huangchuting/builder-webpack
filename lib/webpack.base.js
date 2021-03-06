
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')
const autoprefixer = require('autoprefixer')

const projectRoot = process.cwd()

const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(projectRoot, './src/entry/*/index.js'))

    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]

        const match = entryFile.match(/src\/entry\/(.*)\/index.js/)
        const pageName = match && match[1]
        entry[pageName] = entryFile
        return htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(projectRoot, `src/entry/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName, 'commons'],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /.css$/,
                use: [
                    //    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    //    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer()
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        function ErrorPlugin() {
            // 这个webpack4的写法， webpack3 只要将 this.hooks.done.tap 改为 this.plugin 即可
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    console.log('build error')/* eslint-disable-line */
                    process.exit(1)
                }
            })
        }
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only'
}
