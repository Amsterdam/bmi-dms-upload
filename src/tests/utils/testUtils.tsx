import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory, History } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';

import theme from '../../theme';
import { CustomFileLight, MetadataGenericType } from '../../types';

import { CurrentStep as CurrentStepSingle } from '../../features/single/single/model';
import { reducer as singleReducer } from '../../features/single/single/slice';
import { singleSaga } from '../../features/single/single/sagas';

import { CurrentStep as CurrentStepBulk, IBulkField, IBulkFile } from '../../features/bulk/bulk/model';
import { reducer as bulkReducer } from '../../features/bulk/bulk/slice';
import { bulkSaga } from '../../features/bulk/bulk/sagas';

type TRenderOptions = {
	store: any;
	reduxHistory: History
};

interface StoreOverrides {
	single?: {
		currentStep?: CurrentStepSingle;
		file?: CustomFileLight;
		metadata?: MetadataGenericType;
	};
	bulk?: {
		currentStep?: CurrentStepBulk;
		files?: IBulkFile[];
		fields?: IBulkField[];
		selectedFileId?: IBulkField;
	};
}

function render(ui: React.ReactElement, {store, reduxHistory }: TRenderOptions) {
	function Wrapper({ children }: { children?: React.ReactNode }) {
		return (
			<Provider store={store}>
				<Router history={reduxHistory}>
					<MUIThemeProvider theme={muiTheme}>
						<ThemeProvider overrides={theme}>
							<GlobalStyle />
							{children}
						</ThemeProvider>
					</MUIThemeProvider>
				</Router>
			</Provider>
		);
	}

	return rtlRender(ui, { wrapper: Wrapper });
}

const createTestEnv = (storeOverrides?: StoreOverrides) => {
	const originalHistory = createBrowserHistory();

	// ( https://github.com/salvoravida/redux-first-history/blob/master/__tests__/store.ts )
	const history = {
		...originalHistory,
		go: jest.fn(originalHistory.go),
		back: jest.fn(originalHistory.back),
		forward: jest.fn(originalHistory.forward),
		push: jest.fn(originalHistory.push),
		replace: jest.fn(originalHistory.replace),
	};

	const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
		history,
	});

	const sagaMiddleware = createSagaMiddleware();

	const store = configureStore({
		reducer: combineReducers({
			router: routerReducer,
			single: singleReducer,
			bulk: bulkReducer,
		}),
		middleware: (getDefaultMiddleware) => [
			sagaMiddleware,
			routerMiddleware,
		],
		preloadedState: {
			...storeOverrides
		},
	});

	const reduxHistory = createReduxHistory(store);

	sagaMiddleware.run(bulkSaga);
	sagaMiddleware.run(singleSaga);

	return {
		store,
		history,
		reduxHistory
	}
}

export * from '@testing-library/react';
export { render, createTestEnv };
