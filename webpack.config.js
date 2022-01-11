const path = require('path');
const webpack = require('webpack');

var config = {
	mode: 'development',
	entry: './src/js/index.js',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
	],
};

let localConfig = Object.assign({}, config, {
	output: {
		path: path.resolve(__dirname, './build/dist/js/'),
		filename: 'custom.min.js',
	},
});
module.exports = [localConfig];
