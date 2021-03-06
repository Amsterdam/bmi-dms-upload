const path = require('path');

module.exports = {
	entry: './src/entry.tsx',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
		alias: {
			'~': path.resolve(__dirname, 'src/'),
		},
	},
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
				enforce: 'pre',
				test: /(\.js|\.jsx)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										debug: false,
										modules: false,
										useBuiltIns: 'entry',
										corejs: 3,
									},
								],
								'@babel/preset-react',
								'@babel/preset-typescript',
							],
							plugins: [
								[
									'babel-plugin-styled-components',
									{
										pure: true,
									},
								],
							],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
};
