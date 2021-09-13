import * as redux from 'redux';
import { INIT, DMSUploadActions } from './actions';
import { Store } from './store';

export const DEFAULT_STATE: Store.DMSUpload = {
	foo: '',
};

function reducer(state: Store.DMSUpload = DEFAULT_STATE, action: DMSUploadActions): Store.DMSUpload {
	switch (action.type) {
		case INIT:
			return {
				...state,
				foo: 'bar',
			};
		default:
			return state;
	}
}

export const rootReducer: redux.Reducer<Store.DMSUpload, DMSUploadActions> = reducer;
