import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomFile } from '@amsterdam/bmi-component-library';
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
		setFiles: (state: IBulkMetadataState, action: PayloadAction<CustomFile[]>) => {
			action.payload.forEach(file => {
				const newFile: IBulkMetadataFile = {
					uploadedFile: file,
				};
				state.files = [...state.files, newFile];
			})
		},
	},
});

export const { setFiles } = slice.actions;

export const { reducer } = slice;
