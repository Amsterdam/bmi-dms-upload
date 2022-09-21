import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom-v5-compat';

import { CustomFileLightOrRejection } from '../../../../types';
import { CurrentStep, IBulkField, IBulkFile, IBulkState } from './model';

export const initialState: IBulkState = {
	basePath: '/',
	currentStep: CurrentStep.Button,
	files: [],
	fields: [],
	isBulkMode: true,
};

export const slice = createSlice({
	name: 'dms_bulk',
	initialState,
	reducers: {
		setBasePath: (state: IBulkState, action: PayloadAction<string>) => {
			state.basePath = action.payload;
		},
		removeFile: (state: IBulkState, { payload }: PayloadAction<CustomFileLightOrRejection>) => {
			state.files = state.files.filter((file) => file.uploadedFile.tmpId !== payload.tmpId);
		},
		resetState: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => initialState,
		setCurrentStep: (state: IBulkState, { payload }: PayloadAction<CurrentStep>) => {
			state.currentStep = payload;
		},
		setFields: (state: IBulkState, { payload }: PayloadAction<IBulkField[]>) => {
			state.fields = payload;
		},
		setAllFieldsEditable: (state: IBulkState, { payload }: PayloadAction<IBulkField[]>) => {
			state.fields = payload.map((field) => ({ ...field, changeIndividual: true }));
		},
		resetFieldsAndFiles: (state: IBulkState, { payload }: PayloadAction<IBulkField[]>) => {
			state.fields = payload.map((field) => ({ ...field, changeIndividual: false }));

			if (state.files && state.files.length) {
				const defaultFiles = state.files.map(({ id, uploadedFile }) => ({ id, uploadedFile }));

				state.files = defaultFiles;
			}
		},
		setFile: (state: IBulkState, { payload }: PayloadAction<IBulkFile>) => {
			state.files = [...state.files, payload];
		},
		setFileMetadata: (
			state: IBulkState,
			{ payload }: PayloadAction<{ fileId: IBulkFile['id']; metadata: IBulkFile['metadata'] }>,
		) => {
			const file = state.files.find((file) => file.id === payload.fileId);
			if (!file) return;
			file.metadata = payload.metadata;
		},
		setFileMetadataValidity: (
			state: IBulkState,
			{ payload }: PayloadAction<{ fileId: IBulkFile['id']; isValid: IBulkFile['isMetadataValid'] }>,
		) => {
			const file = state.files.find((file) => file.id === payload.fileId);
			if (!file) return;
			file.isMetadataValid = payload.isValid;
		},
		stepBack: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
		stepForward: (state: IBulkState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
		setBulkMode: (state: IBulkState, { payload }: PayloadAction<boolean>) => {
			state.isBulkMode = payload;
		},
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
	setBulkMode,
	setAllFieldsEditable,
	resetFieldsAndFiles,
} = slice.actions;

export const { reducer } = slice;
