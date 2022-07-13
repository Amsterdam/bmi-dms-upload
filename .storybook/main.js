module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	framework: '@storybook/react',
	core: {
		builder: 'webpack5',
	},
	features: {
		interactionsDebugger: true,
	},
	refs: {
		'design-system': {
			title: 'Amsterdam Styled Components',
			// url: "https://alimpens.github.io/asc-beta/",
			url: 'https://amsterdam.github.io/amsterdam-styled-components',
		},
		'bmi-components': {
			title: 'BMI Components',
			url: 'https://amsterdam.github.io/bmi-component-library/',
		},
	},
	typescript: {
		reactDocgen: 'none',
	},
};
