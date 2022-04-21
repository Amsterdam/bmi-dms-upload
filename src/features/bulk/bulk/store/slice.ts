import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { CurrentStep, IBulkField, IBulkFile, IBulkState, IFieldData } from './model';

export const initialState: IBulkState = {
	currentStep: CurrentStep.Button,
	files: [],
	fields: [],
};

export const slice = createSlice({
	name: 'dms_bulk',
	initialState,
	reducers: {
		// PayloadAction<any> because issues with converting the type from uknown to something useful!!!
		removeFile: (state: IBulkState, action: PayloadAction<any>) => {
			const newFiles = state.files.filter((file) => file.uploadedFile.tmpId !== action.payload.tmpId);
			state.files = newFiles;
		},
		resetState: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => initialState,
		setCurrentStep: (state: IBulkState, action: PayloadAction<CurrentStep>) => {
			state.currentStep = action.payload;
		},
		// PayloadAction<any> because issues with converting the type from uknown to something useful!!!
		setFieldData: (state: IBulkState, action: PayloadAction<any>) => {
			state.fields = action.payload;
		},
		setFields: (state: IBulkState, action: PayloadAction<IBulkField[]>) => {
			state.fields = action.payload;
		},
		setFile: (state: IBulkState, action: PayloadAction<IBulkFile>) => {
			const { id, url, uploadedFile, metadata } = action.payload;
			const newFile: IBulkFile = {
				id,
				url,
				uploadedFile,
				metadata,
			};
			state.files = [...state.files, newFile];
		},
		setFilesMetadata: (state: IBulkState, action: PayloadAction<IBulkField[]>) => {
			const individualFields = action.payload.filter(field => field.changeIndividual)
			state.files = state.files.map(file => {
				file.metadata = individualFields
				return file;
			});
		},
		stepBack: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
		stepForward: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
	},
});

export const {
	removeFile,
	resetState,
	setCurrentStep,
	setFieldData,
	setFields,
	setFile,
	setFilesMetadata,
	stepBack,
	stepForward,
} = slice.actions;

export const { reducer } = slice;
