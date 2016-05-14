var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


var ENV = process.env;
var PRODUCTION = ENV.NODE_ENV == 'production';
var devtool = PRODUCTION ? false : 'eval';
var entry, plugins;

if (PRODUCTION){
    entry = ['./src/index'];
    plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV.NODE_ENV)
            }}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compressor: {
                warnings: false,
                drop_console: true,
                screw_ie8: true
            }
        })
    ];
} else {
    entry = [
        'webpack-hot-middleware/client',
        './src/index'
    ];
    plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV.NODE_ENV) || 'development',
            },
            ENVIRONMENT: JSON.stringify(ENV.NODE_ENV) || 'development',
        })
    ];
}

module.exports = {
    devtool: devtool,
    entry: entry,
    plugins: plugins,
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, 'src')},
            {test: /\.less$/, loaders: ['style', 'css', 'postcss', 'less']},
            {test: /\.css$/, loaders: ['style', 'css']},
            {test: /\.html$/, loader: 'raw?minimize=false'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file'},
        ]
    },
    resolve: ['', 'js', 'jsx', 'less'],
    postcss: function() {
        return [autoprefixer({browsers: ['last 2 versions']})];
    },
};
