import { CustomFile } from '@amsterdam/bmi-component-library';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export const fileSlice: Slice = createSlice({
	name: 'file',
	initialState: [],
	reducers: {
		setFile: (state, action: PayloadAction<CustomFile>) => {
			state.push(action.payload);
		},
		resetFile: (state) => {
			return (state = []);
		},
	},
});

export const metadataSlice: Slice = createSlice({
	name: 'metadata',
	initialState: {},
	reducers: {
		setMetadata: (state, action: PayloadAction<CustomFile>) => {
			return (state = action.payload);
		},
		resetMetadata: (state) => {
			return (state = {});
		},
	},
});

export const { setFile, resetFile } = fileSlice.actions;
export const { setMetadata, resetMetadata } = metadataSlice.actions;

export const rootReducer = { file: fileSlice.reducer, metadata: metadataSlice.reducer };
