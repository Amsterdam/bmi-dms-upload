import { CustomFile } from '@amsterdam/bmi-component-library';
import { createSelector } from 'reselect';
import { DMSUpload } from './store';

export const getState = (state: DMSUpload) => state;

export const getFileFromStore = createSelector([getState], (state: DMSUpload): CustomFile | undefined => state?.file);

export const getMetadataFromStore = createSelector(
	[getState],
	(state: DMSUpload): DMSUpload['metadata'] => state.metadata,
);
