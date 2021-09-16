import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import theme from '~/theme';

function renderWithProviders(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) {
	const AllTheProviders: React.FC = ({ children }) => (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</MUIThemeProvider>
	);

	return render(ui, { wrapper: AllTheProviders, ...options });
}

export default renderWithProviders;
