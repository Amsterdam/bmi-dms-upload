import { CustomFile } from '@amsterdam/bmi-component-library';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBulkMetadataState, IBulkMetadataFile } from './model';

export const initialState: IBulkMetadataState = {
	currentStep: 0,
	files: [],
	fields: [],
};

export const slice = createSlice({
	name: 'dmsbulkupload',
	initialState,
	reducers: {
		setFile: (state: IBulkMetadataState, action: PayloadAction<IBulkMetadataFile>) => {
			const { id, url, uploadedFile, metadata } = action.payload;
			const newFile: IBulkMetadataFile = {
				id,
				url,
				uploadedFile,
				metadata,
			};
			state.files = [...state.files, newFile];
		},
		removeFile: (state: IBulkMetadataState, action: PayloadAction<CustomFile>) => {
			const newFiles = state.files.filter(file => file.uploadedFile.tmpId !== action.payload.tmpId)
			state.files = newFiles;
		},
		resetState: (state: IBulkMetadataState) => initialState
	},
});

export const { setFile, removeFile, resetState } = slice.actions;

export const { reducer } = slice;
