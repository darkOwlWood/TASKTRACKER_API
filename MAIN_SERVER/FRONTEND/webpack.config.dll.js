const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        modules: ['react', 'react-dom', 'react-router-dom'],
    },
    output: {
        publicPath: '/',
        library: '[name]',
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname,'[name]-manifest.json'),
        })
    ]
}