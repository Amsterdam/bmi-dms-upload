import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomFileLight, MetadataGenericType } from '../../../types';
import { SingleRoutesToSteps } from './constants';
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
		initCurrentStep: (state: ISingleState, action: PayloadAction<string>) => {
			const currentStep = state.currentStep;
			const newCurrentStep = SingleRoutesToSteps[action.payload];
			if (newCurrentStep !== currentStep) {
				state.currentStep = newCurrentStep;
			}
		},
		setCurrentStep: (state: ISingleState, action: PayloadAction<CurrentStep>) => {
			state.currentStep = action.payload;
		},
		setFile: (state: ISingleState, action: PayloadAction<CustomFileLight>) => {
			state.file = action.payload;
		},
		setMetadata: (state: ISingleState, action: PayloadAction<MetadataGenericType>) => {
			state.metadata = action.payload;
		},
	},
});

export const { removeFileFromStore, resetState, initCurrentStep, setCurrentStep, setFile, setMetadata } = slice.actions;

export const { reducer } = slice;
