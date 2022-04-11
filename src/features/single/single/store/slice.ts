import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { CustomFileLight, MetadataGenericType } from '../../../../types';
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
		removeFile: (state: ISingleState) => {
			state.file = undefined;
		},
		resetState: (state: ISingleState, action: PayloadAction<{ navigate: NavigateFunction }>) => initialState,
		setCurrentStep: (state: ISingleState, action: PayloadAction<CurrentStep>) => {
			state.currentStep = action.payload;
		},
		setFile: (state: ISingleState, action: PayloadAction<CustomFileLight>) => {
			state.file = action.payload;
		},
		setMetadata: (state: ISingleState, action: PayloadAction<MetadataGenericType>) => {
			state.metadata = action.payload;
		},
		stepBack: (state: ISingleState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
		stepForward: (state: ISingleState, action: PayloadAction<{ navigate: NavigateFunction }>) => state,
	},
});

export const {
	removeFile,
	resetState,
	setCurrentStep,
	setFile,
	setMetadata,
	stepBack,
	stepForward,
} = slice.actions;

export const { reducer } = slice;
