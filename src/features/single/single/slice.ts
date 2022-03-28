import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomFileLight, MetadataGenericType } from '../../../types';
import { CurrentStep, ISingleState } from './model';

export const initialState: ISingleState = {
	currentStep: CurrentStep.Button,
	file: undefined,
	metadata: {},
};

export const slice = createSlice({
	name: 'dms_single',
	initialState,
	reducers: {
		removeFileFromStore: (state: ISingleState) => {
			state.file = undefined;
		},
		resetState: () => initialState,
		setCurrentStep: (state: ISingleState, action: PayloadAction<CurrentStep>) => {
			state.currentStep = action.payload;
		},
		setCurrentStepNext: (state: ISingleState) => state,
		setCurrentStepPrev: (state: ISingleState) => state,
		setFile: (state: ISingleState, action: PayloadAction<CustomFileLight>) => {
			state.file = action.payload;
		},
		setMetadata: (state: ISingleState, action: PayloadAction<MetadataGenericType>) => {
			state.metadata = action.payload;
		},
	},
});

export const {
	removeFileFromStore,
	resetState,
	setCurrentStep,
	setCurrentStepNext,
	setCurrentStepPrev,
	setFile,
	setMetadata,
} = slice.actions;

export const { reducer } = slice;
