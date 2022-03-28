import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from 'src/features/store';
import theme from '../../theme';

import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

type ProviderOptions = {
	initialState?: Partial<Store>;
	initialRoute?: string;
};

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
	history: createBrowserHistory(),
});

function renderWithProviders(
	ui: React.ReactElement,
	{ initialState, initialRoute }: ProviderOptions = {},
	options?: Omit<RenderOptions, 'queries'>,
) {
	const mockStore = configureStore([]);
	const store = mockStore({ ...initialState });
	const history = createReduxHistory(store);
	initialRoute && history.push(initialRoute);

	const AllTheProviders: React.FC = ({ children }) => (
		<Provider store={store}>
			<Router history={history}>
				<MUIThemeProvider theme={muiTheme}>
					<ThemeProvider overrides={theme}>
						<GlobalStyle />
						{children}
					</ThemeProvider>
				</MUIThemeProvider>
			</Router>
		</Provider>
	);

	return { ...render(ui, { wrapper: AllTheProviders, ...options }) };
}

export default renderWithProviders;
