const { defineConfig } = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
const storybookPlugin = require('eslint-plugin-storybook');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

module.exports = defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.node
			},

			ecmaVersion: 2018,
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},

			parser: tsParser,
		},

		extends: compat.extends(
			'eslint:recommended',
			'plugin:react/jsx-runtime',
			'plugin:@typescript-eslint/eslint-recommended',
			'plugin:storybook/recommended',
			'plugin:testing-library/react',
		),

		plugins: {
			react: reactPlugin,
			'@typescript-eslint': tsEslintPlugin,
			'testing-library': testingLibraryPlugin,
			storybook: storybookPlugin,
		},

		rules: {
			'@typescript-eslint/ban-ts-ignore': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'no-unused-vars': 'off',

			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'none',
					varsIgnorePattern: '^React$',
				},
			],

			'react/prop-types': 'off',
			'react/jsx-boolean-value': 2,
			'react/no-array-index-key': 2,
			'testing-library/no-render-in-lifecycle': 'off',
			'testing-library/prefer-screen-queries': 'off',
			'testing-library/no-node-access': 'off',
			'testing-library/no-unnecessary-act': 'off',
			'testing-library/render-result-naming-convention': 'off',
		},

		settings: {
			react: { version: 'detect' },
		},
	},
]);
