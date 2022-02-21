import { createSelector } from 'reselect';
import { CustomFileLight } from '../../../types';
import { Store } from '../../store';

export const getState = (state: Store) => state.upload;

export const getFileFromStore = createSelector([getState], (state): CustomFileLight | undefined => state?.file);

export const getMetadataFromStore = createSelector(
	[getState],
	(state): Store['upload']['metadata'] => state.metadata,
);
