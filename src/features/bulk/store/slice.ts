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
	},
});

export const { setFile } = slice.actions;

export const { reducer } = slice;
