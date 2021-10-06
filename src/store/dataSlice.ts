import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export const fileSlice: Slice = createSlice({
	name: 'file',
	initialState: {
		file: null,
	},
	reducers: {
		setFile: (state, action: PayloadAction<File>) => {
			state.file = action.payload;
		},
	},
});

export const metadataSlice: Slice = createSlice({
	name: 'metadata',
	initialState: {
		metadata: {},
	},
	reducers: {
		setMetadata: (state, action: PayloadAction<File>) => {
			state.file = action.payload;
		},
	},
});

export const { setFile } = fileSlice.actions;
export const { setMetadata } = metadataSlice.actions;

export const rootReducer = { file: fileSlice.reducer, metedata: metadataSlice.reducer };
