import { createSelector } from 'reselect';
import { BulkCustomFile } from 'src/features/bulk/store/model';
import { Store } from '../../store';

export const getState = (state: Store) => state.upload;

export const getFileFromStore = createSelector([getState], (state): BulkCustomFile | undefined => state?.file);

export const getMetadataFromStore = createSelector(
	[getState],
	(state): Store['upload']['metadata'] => state.metadata,
);
