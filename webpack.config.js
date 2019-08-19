const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    //开发模式
    mode: 'development',
    //配置入口
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),  
        compress: true,     //自动压缩代码
        open: true,   //打开浏览器
        hot: true   //HMR
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    // 配置引用css
                    {
                        loader: 'style-loader'  // 可以把css放在页面上
                    },
                    {
                        loader: 'css-loader'    // 放在后面的先被解析
                    }
                ]
            }
        ]
    }
}