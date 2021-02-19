const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {

    const isProd = argv.mode === 'development'
    const isDev = argv.mode === 'production'

    console.log('isProd: ', isProd)
    console.log('isDev: ', isDev)
    const filename = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

    return {
        context: path.resolve(__dirname, 'src'), //исходники в src
        mode: 'development',
        entry: ["@babel/polyfill", './index.js'],
        output: {
            filename: filename('js'),
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.js', '.scss', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core'),
            }
        },
        plugins: [
            new CleanWebpackPlugin(), //clean dist
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve((__dirname, 'src/favicon.ico')),
                        to: path.resolve((__dirname, 'dist'))
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: filename('css')
            }),
        ],
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        }
    }
}

