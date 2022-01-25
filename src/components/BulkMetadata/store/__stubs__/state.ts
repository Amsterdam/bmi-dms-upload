import { CustomFile } from '@amsterdam/bmi-component-library';
import { IBulkMetadataField, IBulkMetadataFile, IBulkMetadataState } from '../model'

export const customFileA = {
	tmpId: 1,
	progress: 33,
	type: 'application/pdf',
	name: 'Untitled #1',
	lastModified: 0,
	size: 10000,
} as CustomFile;

export const customFileB = {
	tmpId: 1,
	progress: 0,
	type: 'application/pdf',
	name: 'Untitled #2',
	lastModified: 0,
	size: 20000,
} as CustomFile;


export const customFiles: CustomFile[] = [
	customFileA,
	customFileB
]

export const fieldDefault: IBulkMetadataField = {
	id: 'name',
	label: 'Label',
	value: 'foo',
	changeIndividual: false
}

export const fieldChangeIndividual: IBulkMetadataField = {
	id: 'description',
	label: 'Omschrijving',
	value: '',
	changeIndividual: true
}

export const fields: IBulkMetadataField[] = [
	fieldDefault,
	fieldChangeIndividual,
]

export const fieldsDefault: IBulkMetadataField[] = [
	fieldDefault
]

export const fieldsChangeIndividual: IBulkMetadataField[] = [
	fieldChangeIndividual
]

export const files: IBulkMetadataFile[] = [
	{
		uploadedFile: customFileA,
	},
	{
		uploadedFile: customFileB,
	}
]

export const stateWithFiles: IBulkMetadataState = {
	currentStep: 'upload',
	fields: [],
	files: files,
}

export const stateWithFields: IBulkMetadataState = {
	currentStep: 'upload',
	fields,
	files: [],
}

export const stateWithFilesAndMetadata: IBulkMetadataState = {
	currentStep: 'upload',
	fields,
	files: [
		{
			uploadedFile: customFileA,
			metadata: fieldDefault
		},
		{
			uploadedFile: customFileB,
			metadata: fieldChangeIndividual
		},
	],
}
