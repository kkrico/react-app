/* eslint-disable no-undef */
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const net = require('net');
const path = require("path");

module.exports = function (env) {
    return new Promise(function (resolve) {

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
        const modo = env.MODO;
        console.log("Rodando em modo " + modo);
        const lookup = {
            entry: {
                STANDALONE: {
                    main: "./src/index.js"
                },
                PORTAL: {
                    singleSpaEntry: './src/singleSpaEntry.js',
                    store: './src/store.js'
                }
            },
            output: {
                STANDALONE: {
                    path: path.resolve(__dirname, "dist"),
                    filename: '[name].[chunkhash].js',
                },
                PORTAL: {
                    filename: '[name].js',
                    path: path.resolve(__dirname, 'release'),
                    libraryTarget: 'amd',
                    library: 'reactApp'
                },
            }
        }
        console.log("Rodando na porta " + porta);
        return {
            entry: lookup.entry[modo],
            output: lookup.output[modo],
            module: {
                rules: [
                    {
                        enforce: "pre",
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "eslint-loader",
                        options: {
                            emitWarning: true,
                            configFile: "./.eslintrc.js"
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
                    template: "./public/index.html",
                    filename: "./index.html"
                }),
                new ErrorOverlayPlugin()
            ],
            mode: 'development',
            devtool: 'eval-source-map',
            devServer: {
                port: porta,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                }
            }
        }
    })
}