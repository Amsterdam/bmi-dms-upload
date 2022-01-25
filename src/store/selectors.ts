import { CustomFile } from '@amsterdam/bmi-component-library';
import { createSelector } from 'reselect';
import { Store } from './store';

export const getState = (state: Store) => state.upload;

export const getFileFromStore = createSelector([getState], (state): CustomFile | undefined => state?.file);

export const getMetadataFromStore = createSelector(
	[getState],
	(state): Store['upload']['metadata'] => state.metadata,
);
