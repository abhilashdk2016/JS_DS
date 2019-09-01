const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
// const env = require('yargs').argv.env;

const libraryName = 'DataStructureAlgorithms';

let plugins = [], outputFile;

/* if(env === 'build') {
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}*/

var PATHS = {
    entryPoint: path.resolve(__dirname, 'src/index.ts'),
    bundles: path.resolve(__dirname, '_bundles'),
}

const config = {
    entry: {
        'DataStructureAndAlgorthm': [PATHS.entryPoint],
        'DataStructureAndAlgorthm.min': [PATHS.entryPoint]
    },
    devtool: 'source-map',
    output: {
        path: PATHS.bundles,
        filename: '[name].js',
        library: 'DataStructureAndAlgorthm',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.json', '.js', '.ts', '.tsx']
    },
    module: {
        rules: [{
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/,
          query: {
            declaration: false,
          }
        }]
    },
    optimization: {
        minimizer: [
          // we specify a custom UglifyJsPlugin here to get source maps in production
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
          })
        ]
    }
};

module.exports = config;