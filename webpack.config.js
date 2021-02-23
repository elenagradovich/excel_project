const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production'
    const isDev = argv.mode === 'development'
    const filename = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`
    const plugins = () => {
        base = [
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
        ]

        if (isDev) {
            base.push(new ESLintPlugin())
        }

        return base
    }

    return {
        context: path.resolve(__dirname, 'src'), //исходники в src
        target: 'web',
        //mode: 'development',
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
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            //compress: true,
            hot : true,
            //watchContentBase: true, //for HTML updates
            port: 3333
        },
        plugins: plugins(),
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

