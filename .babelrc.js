module.exports = (api) => {
	api.cache(true);

	return {
		plugins: [
			[
				'babel-plugin-styled-components',
				{
					pure: true,
					namespace: 'sc-',
				},
			],
			'@babel/plugin-transform-runtime',
		],
		presets: [
			[
				'@babel/preset-env',
				{
					debug: false,
					modules: true,
					useBuiltIns: 'entry',
					corejs: 3,
				},
			],
			'@babel/preset-react',
			'@babel/preset-typescript',
		],
		env: {
			test: {
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								node: 'current',
							},
						},
					],
					'@babel/preset-react',
					'@babel/preset-typescript',
				],
				plugins: ['@babel/plugin-transform-typescript'],
			},
			production: {
				plugins: [['react-remove-properties', { properties: ['data-testid'] }]],
			},
		},
	};
};
