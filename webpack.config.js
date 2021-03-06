/* eslint-disable no-undef */
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const net = require('net');

module.exports = new Promise(function (resolve) {
    var portInUse = function (port, callback) {
        var server = net.createServer(function (socket) {
            socket.write('Echo server\r\n');
            socket.pipe(socket);
        });

        server.listen(port, '127.0.0.1');
        server.on('error', function () {
            callback(true);
        });
        server.on('listening', function () {
            server.close();
            callback(false);
        });
    };

    let PortManager = (function () {
        let _gerarPorta = numero => {

            return new Promise(function (internalResolve) {

                portInUse(numero, function (emUso) {

                    if (!emUso) {
                        internalResolve(numero);
                        return;
                    }

                    internalResolve(

                        _gerarPorta(numero + 1)
                            .then(n => n)

                    )
                })
            });
        }
        
        return {
            gerarPorta: function () {
                const portaPadrao = 3000;
                _gerarPorta(portaPadrao).then(function (numeroFinal) {
                    resolve(numeroFinal);
                })
            }
        }
    })();

    PortManager.gerarPorta();
}).then(function (porta) {
    console.log("Rodando na porta " +porta);
    return {
        entry: "./src/index.tsx",
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
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader'
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
        output: {
            path: __dirname + '/dist',
            filename: '[name].[chunkhash].js',
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "./index.html"
            }),
            new ErrorOverlayPlugin()
        ],
        devServer: {
            port: porta
        },
        devtool: 'cheap-module-source-map'
    }
})