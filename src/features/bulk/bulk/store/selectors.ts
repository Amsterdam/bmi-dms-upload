import { createSelector } from '@reduxjs/toolkit';
import { CustomFileLight } from '../../../../types';
import { RootState } from '../../../store';
import { IBulkField, IBulkFile, IBulkState } from './model';

export const getState = (state: RootState) => state.bulk;

export const getBasePath = createSelector([getState], (state): string => state.basePath);

export const getCurrentStep = createSelector([getState], (state: IBulkState) => state.currentStep);

export const getCustomFiles = createSelector([getState], (state: IBulkState): CustomFileLight[] | undefined =>
	state.files.map((file) => file.uploadedFile),
);

export const getFile = (state: IBulkState, fileId: IBulkFile['id']) => state.files.find((file) => file.id === fileId);

export const getFiles = createSelector([getState], (state: IBulkState): IBulkFile[] => state.files);

export const getFields = createSelector([getState], (state: IBulkState): IBulkField[] => state.fields);

export const getFieldsForFile = createSelector(
	[getState, (state: IBulkState, fileId: IBulkFile['id']) => fileId],
	(state: IBulkState, fileId: IBulkFile['id']) => {
		const file = state.files.find((file) => file.id === fileId);
		return file?.metadata;
	},
);

export const getChangeIndividualFields = createSelector([getFields], (fields): IBulkField[] =>
	fields.filter((field) => field.changeIndividual),
);

export const getDefaultFields = createSelector([getFields], (fields): IBulkField[] =>
	fields.filter((field) => !field.changeIndividual),
);
