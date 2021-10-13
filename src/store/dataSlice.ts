import { CustomFile } from '@amsterdam/bmi-component-library';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export const fileSlice: Slice = createSlice({
	name: 'file',
	initialState: [],
	reducers: {
		setFile: (state, action: PayloadAction<CustomFile>) => {
			state.push(action.payload);
		},
	},
});

export const { setFile } = fileSlice.actions;