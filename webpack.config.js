var path=require('path');
var HtmlWebPackPlugin= require('html-webpack-plugin')
let webpack=require('webpack')

//sets t=node environment to prod
//minify

module.exports ={
    entry: './app/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module:{
        rules: [
            {test: /(\.js)$/, use: 'babel-loader'},
            { test: /(\.css)$/, use: [ 'style-loader', 'css-loader' ]}
        ]
    },
    devServer:{
        historyApiFallback: true,
    },
    plugins: [new HtmlWebPackPlugin(
        {
            template: 'app/index.html',
        }
    )], 
    mode: "development"
};

