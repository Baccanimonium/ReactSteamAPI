const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require("babel-polyfill")

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    devServer: {
         contentBase: './dist',
         historyApiFallback: true,
         proxy: {
            '/api': 'http://localhost:3001'
         }
   },
    output: {
        path: path.resolve(__dirname, 'server/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader?minimize', 'sass-loader','resolve-url-loader']
                    })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(
            {filename: 'style.css'}
        ),

        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        })
    ]
}