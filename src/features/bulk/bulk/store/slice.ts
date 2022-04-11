import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { CurrentStep, IBulkField, IBulkFile, IBulkState, IFieldData } from './model';

export const initialState: IBulkState = {
	currentStep: CurrentStep.Button,
	files: [],
	fields: [],
};
const reduceFieldData = (fieldData: IFieldData, stateFields: IBulkField[]) => {
	return stateFields.reduce((fields: IBulkField[], currentField: IBulkField) => {
		const fieldDataKey = Object.keys(fieldData).find((key) => key === currentField.id);
		const fieldDataItem = fieldDataKey && fieldData[fieldDataKey];

		let updatedField = currentField;

		if (fieldDataItem) {
			updatedField = {
				...updatedField,
				...fieldDataItem,
			};
		}

		return [...fields, updatedField];
	}, []);
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
			state.fields = reduceFieldData({ ...action.payload }, state.fields);
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
	stepBack,
	stepForward,
} = slice.actions;

export const { reducer } = slice;
