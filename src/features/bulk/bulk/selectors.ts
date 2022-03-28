import { createSelector } from '@reduxjs/toolkit';
import { CustomFileLight } from '../../../types';
import { RootState } from '../../store';
import { CurrentStep, IBulkField, IBulkFile, IBulkState } from './model';

export const getState = (state: RootState) => state.bulk;

export const getCurrentStepFromStore = createSelector(
	[getState],
	(state: IBulkState) => state.currentStep
);

export const getCustomFilesFromStore = createSelector(
	[getState],
	(state: IBulkState): CustomFileLight[] | undefined => state.files.map(file => file.uploadedFile),
);

export const getFileFromStore = (state: IBulkState, fileId: IBulkFile['id']) =>
	state.files.find((file) => file.id === fileId);

export const getFilesFromStore = createSelector(
	[getState],
	(state: IBulkState): IBulkFile[] | undefined => state.files,
);

export const getFieldsFromStore = createSelector(
	[getState],
	(state: IBulkState): IBulkField[] | undefined => state.fields,
);

export const getCurrentStep = createSelector(
	[getState],
	(state: IBulkState): CurrentStep => state.currentStep
)

export const getChangeIndividualFieldsFromStore = createSelector([getFieldsFromStore], (fields):
	| IBulkField[]
	| undefined => fields?.filter((field) => field.changeIndividual));

export const getDefaultFieldsFromStore = createSelector([getFieldsFromStore], (fields):
	| IBulkField[]
	| undefined => fields?.filter((field) => !field.changeIndividual));

export const getFieldsForFile = createSelector(
	[getFileFromStore, getFieldsFromStore],
	(fileFromStore, fieldsFromStore) => {
		return [...(fileFromStore?.metadata ?? []), ...(fieldsFromStore ?? [])];
	},
);
