import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBulkMetadataState, IBulkMetadataFile } from './model';

export const initialState: IBulkMetadataState = {
	currentStep: 'upload',
	files: [],
	fields: [],
};

export const slice = createSlice({
	name: 'dmsbulkupload',
	initialState,
	reducers: {
		setFile: (state: IBulkMetadataState, action: PayloadAction<IBulkMetadataFile>) => {
			const newFile: IBulkMetadataFile = {
				id: action.payload.id,
				url: action.payload.url,
				uploadedFile: action.payload.uploadedFile,
				metadata: action.payload.metadata
			};
			state.files = [...state.files, newFile];
		},
	},
});

export const { setFile } = slice.actions;

export const { reducer } = slice;
