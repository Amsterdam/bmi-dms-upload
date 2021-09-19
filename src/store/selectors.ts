import { createSelector } from 'reselect';
import { IState, Store } from './store';

export const getState = (state: IState): Store.DMSUpload => state.dmsUpload;

export const getDocuments = createSelector(
	[getState],
	(state: Store.DMSUpload): string[] | false => state?.documents ?? false,
);
