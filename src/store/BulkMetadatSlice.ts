import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { IBulkMetadataState, IBulkMetadataField, IBulkMetadataFile } from '../types';
import { CustomFile } from '@amsterdam/bmi-component-library';

export const initialState: IBulkMetadataState = {
	currentStep: 'upload',
	files: [],
	fields: [],
	selectedFileId: null,
};

/**
 * Slice (State and reducers)
 */

export const slice = createSlice({
	name: 'dmsbulkupload',
	initialState,
	reducers: {
		setFiles: (state: IBulkMetadataState, action: PayloadAction<CustomFile>) => {
			const newFile: IBulkMetadataFile = {
				uploadedFile: action.payload,
			};
			state.files = [...state.files, newFile];
		},
	},
});

export const { setFiles } = slice.actions;

export const { reducer } = slice;

/**
 * Selectors
 */

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
