import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DMSUpload, MetadataGenericType } from './store';
import { CustomFile } from '@amsterdam/bmi-component-library';

export const initialState: DMSUpload = {
	file: undefined,
	metadata: {},
};

export const slice = createSlice({
	name: 'dmsupload',
	initialState,
	reducers: {
		setFile: (state: DMSUpload, action: PayloadAction<CustomFile>) => {
			state.file = action.payload;
		},
		setMetadata: (state: DMSUpload, action: PayloadAction<MetadataGenericType>) => {
			state.metadata = action.payload;
		},
		resetState: () => initialState,
		removeFileFromStore: (state: DMSUpload) => {
			state.file = undefined;
		},
	},
});

export const { setFile, setMetadata, resetState, removeFileFromStore } = slice.actions;

export const { reducer } = slice;
