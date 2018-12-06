'use strict'

const path = require('path')
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")
const WriteFilePlugin = require('write-file-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const currentDir = path.resolve(__dirname)
const srcDir = currentDir + '/src'

const entryFile = srcDir + '/main.ts'
const outputDir = currentDir + '/../backend/public'
//const outputDir = currentDir + '/dist'


const jsDir = outputDir
const cssDir = outputDir

module.exports = {
    //mode: 'production',
    mode: 'development',
    entry: entryFile,
    cache: true,
    devtool: 'source-map',
    output: {
        path: jsDir,
        publicPath: '/',
        filename: 'app.js',
    },
    stats: {
        assets: true,
        builtAt: false,
        cached: false,
        cachedAssets: false,
        children: false,
        chunkGroups: false,
        chunkModules: false,
        chunkOrigins: false,
        chunks: false,
        colors: true,
        depth: false,
        entrypoints: false,
        env: false,
        errorDetails: false,
        errors: false,
        hash: false,
        modules: false,
        moduleTrace: true,
        performance: false,
        providedExports: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        usedExports: false,
        version: false,
        warnings: true,
    },
    resolve: {
        extensions: [ '.js', '.vue', '.ts' ],
        modules: [ srcDir, 'node_modules' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'jquery': 'jquery/dist/jquery.slim.js',
            '@': srcDir + '/'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [ 
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader'
                    }
                ],
                //loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?![foundation\-sites|vuex\-module\-decorators|lodash\-es])/,
                use: [ 
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            //transpileOnly: true,
                            appendTsSuffixTo: [
                                '\\.vue$'
                            ],
                            happyPackMode: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                        srcDir + '/scss/',
                                        currentDir + '/node_modules/foundation-sites/scss/',
                            ],
                            outputStyle: 'compressed',
                            //outputStyle: 'nested',
                        }
                    },
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: [ outputDir ],
        index: 'index.html',
        compress: true,
        port: 8100,
        open: true,
        //inline: true,
        //watch: true,
        watchOptions: {
            ignored: /node_modules/
        },
        stats: {
            assets: true,
            builtAt: false,
            cached: false,
            cachedAssets: false,
            children: false,
            chunkGroups: false,
            chunkModules: false,
            chunkOrigins: false,
            chunks: false,
            colors: true,
            depth: false,
            entrypoints: false,
            env: false,
            errorDetails: false,
            errors: false,
            hash: false,
            modules: false,
            moduleTrace: true,
            performance: false,
            providedExports: false,
            publicPath: false,
            reasons: false,
            source: false,
            timings: false,
            usedExports: false,
            version: false,
            warnings: true,
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{ 
            from: srcDir + '/assets', 
            to: outputDir 
        }]),
        new HtmlWebpackPlugin({
            hash: false,
            filename: outputDir + '/index.html',
            template: srcDir + '/index.html',
            alwaysWriteToDisk: true
        }),
        new MiniCssExtractPlugin({
            filename: "app.css",
        }),
        new ProgressBarPlugin({
            width: 60
        }),
        new FriendlyErrorsPlugin({
             clearConsole: false
        }),
        new DuplicatePackageCheckerPlugin(),
        new WriteFilePlugin(),
        new CleanWebpackPlugin(outputDir, {
            verbose:  false,
            allowExternal: true
        })
    ],
    performance: {
        maxAssetSize: 1 * 1024 * 1024,
        hints: false
    }
}
