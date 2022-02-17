import { createSelector } from '@reduxjs/toolkit';
import { IBulkMetadataState, IBulkMetadataField, IBulkMetadataFile } from './model';
import { Store } from '../../store';
import { CustomFileLight } from '../../../types';

export const initialState: IBulkMetadataState = {
	currentStep: 0,
	files: [],
	fields: [],
};

export const getState = (state: Store) => state.bulk;

export const getFileFromStore = (state: IBulkMetadataState, fileId: IBulkMetadataFile['id']) =>
	state.files.find((file) => file.id === fileId);

export const getFilesFromStore = createSelector(
	[getState],
	(state: IBulkMetadataState): IBulkMetadataFile[] | undefined => state.files,
);

export const getCustomFilesFromStore = createSelector(
	[getState],
	(state: IBulkMetadataState): CustomFileLight[] | undefined => state.files.map(file => file.uploadedFile),
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
