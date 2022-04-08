import { CustomFileLight } from '../../../../types';
import { IBulkField, IBulkFile, IBulkState } from '../model';

const customFile1: CustomFileLight = {
	tmpId: 1,
	type: 'application/pdf',
	name: 'custom file 1',
	size: 20000,
};

const customFile2: CustomFileLight = {
	tmpId: 1,
	type: 'application/pdf',
	name: 'custom file 1',
	size: 20000,
};

export const fields: IBulkField[] = [
	{
		id: '1',
		label: 'Field 1',
		value: 'Field 1 Value',
		changeIndividual: false,
	},
	{
		id: '2',
		label: 'Field 2',
		value: 'Field 2 Value',
		changeIndividual: true,
	},
	{
		id: '3',
		label: 'Field 3',
		value: 'Field 3 Value',
		changeIndividual: false,
	}
]

export const files: IBulkFile[] = [
	{
		id: '1',
		url: 'file-1-url',
		uploadedFile: customFile1,
	},
	{
		id: '2',
		url: 'file-2-url',
		uploadedFile: customFile2,
	},
]

export const state: IBulkState = {
	currentStep: 0,
	fields,
	files,
};
