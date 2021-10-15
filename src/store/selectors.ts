import { CustomFile } from '@amsterdam/bmi-component-library';
import { createSelector } from 'reselect';
import { DMSUpload } from './store';

export const getState = (state: DMSUpload) => state;

export const getFileFromStore = createSelector([getState], (state: DMSUpload): CustomFile => state.file);

export const getMetadataFromStore = createSelector([getState], (state: DMSUpload): any => state.metadata); //don't know how to infer generic metadata so used Object for now
