import { createSelector } from 'reselect';
import { IDmsDocument } from '~/components/Wizard/Wizard';
import { IState, Store } from './store';

export const getState = (state: IState): Store.DMSUpload => state.dmsUpload;

export const getDocuments = createSelector(
	[getState],
	(state: Store.DMSUpload): IDmsDocument[] | false => state?.documents ?? false,
);
