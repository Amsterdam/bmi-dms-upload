import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
const config: StorybookConfig = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
	staticDirs: [{ from: '../src/assets', to: '/assets' }],
	addons: ['storybook-addon-swc', '@storybook/addon-essentials'],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
	refs: {
		'amsterdam-styled-components': {
			title: 'Amsterdam Styled Components',
			url: 'https://amsterdam.github.io/amsterdam-styled-components',
			expanded: false,
		},
		'bmi-component-library': {
			title: 'BMI Components',
			url: 'https://amsterdam.github.io/bmi-component-library/',
			expanded: false,
		},
	},
	webpackFinal: async (baseConfig) => {
		baseConfig.resolve = baseConfig.resolve || {};
		baseConfig.resolve.alias = {
			...(baseConfig.resolve.alias || {}),
			'@amsterdam/bmi-component-library': path.resolve(
				__dirname,
				'../node_modules/@amsterdam/bmi-component-library/lib/src/index.js',
			),
			'@common': path.resolve(__dirname, '../node_modules/@amsterdam/bmi-component-library/lib/src/common/src'),
			'@form': path.resolve(__dirname, '../node_modules/@amsterdam/bmi-component-library/lib/src/form'),
			'@utils': path.resolve(__dirname, '../node_modules/@amsterdam/bmi-component-library/lib/src/utils'),
		};
		return baseConfig;
	},
};
export default config;
