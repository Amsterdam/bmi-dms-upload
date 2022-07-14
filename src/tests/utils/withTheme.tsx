import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import theme from '../../theme';

function renderWithTheme(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) {
	const ThemeProviders: React.FC = ({ children }) => (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</MUIThemeProvider>
	);

	return { ...render(ui, { wrapper: ThemeProviders, ...options }) };
}

export default renderWithTheme;
