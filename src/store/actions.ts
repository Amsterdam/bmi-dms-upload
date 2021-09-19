//@ts-nocheck
export const REMOVE_DOCUMENT = '@@dms-upload/REMOVE_DOCUMENT';
export const REMOVE_DOCUMENT_SUCCESS = '@@dms-upload/REMOVE_DOCUMENT_SUCCESS';
export const FETCH_DOCUMENTS_REQUEST = '@@@dms-upload/FETCH_DOCUMENTS_REQUEST';
export const FETCH_DOCUMENTS_PENDING = '@@dms-upload/FETCH_DOCUMENTS_PENDING';
export const FETCH_DOCUMENTS_SUCCESS = '@@dms-upload/FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_ERROR = '@@dms-upload/FETCH_DOCUMENTS_ERROR';

export function fetchDocumentsRequest(objectId: string | number) {
	console.log('request');
	return {
		type: FETCH_DOCUMENTS_REQUEST,
		payload: objectId,
	};
}

export function fetchDocumentsPending() {
	return {
		type: FETCH_DOCUMENTS_PENDING,
	};
}

export function fetchDocumentsSuccess(documents) {
	return {
		type: FETCH_DOCUMENTS_SUCCESS,
		payload: documents,
	};
}

export function fetchDocumentsError(error) {
	return {
		type: FETCH_DOCUMENTS_ERROR,
		payload: error,
	};
}

export function onDocumentRemove(surveyId: string, guid: number): IRemoveDocument {
	return {
		type: REMOVE_DOCUMENT,
		payload: {
			surveyId,
			guid,
		},
	};
}

export function removeDocumentSuccess(guid) {
	return {
		type: REMOVE_DOCUMENT_SUCCESS,
		payload: guid,
	};
}

interface IRemovePayload {
	surveyId: string;
	guid: number;
}
export interface IRemoveDocument {
	type: typeof REMOVE_DOCUMENT;
	payload: IRemovePayload;
}

export interface IRemoveDocumentSuccess {
	type: typeof REMOVE_DOCUMENT_SUCCESS;
	payload: number;
}

export interface IFetchDocumentsRequest {
	type: typeof FETCH_DOCUMENTS_REQUEST;
}

export interface IFetchDocumentsPending {
	type: typeof FETCH_DOCUMENTS_PENDING;
}

export interface IFetchDocumentsSuccess {
	type: typeof FETCH_DOCUMENTS_SUCCESS;
	payload: any;
}

export interface IFetchDocumentsError {
	type: typeof FETCH_DOCUMENTS_ERROR;
	payload: string;
}
export type DMSUploadActions =
	| IRemoveDocument
	| IRemoveDocumentSuccess
	| IFetchDocumentsRequest
	| IFetchDocumentsPending
	| IFetchDocumentsSuccess
	| IFetchDocumentsError;
