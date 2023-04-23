const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const infernoTsPlugin = require('ts-plugin-inferno').default

module.exports = {
    mode: "none",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [infernoTsPlugin()],
                    }),
                },
            },
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
    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        })
    ]
};