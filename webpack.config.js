const path = require('path');
const webpack = require('webpack');
const bundleName = 'bundle';

const prodMode = (process.env.NODE_ENV === 'production');
const plugins = [];

if (prodMode) plugins.push(new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }));

module.exports = {
	entry: __dirname + '/index.jsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: `${bundleName}.js`,
		publicPath: '/dist/'
	},
	devServer: {
    port: 3030,
    historyApiFallback: {
      index: 'index.html'
    }
  },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader' }
				]
			},
			{
				test: /\.scss$/,
				exclude: /bower_components/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{ loader: 'file-loader' }
				]
			},
			{
			  test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{
			  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'file-loader'
			},
			{
			  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			}
		]
	},
	resolve: {
		alias: {
			fontawesome: 'font-awesome/css/font-awesome.css'
		},
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, 'src')
		],
		descriptionFiles: ['package.json'],
		extensions: ['.js', '.jsx', '.scss', '.css', '.json']
	},
	plugins
};
