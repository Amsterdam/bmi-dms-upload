import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DMSUpload } from '../../store';
import { MetadataGenericType } from '../../../types';
import { BulkCustomFile } from 'src/features/bulk/store/model';

export const initialState: DMSUpload = {
	file: undefined,
	metadata: {},
};

export const slice = createSlice({
	name: 'dmsupload',
	initialState,
	reducers: {
		setFile: (state: DMSUpload, action: PayloadAction<BulkCustomFile>) => {
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
