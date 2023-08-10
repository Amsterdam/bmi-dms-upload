import React from 'react';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { MemoryRouter } from 'react-router-dom-v5-compat';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';

import theme from '../../src/theme';
import { CustomFileLight, MetadataGenericType } from '../../src/types';
import { CurrentStep as CurrentStepSingle } from '../../src/features/single/single/store/model';
import { reducer as singleReducer } from '../../src/features/single/single/store/slice';
import { singleSaga } from '../../src/features/single/single/store/sagas';
import { CurrentStep as CurrentStepBulk, IBulkField, IBulkFile } from '../../src/features/bulk/bulk/store/model';
import { reducer as bulkReducer } from '../../src/features/bulk/bulk/store/slice';
import { bulkSaga } from '../../src/features/bulk/bulk/store/sagas';

type TRenderOptions = {
	store?: any;
	[key: string]: any;
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
		isBulkMode?: boolean;
	};
}

function render(
	ui: React.ReactElement,
	{ store, ...rest }: TRenderOptions,
	initialEntries: string[] = ['/'],
): RenderResult {
	const testStore = createTestStore(store);

	function Wrapper({ children }: { children?: React.ReactNode }) {
		return (
			<Provider store={testStore}>
				<MemoryRouter initialEntries={initialEntries}>
					<MUIThemeProvider theme={muiTheme}>
						<ThemeProvider overrides={theme}>
							<GlobalStyle />
							{children}
						</ThemeProvider>
					</MUIThemeProvider>
				</MemoryRouter>
			</Provider>
		);
	}

	return rtlRender(ui, { wrapper: Wrapper, ...rest });
}

const createTestStore = (storeOverrides?: StoreOverrides) => {
	const sagaMiddleware = createSagaMiddleware();

	const store = configureStore({
		reducer: combineReducers({
			single: singleReducer,
			bulk: bulkReducer,
		}),
		middleware: (getDefaultMiddleware) => [sagaMiddleware],
		preloadedState: {
			...storeOverrides,
		},
	});

	sagaMiddleware.run(bulkSaga);
	sagaMiddleware.run(singleSaga);

	return store;
};

export function matchMediaMock(overrides = {}) {
	const defaultDescriptor = {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // Deprecated
			removeListener: jest.fn(), // Deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	};

	Object.defineProperty(window, 'matchMedia', { ...defaultDescriptor, ...overrides });
}

export * from '@testing-library/react';
export { render };
