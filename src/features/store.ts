import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import { IBulkState } from 'src/features/bulkNew/bulk/model';
import { bulkSaga } from './bulkNew/bulk/sagas';
import { singleSaga } from './singleNew/single/sagas';
import { reducer as uploadReducer } from './singleNew/single/slice';
import { reducer as bulkReducer } from './bulkNew/bulk/slice';
import { ISingleState } from './singleNew/single/model';

export interface Store {
	single: ISingleState;
	bulk: IBulkState;
}

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
	history: createBrowserHistory(),
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: combineReducers({
		router: routerReducer,
		single: uploadReducer,
		bulk: bulkReducer,
	}),
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				// https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
				// Ignore these action types
				ignoredActions: [
					'dms_single_new/setFile',
					'dms_bulk_new/setFile',
					'dms_bulk_new/setFields',
					'dms_bulk_new/setFieldData',
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
