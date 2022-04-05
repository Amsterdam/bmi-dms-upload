import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import { IBulkState } from './bulk/bulk/model'
import { bulkSaga } from './bulk/bulk/sagas';
import { reducer as bulkReducer } from './bulk/bulk/slice';
import { ISingleState } from './single/single/model';
import { singleSaga } from './single/single/sagas';
import { reducer as singleReducer } from './single/single/slice';

export interface Store {
	single: ISingleState;
	bulk: IBulkState;
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
	history: createBrowserHistory(),
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: combineReducers({
		router: routerReducer,
		single: singleReducer,
		bulk: bulkReducer,
	}),
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				// https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
				// Ignore these action types
				ignoredActions: [
					'dms_single/setFile',
					'dms_single/removeFile',
					'dms_bulk/setFile',
					'dms_bulk/setFields',
					'dms_bulk/setFieldData',
					'dms_bulk/removeFile',
				],
				ignoredPaths: ['single.file', 'bulk.files'],
			},
		}),
		sagaMiddleware,
		routerMiddleware,
	],
});

export const history = createReduxHistory(store);

sagaMiddleware.run(bulkSaga);
sagaMiddleware.run(singleSaga);
