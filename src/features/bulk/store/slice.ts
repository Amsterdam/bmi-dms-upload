import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomFileLight, CustomJsonSchema } from '../../../types';
import { IBulkMetadataState, IBulkMetadataFile, IBulkMetadataField } from './model';

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
		setFields: (state: IBulkMetadataState, action: PayloadAction<IBulkMetadataField[]>) => {
			state.fields = action.payload;
		},
		setFieldData: (state: IBulkMetadataState, action: PayloadAction<any>) => {
			const obj = { ...action.payload };
			const newFields = [...state.fields ];

			if (obj.documentDescription) delete obj.documentDescription;

			Object.keys(obj).forEach(key => {
				const item = obj[key];
				const index = newFields.findIndex(field => field.id === key)
				newFields[index] = { ...newFields[index], ...item }
			})

			state.fields = [ ...newFields ]
		},
		removeFile: (state: IBulkMetadataState, action: PayloadAction<CustomFileLight>) => {
			const newFiles = state.files.filter(file => file.uploadedFile.tmpId !== action.payload.tmpId)
			state.files = newFiles;
		},
		resetState: (state: IBulkMetadataState) => initialState
	},
});

export const { setFile, setFields, setFieldData, removeFile, resetState } = slice.actions;

export const { reducer } = slice;
