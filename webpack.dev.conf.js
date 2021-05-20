const path = require('path');
const common = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	...common,
	mode: 'development',
	devtool: 'inline-source-map',
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
				loader: [
					'style-loader', // 3. Inject styles into DOM
					{
						loader: 'css-loader', // 2. Turns css into commonjs
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader', // 1. Process CSS with postcss
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	devServer: {
		inline: true,
		contentBase: path.join(process.cwd(), '/src'),
		port: 9999,
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
