import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom-v5-compat';

import { CustomFileLightOrRejection } from '../../../../types';
import { CurrentStep, IBulkField, IBulkFile, IBulkState } from './model';

export const initialState: IBulkState = {
	basePath: '/',
	currentStep: CurrentStep.Button,
	files: [],
	fields: [],
};

export const slice = createSlice({
	name: 'dms_bulk',
	initialState,
	reducers: {
		setBasePath: (state: IBulkState, action: PayloadAction<string>) => {
			state.basePath = action.payload;
		},
		removeFile: (state: IBulkState, action: PayloadAction<CustomFileLightOrRejection>) => {
			state.files = state.files.filter((file) => file.uploadedFile.tmpId !== action.payload.tmpId);
		},
		resetState: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => initialState,
		setCurrentStep: (state: IBulkState, action: PayloadAction<CurrentStep>) => {
			state.currentStep = action.payload;
		},
		setFields: (state: IBulkState, action: PayloadAction<IBulkField[]>) => {
			state.fields = action.payload;
		},
		setFile: (state: IBulkState, action: PayloadAction<IBulkFile>) => {
			state.files = [...state.files, action.payload];
		},
		setFileMetadata: (
			state: IBulkState,
			action: PayloadAction<{ fileId: IBulkFile['id']; metadata: IBulkFile['metadata'] }>,
		) => {
			const file = state.files.find((file) => file.id === action.payload.fileId);
			if (!file) return;
			file.metadata = action.payload.metadata;
		},
		setFileMetadataValidity: (
			state: IBulkState,
			action: PayloadAction<{ fileId: IBulkFile['id']; isValid: IBulkFile['isMetadataValid'] }>,
		) => {
			const file = state.files.find((file) => file.id === action.payload.fileId);
			if (!file) return;
			file.isMetadataValid = action.payload.isValid;
		},
		stepBack: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
		stepForward: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
	},
});

export const {
	setBasePath,
	removeFile,
	resetState,
	setCurrentStep,
	setFields,
	setFile,
	setFileMetadata,
	setFileMetadataValidity,
	stepBack,
	stepForward,
} = slice.actions;

export const { reducer } = slice;
