const path = require('path');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	...common,
	mode: 'production',
	output: {
		filename: 'main.[contentHash].bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: 'src/index.hbs',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.[contentHash].css',
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			...common.module.rules,
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // 3. Extract css into files
					'css-loader', // 2. Turns css into commonjs
					'postcss-loader', // 3. Process CSS with postcss
				],
			},
		],
	},
};
