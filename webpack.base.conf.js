const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	entry: './src/entry.tsx',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
		alias: {
			'~': path.resolve(__dirname, 'src/'),
			'@mui/material': path.resolve(__dirname, 'node_modules/@mui/material/'),
			'@mui/system': path.resolve(__dirname, 'node_modules/@mui/system/'),
		},
	},
	plugins: [new ESLintPlugin()],
	module: {
		rules: [
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// Fall backs to file-loader when exceeding this limit
							limit: 8192000, // Bytes
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'swc-loader',
					},
				],
			},
		],
	},
};
