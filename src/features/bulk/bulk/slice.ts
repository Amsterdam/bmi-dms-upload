import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BulkRoutesToSteps } from './constants';
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
		removeFile: (state: IBulkState, action: PayloadAction<any>) => {
			const newFiles = state.files.filter((file) => file.uploadedFile.tmpId !== action.payload.tmpId);
			state.files = newFiles;
		},
		resetState: () => initialState,
		initCurrentStep: (state: IBulkState, action: PayloadAction<string>) => {
			const currentStep = state.currentStep;
			const newCurrentStep = BulkRoutesToSteps[action.payload];
			if (newCurrentStep !== currentStep) {
				state.currentStep = newCurrentStep;
			}
		},
		setCurrentStep: (state: IBulkState, action: PayloadAction<CurrentStep>) => {
			state.currentStep = action.payload;
		},
		// PayloadAction<any> because issues with converting the type from uknown to something useful!!!
		setFieldData: (state: IBulkState, action: PayloadAction<any>) => {
			const obj = { ...action.payload };
			const newFields = [...state.fields];

			Object.keys(obj).forEach((key) => {
				const item = obj[key];
				const index = newFields.findIndex((field) => field.id === key);

				if (index !== -1) {
					newFields[index] = {
						...newFields[index],
						...item,
					};
				}
			});

			state.fields = [...newFields];
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
	},
});

export const {
	removeFile,
	resetState,
	setCurrentStep,
    setFieldData,
	setFields,
	setFile,
	initCurrentStep,
} = slice.actions;

export const { reducer } = slice;
