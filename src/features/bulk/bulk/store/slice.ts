import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

import { CustomFileLightOrRejection } from '../../../../types';
import { CurrentStep, IBulkField, IBulkFile, IBulkState } from './model';

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
		removeFile: (state: IBulkState, action: PayloadAction<CustomFileLightOrRejection>) => {
			const newFiles = state.files.filter((file) => file.uploadedFile.tmpId !== action.payload.tmpId);
			state.files = newFiles;
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
		setFile2: (state: IBulkState, action: PayloadAction<IBulkFile>) => {
			const { id, uploadedFile, metadata } = action.payload;
			const newFile: IBulkFile = {
				id,
				uploadedFile,
				metadata,
			};
			state.files = [...state.files, newFile];
		},
		setFileMetadata: (state: IBulkState, action: PayloadAction<{ fileId: IBulkFile['id'], metadata: IBulkFile['metadata']}>) => {
			const file = state.files.find(file => file.id === action.payload.fileId)
			if (!file) return;
			file.metadata = action.payload.metadata
		},
		stepBack: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
		stepForward: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
	},
});

export const {
	removeFile,
	resetState,
	setCurrentStep,
	setFields,
	setFile,
	setFileMetadata,
	stepBack,
	stepForward,
} = slice.actions;

export const { reducer } = slice;
