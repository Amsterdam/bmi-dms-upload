import { CustomFileLight } from '../../../../types';
import { IBulkField, IBulkFile, IBulkState } from '../store/model';

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
		id: 'field-1',
		label: 'Field 1',
		value: 'Field 1 Value',
		changeIndividual: false,
		type: 'text'
	},
	{
		id: 'field-2',
		label: 'Field 2',
		value: 'Field 2 Value',
		changeIndividual: true,
		type: 'text'
	},
	{
		id: 'field-3',
		label: 'Field 3',
		value: 'Field 3 Value',
		changeIndividual: false,
		type: 'text'
	}
]

export const files: IBulkFile[] = [
	{
		id: '1',
		uploadedFile: customFile1,
		metadata: []
	},
	{
		id: '2',
		uploadedFile: customFile2,
		metadata: []
	},
]

export const state: IBulkState = {
	currentStep: 0,
	fields,
	files,
};
