import { createSelector } from 'reselect';
import { CustomFile } from '@amsterdam/bmi-component-library';
import { IState } from './store';

export const getState = (state: IState) => state;

export const getFileFromStore = createSelector([getState], (state: IState): CustomFile => state.file);

export const getMetadataFromStore = createSelector([getState], (state: IState): any => state.metadata);
