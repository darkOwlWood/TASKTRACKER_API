const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((accumulator, key) => {
    accumulator[`process.env.${key}`] = JSON.stringify(env[key]);
    return accumulator;
}, {});

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle-[fullhash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(s?css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gift)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            fallback: 'file-loader',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, 'modules-manifest.json'),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
        new AddAssetHtmlWebpackPlugin({
            publicPath: '/',
            filepath: path.join(__dirname, 'dist', 'modules.js'),
        })
    ],
    devServer: {
        historyApiFallback: true,
    }
}