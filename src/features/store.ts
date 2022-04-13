import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { IBulkState } from './bulk/bulk/store/model'
import { reducer as bulkReducer } from './bulk/bulk/store/slice';
import { bulkSaga } from './bulk/bulk/store/sagas';

import { ISingleState } from './single/single/store/model';
import { reducer as singleReducer } from './single/single/store/slice';
import { singleSaga } from './single/single/store/sagas';

export interface Store {
	single: ISingleState;
	bulk: IBulkState;
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: combineReducers({
		single: singleReducer,
		bulk: bulkReducer,
	}),
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				// https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
				// Ignore these action types
				ignoredActions: [
					'dms_bulk/removeFile',
					'dms_bulk/resetState',
					'dms_bulk/setFieldData',
					'dms_bulk/setFields',
					'dms_bulk/setFile',
					'dms_bulk/stepBack',
					'dms_bulk/stepForward',
					'dms_single/removeFile',
					'dms_single/resetState',
					'dms_single/setFile',
					'dms_single/stepBack',
					'dms_single/stepForward',
				],
				ignoredPaths: ['single.file', 'bulk.files'],
			},
		}),
		sagaMiddleware,
	],
});

sagaMiddleware.run(bulkSaga);
sagaMiddleware.run(singleSaga);
