import { createSelector } from 'reselect';
import { CustomFile } from '@amsterdam/bmi-component-library';
import { Store } from './store';

export const getState = (state: Store.DMSUpload) => state;

export const getFileFromStore = createSelector([getState], (state: Store.DMSUpload): CustomFile => state.file);

export const getMetadataFromStore= createSelector([getState], (state: Store.DMSUpload) => state.metadata);
