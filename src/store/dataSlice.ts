import { CustomFile } from '@amsterdam/bmi-component-library';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export const fileSlice: Slice = createSlice({
	name: 'file',
	initialState: {},
	reducers: {
		setFile: (state, action: PayloadAction<CustomFile>) => {
			console.log('setFIle', action);
			state.file = action.payload;
		},
	},
});

export const metadataSlice: Slice = createSlice({
	name: 'metadata',
	initialState: {},
	reducers: {
		setMetadata: (state, action: PayloadAction<CustomFile>) => {
			state.metadata = action.payload;
		},
	},
});

export const { setFile } = fileSlice.actions;
export const { setMetadata } = metadataSlice.actions;

export const rootReducer = { file: fileSlice.reducer, metadata: metadataSlice.reducer };
