import { CustomFile } from '@amsterdam/bmi-component-library';

export const REMOVE_DOCUMENT = '@@dms-upload/REMOVE_DOCUMENT';
export const REMOVE_DOCUMENT_SUCCESS = '@@dms-upload/REMOVE_DOCUMENT_SUCCESS';
export const REMOVE_DOCUMENT_ERROR = '@@dms-upload/REMOVE_DOCUMENT_ERROR';
export const FETCH_DOCUMENTS_REQUEST = '@@@dms-upload/FETCH_DOCUMENTS_REQUEST';
export const FETCH_DOCUMENTS_PENDING = '@@dms-upload/FETCH_DOCUMENTS_PENDING';
export const FETCH_DOCUMENTS_SUCCESS = '@@dms-upload/FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_ERROR = '@@dms-upload/FETCH_DOCUMENTS_ERROR';
export interface IRemovePayload {
	surveyId: string;
	guid: string;
}
export interface IRemoveDocument {
	type: typeof REMOVE_DOCUMENT;
	payload: IRemovePayload;
}

export interface IRemoveDocumentSuccess {
	type: typeof REMOVE_DOCUMENT_SUCCESS;
	payload: string;
}

export interface IRemoveDocumentError {
	type: typeof REMOVE_DOCUMENT_ERROR;
	payload: Error;
}

export interface IFetchDocumentsRequest {
	type: typeof FETCH_DOCUMENTS_REQUEST;
	payload: string;
}

export interface IFetchDocumentsPending {
	type: typeof FETCH_DOCUMENTS_PENDING;
}

export interface IFetchDocumentsSuccess {
	type: typeof FETCH_DOCUMENTS_SUCCESS;
	payload: any[];
}

export interface IFetchDocumentsError {
	type: typeof FETCH_DOCUMENTS_ERROR;
	payload: Error;
}
export type DMSUploadActions =
	| IRemoveDocument
	| IRemoveDocumentSuccess
	| IRemoveDocumentError
	| IFetchDocumentsRequest
	| IFetchDocumentsPending
	| IFetchDocumentsSuccess
	| IFetchDocumentsError;

export function fetchDocumentsRequest(objectId: string): IFetchDocumentsRequest {
	return {
		type: FETCH_DOCUMENTS_REQUEST,
		payload: objectId,
	};
}

export function fetchDocumentsPending(): IFetchDocumentsPending {
	return {
		type: FETCH_DOCUMENTS_PENDING,
	};
}

export function fetchDocumentsSuccess(documents: CustomFile[]): IFetchDocumentsSuccess {
	return {
		type: FETCH_DOCUMENTS_SUCCESS,
		payload: documents,
	};
}

export function fetchDocumentsError(error: Error): IFetchDocumentsError {
	return {
		type: FETCH_DOCUMENTS_ERROR,
		payload: error,
	};
}

export function onDocumentRemove(surveyId: string, guid: string): IRemoveDocument {
	return {
		type: REMOVE_DOCUMENT,
		payload: {
			surveyId,
			guid,
		},
	};
}

export function removeDocumentSuccess(guid: string): IRemoveDocumentSuccess {
	return {
		type: REMOVE_DOCUMENT_SUCCESS,
		payload: guid,
	};
}

export function removeDocumentError(error: Error): IRemoveDocumentError {
	return {
		type: REMOVE_DOCUMENT_ERROR,
		payload: error,
	};
}
