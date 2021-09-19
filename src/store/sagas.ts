//@ts-nocheck
import { takeLatest, call, put } from 'redux-saga/effects';
import {
	fetchDocumentsError,
	fetchDocumentsPending,
	fetchDocumentsSuccess,
	FETCH_DOCUMENTS_REQUEST,
	REMOVE_DOCUMENT,
	removeDocumentSuccess,
} from './actions';
import axios from 'axios';

export const getDocuments = (objectId) => {
	return axios.get(
		`https://jsonplaceholder.typicode.com/posts/${objectId}/comments`,
		// `/api/inforing/objects/${objectId}/documents`,
	);
};

function* fetchDocumentsSaga(action) {
	const objectId = action.payload;
	yield put(fetchDocumentsPending());
	try {
		const result = yield call(getDocuments, objectId);
		yield put(fetchDocumentsSuccess(result.data));
	} catch (e) {
		yield put(fetchDocumentsError(e));
	}
}

export const removeDocument = (
	// surveyId,
	guid,
) => {
	axios.delete(
		`https://jsonplaceholder.typicode.com/posts/${guid}`,
		// `/api/inforing/surveys/${surveyId}/document/${guid}`
	);
};

function* removeDocumentSaga(action) {
	const {
		// surveyId,
		guid,
	} = action.payload;
	try {
		yield call(
			removeDocument,
			//  surveyId,
			guid,
		);
		yield put(removeDocumentSuccess(guid));
	} catch (e) {
		console.log('remove document error');
	}
}

function* watchOnDocumentRemove() {
	yield takeLatest(REMOVE_DOCUMENT, removeDocumentSaga);
}

function* watchGetDocumentsRequest() {
	yield takeLatest(FETCH_DOCUMENTS_REQUEST, fetchDocumentsSaga);
}

export default [watchGetDocumentsRequest, watchOnDocumentRemove];
