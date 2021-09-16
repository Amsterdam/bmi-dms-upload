import { createSelector } from 'reselect';
import { IState, Store } from './store';

export const getState = (state: IState): Store.DMSUpload => state.dmsUpload;

export const getFoo = createSelector([getState], (state: Store.DMSUpload): string | false => state?.foo ?? false);
