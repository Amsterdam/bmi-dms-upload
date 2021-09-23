import { takeLatest, call, put } from 'redux-saga/effects';
import {
	FETCH_DOCUMENTS_REQUEST,
	REMOVE_DOCUMENT,
	IRemoveDocument,
	IFetchDocumentsRequest,
	fetchDocumentsError,
	fetchDocumentsPending,
	fetchDocumentsSuccess,
	removeDocumentSuccess,
} from './actions';
import axios from 'axios';

export const getDocuments = (objectId: string) => {
	return axios.get(
		`https://jsonplaceholder.typicode.com/posts/${objectId}/comments`,
		// `/api/inforing/objects/${objectId}/documents`,
	);
};

function* fetchDocumentsSaga(action: IFetchDocumentsRequest) {
	const objectId = action.payload;
	yield put(fetchDocumentsPending());
	try {
		const { data } = yield call(getDocuments, objectId);
		yield put(fetchDocumentsSuccess(data));
	} catch (error: any) {
		yield put(fetchDocumentsError(error));
	}
}

export const removeDocument = (surveyId: string, guid: string) => {
	axios.delete(
		`https://jsonplaceholder.typicode.com/posts/${guid}`,
		// `/api/inforing/surveys/${surveyId}/document/${guid}`,
	);
};

function* removeDocumentSaga(action: IRemoveDocument) {
	const { surveyId, guid } = action.payload;
	try {
		yield call(removeDocument, surveyId, guid);
		yield put(removeDocumentSuccess(guid));
	} catch (error: any) {
		yield put(fetchDocumentsError(error));
	}
}

function* watchOnDocumentRemove() {
	yield takeLatest(REMOVE_DOCUMENT, removeDocumentSaga);
}

function* watchGetDocumentsRequest() {
	yield takeLatest(FETCH_DOCUMENTS_REQUEST, fetchDocumentsSaga);
}

export default [watchGetDocumentsRequest, watchOnDocumentRemove];
