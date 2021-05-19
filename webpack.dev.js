const path = require('path');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	...common,
	mode: 'development',
	devtool: 'none',
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.hbs',
		}),
	],
	module: {
		rules: [
			...common.module.rules,
			{
				test: /\.css$/,
				use: [
					'style-loader', // 2. Inject styles into DOM
					'css-loader', // 1. Turns css into commonjs
				],
			},
		],
	},
	devServer: {
		inline: true,
		contentBase: path.join(process.cwd(), '/src'),
		port: 8000,
		host: 'localhost',
		hot: true,
		hotOnly: true,
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		// Ensure all paths rewrite to the index
		historyApiFallback: true,
	},
};
