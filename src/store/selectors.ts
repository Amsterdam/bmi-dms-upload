// import { createSelector } from 'reselect';
// import { CustomFile } from '@amsterdam/bmi-component-library';
// import { IState, Store } from './store';

// export const getState = (state: IState): Store.DMSUpload => {
// 	console.log('state', state);
// 	state.dmsUpload;
// };

// export const getFileFromStore = createSelector(
// 	[getState],
// 	(state: Store.DMSUpload): CustomFile | false => state?.file.file ?? false,
// );

// export const getMetadataFromStore = createSelector([getState], (state: Store.DMSUpload): any => {
// 	state?.metadata ?? false;
// // })
