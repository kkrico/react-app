const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    configFile: "./.eslintrc.json"
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};