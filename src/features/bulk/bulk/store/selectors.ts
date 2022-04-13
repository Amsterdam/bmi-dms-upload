import { createSelector } from '@reduxjs/toolkit';
import { CustomFileLight } from '../../../../types';
import { RootState } from '../../../store';
import { IBulkField, IBulkFile, IBulkState } from './model';

export const getState = (state: RootState) => state.bulk;

export const getCurrentStep = createSelector(
	[getState],
	(state: IBulkState) => state.currentStep
);

export const getCustomFiles = createSelector(
	[getState],
	(state: IBulkState): CustomFileLight[] | undefined => state.files.map(file => file.uploadedFile),
);

export const getFile = (state: IBulkState, fileId: IBulkFile['id']) =>
	state.files.find((file) => file.id === fileId);

export const getFiles = createSelector(
	[getState],
	(state: IBulkState): IBulkFile[] | undefined => state.files,
);

export const getFields = createSelector(
	[getState],
	(state: IBulkState): IBulkField[] | undefined => state.fields,
);

export const getChangeIndividualFields = createSelector([getFields], (fields):
	| IBulkField[]
	| undefined => fields?.filter((field) => field.changeIndividual));

export const getDefaultFields = createSelector([getFields], (fields):
	| IBulkField[]
	| undefined => fields?.filter((field) => !field.changeIndividual));

export const getFieldsForFile = createSelector(
	[getFile, getFields],
	(file, fields) => {
		return [...(file?.metadata ?? []), ...(fields ?? [])];
	},
);
