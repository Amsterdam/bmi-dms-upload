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
	documents: [
		// {
		// 	lastModified: 1623407907404,
		// 	name: 'Stakeholderanalyse.pdf',
		// 	size: 119660,
		// 	type: 'image/png',
		// 	webkitRelativePath: '',
		// 	tmpId: 1234,
		// },
		// {
		// 	lastModified: 1623407907304,
		// 	name: 'Migratierapport.pdf',
		// 	size: 129654,
		// 	type: 'image/png',
		// 	webkitRelativePath: '',
		// 	tmpId: 12345,
		// },
	],
	pending: false,
	error: 'default error',
};

function reducer(state: Store.DMSUpload = DEFAULT_STATE, action: DMSUploadActions): Store.DMSUpload {
	console.log('state', state);
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
