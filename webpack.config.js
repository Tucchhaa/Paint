const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const infernoTsPlugin = require('ts-plugin-inferno').default

module.exports = {
    mode: "none",
    entry: "./src/index.ts", // Point to main file
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // performance: {
    //     hints: false
    // },
    module: {
        rules: [
            // {
            //     test: /\.tsx$/,
            //     loader: 'ts-loader',
            //     options: {
            //         getCustomTransformers: () => ({
            //             before: [infernoTsPlugin()],
            //         }),
            //     },
            // },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        static: [
            {
                directory: path.resolve(__dirname, 'playground'),
                watch: true
            },
        ]
    },
    // plugins: [
    //     // new HtmlWebpackPlugin(
    //     //     {
    //     //         template: "./src/index.html",
    //     //         inject: "body"
    //     //     }
    //     // ),
    //     new CleanWebpackPlugin({
    //         verbose: true
    //     })
    // ]
};