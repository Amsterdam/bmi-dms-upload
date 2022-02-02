import { createSelector } from '@reduxjs/toolkit';
import { IBulkMetadataState, IBulkMetadataField, IBulkMetadataFile } from './model';

export const initialState: IBulkMetadataState = {
	currentStep: 'upload',
	files: [],
	fields: [],
};

export const getState = (state: IBulkMetadataState) => state;

export const getFileFromStore = (state: IBulkMetadataState, fileId: IBulkMetadataFile['id']) =>
	state.files.find((file) => file.id === fileId);

export const getFilesFromStore = createSelector(
	[getState],
	(state: IBulkMetadataState): IBulkMetadataFile[] | undefined => state.files,
);

export const getFieldsFromStore = createSelector(
	[getState],
	(state: IBulkMetadataState): IBulkMetadataField[] | undefined => state.fields,
);

export const getChangeIndividualFieldsFromStore = createSelector([getFieldsFromStore], (fields):
	| IBulkMetadataField[]
	| undefined => fields?.filter((field) => field.changeIndividual));

export const getDefaultFieldsFromStore = createSelector([getFieldsFromStore], (fields):
	| IBulkMetadataField[]
	| undefined => fields?.filter((field) => !field.changeIndividual));

export const getFieldsForFile = createSelector(
	[getFileFromStore, getFieldsFromStore],
	(fileFromStore, fieldsFromStore) => {
		return [...(fileFromStore?.metadata ?? []), ...(fieldsFromStore ?? [])];
	},
);
