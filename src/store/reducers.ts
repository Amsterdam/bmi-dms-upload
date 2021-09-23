import * as redux from 'redux';
import {
	REMOVE_DOCUMENT_SUCCESS,
	DMSUploadActions,
	FETCH_DOCUMENTS_PENDING,
	FETCH_DOCUMENTS_SUCCESS,
	FETCH_DOCUMENTS_ERROR,
} from './actions';
import { Store } from './store';

export const DEFAULT_STATE: Store.DMSUpload = {
	documents: [],
	pending: false,
};

function reducer(state: Store.DMSUpload = DEFAULT_STATE, action: DMSUploadActions): Store.DMSUpload {
	switch (action.type) {
		case FETCH_DOCUMENTS_PENDING:
			return {
				...state,
				pending: true,
			};
		case FETCH_DOCUMENTS_SUCCESS:
			return {
				...state,
				pending: false,
				documents: action.payload,
			};
		case FETCH_DOCUMENTS_ERROR:
			return {
				...state,
				pending: false,
				error: action.payload,
			};
		case REMOVE_DOCUMENT_SUCCESS:
			return { ...state, documents: state.documents.filter((doc) => doc.id !== action.payload) };
		default:
			return state;
	}
}

export const rootReducer: redux.Reducer<Store.DMSUpload, DMSUploadActions> = reducer;
