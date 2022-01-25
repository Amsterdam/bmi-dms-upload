import { createSelector } from '@reduxjs/toolkit';
import { IBulkMetadataState, IBulkMetadataField, IBulkMetadataFile } from './model';

export const initialState: IBulkMetadataState = {
	currentStep: 'upload',
	files: [],
	fields: [],
};

export const getState = (state: IBulkMetadataState) => state;

export const getFilesFromStore = createSelector(
	[getState],
	(state: IBulkMetadataState): IBulkMetadataFile[] | undefined => state.files,
);

export const getFieldsFromStore = createSelector(
	[getState],
	(state: IBulkMetadataState): IBulkMetadataField[] | undefined => state.fields,
);

export const getChangeIndividualFieldsFromStore = createSelector([getState], (state: IBulkMetadataState):
	| IBulkMetadataField[]
	| undefined => state.fields.filter((field) => field.changeIndividual));

export const getDefaultFieldsFromStore = createSelector([getState], (state: IBulkMetadataState):
	| IBulkMetadataField[]
	| undefined => state.fields.filter((field) => !field.changeIndividual));
