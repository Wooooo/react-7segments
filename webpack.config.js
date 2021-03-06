/* jshint node: true */
var path = require('path');


module.exports = {
    context: path.join(__dirname),
    entry: './src/index.js',

    output: {
        path: path.join(__dirname),
        filename: 'react-7segments.js',
        libraryTarget: 'umd',
        library: 'React7Seg'
    },

    externals: {
        'react': 'var React',
        'react/addons': 'var React'
    },
    
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.jsx']
    },
    
    module: {
        loaders: [
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'style!css!sass?outputStyle=expanded&'
            },
            {
                test: /(\.js)|(\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './src/styles')
        ]
    }
};
