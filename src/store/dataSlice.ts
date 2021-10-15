import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { DMSUpload } from './store';
import { CustomFile } from '@amsterdam/bmi-component-library';

const initialState: DMSUpload = {
	file: {} as CustomFile,
	metadata: {},
};

export const slice: Slice = createSlice({
	name: 'dmsupload',
	initialState,
	reducers: {
		setFile: (state: DMSUpload, action: PayloadAction<CustomFile>) => {
			state.file = action.payload;
		},
		setMetadata: (state: DMSUpload, action: PayloadAction<any>) => {
			state.metadata = action.payload;
		},
		resetState: (state: DMSUpload) => {
			return (state = initialState);
		},
	},
});

export const { setFile, setMetadata, resetState } = slice.actions;

export const { reducer } = slice;
