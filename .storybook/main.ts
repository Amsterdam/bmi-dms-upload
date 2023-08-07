import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
	staticDirs: [{ from: '../src/assets', to: '/assets' }],
	addons: ['storybook-addon-swc', '@storybook/addon-essentials'],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	features: {
		storyStoreV7: false,
	},
	docs: {
		autodocs: true,
	},
	refs: {
		'amsterdam-styled-components': {
			title: 'Amsterdam Styled Components',
			// url: "https://alimpens.github.io/asc-beta/",
			url: 'https://amsterdam.github.io/amsterdam-styled-components',
			expanded: false,
		},
		'bmi-component-library': {
			title: 'BMI Components',
			url: 'https://amsterdam.github.io/bmi-component-library/',
			expanded: false,
		},
	},
};
export default config;
