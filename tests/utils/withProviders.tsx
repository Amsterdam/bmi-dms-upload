import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import theme from '~/theme';
import CustomProvider from '~/store/CustomProvider';
import { createMemoryHistory } from 'history';

function renderWithProviders(ui: React.ReactElement, initialRoute?: string, options?: Omit<RenderOptions, 'queries'>) {
	const history = createMemoryHistory();
	initialRoute && history.push(initialRoute);

	const AllTheProviders: React.FC = ({ children }) => (
		<Router history={history}>
			<CustomProvider>
				<MUIThemeProvider theme={muiTheme}>
					<ThemeProvider overrides={theme}>
						<GlobalStyle />
						{children}
					</ThemeProvider>
				</MUIThemeProvider>
			</CustomProvider>
		</Router>
	);

	return { ...render(ui, { wrapper: AllTheProviders, ...options }) };
}

export default renderWithProviders;
