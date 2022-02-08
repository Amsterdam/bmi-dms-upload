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
			console.log('setFile slice:', action.payload)
			// @ts-ignore
			const newFile: IBulkMetadataFile = {
				id: action.payload.id,
				url: action.payload.url,
				// uploadedFile: action.payload.uploadedFile,
				metadata: action.payload.metadata ?? undefined
			};
			state.files = [...state.files, newFile];
			console.log('setFile state.files:', state.files)
		},
	},
});

export const { setFile } = slice.actions;

export const { reducer } = slice;
