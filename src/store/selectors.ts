// import { createSelector } from 'reselect';
// import { CustomFile } from '@amsterdam/bmi-component-library';
import { IState, Store } from './store';

export const getState = (state: IState): Store.DMSUpload => state.dmsUpload;

// export const getDocuments = createSelector(
// 	[getState],
// 	(state: Store.DMSUpload): CustomFile[] | false => state?.documents ?? false,
// );
