import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { DMSUpload } from '../../src/store/store';
import theme from '../../src/theme';
import { CustomContext } from '../../src/store/CustomProvider';

type ProviderOptions = {
	initialState?: DMSUpload;
	initialRoute?: string;
};

function renderWithProviders(
	ui: React.ReactElement,
	{ initialState, initialRoute }: ProviderOptions = {},
	options?: Omit<RenderOptions, 'queries'>,
) {
	const mockStore = configureStore([]);
	const store = mockStore({ ...initialState });
	const history = createMemoryHistory();
	initialRoute && history.push(initialRoute);

	const AllTheProviders: React.FC = ({ children }) => (
		<Router history={history}>
			<Provider context={CustomContext} store={store}>
				<MUIThemeProvider theme={muiTheme}>
					<ThemeProvider overrides={theme}>
						<GlobalStyle />
						{children}
					</ThemeProvider>
				</MUIThemeProvider>
			</Provider>
		</Router>
	);

	return { ...render(ui, { wrapper: AllTheProviders, ...options }) };
}

export default renderWithProviders;
