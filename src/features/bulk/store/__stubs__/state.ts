import { CustomFile } from '@amsterdam/bmi-component-library';
import { IBulkMetadataField, IBulkMetadataFile, IBulkMetadataFileMetadata, IBulkMetadataState } from '../model'

function makeFile(id: string, uploadedFile: CustomFile, metadata: IBulkMetadataFileMetadata[]): IBulkMetadataFile {
	return {
		id,
		url: 'some-url',
		uploadedFile,
		metadata
	}
}
function makeCustomFile(id: number, title: string, filetype?: string) {
	return {
		tmpId: id,
		progress: 0,
		type: filetype ?? 'application/pdf',
		name: `some-title ${title}`,
		lastModified: 0,
		size: 20000,
	} as CustomFile
}

function makeField(id: string, changeIndividual: boolean): IBulkMetadataField {
	return {
		id: id,
		label: `some-label ${id}`,
		value: `some-value ${id}`,
		changeIndividual: changeIndividual
	}
}
function makeFields(fields: [string, boolean][]): IBulkMetadataField[] {
	return fields.map(f => makeField(f[0], f[1]));
}

export const customFileA = makeCustomFile(1, 'A')
export const customFileB = makeCustomFile(2, 'B')

export const customFiles: CustomFile[] = [
	customFileA,
	customFileB
]

// export const fieldDefault: IBulkMetadataField = makeField('name', false)
// export const fieldChangeIndividual: IBulkMetadataField = makeField('description', true)


export const fieldsDefault: IBulkMetadataField[] = makeFields([['1', false], ['3', false]])
export const fieldsChangeIndividual: IBulkMetadataField[] = makeFields([['2', true]])
export const fields: IBulkMetadataField[] = [
	...fieldsDefault,
	...fieldsChangeIndividual
]

export const files: IBulkMetadataFile[] = [
	makeFile('1', customFileA, [{ id: '1', value: 'some-value-1'}]),
	makeFile('2', customFileB, [{ id: '2', value: 'some-value-2'}]),
]

export const stateWithFiles: IBulkMetadataState = {
	currentStep: 'upload',
	fields: [],
	files,
}

export const stateWithFields: IBulkMetadataState = {
	currentStep: 'upload',
	fields,
	files: [],
}

export const state: IBulkMetadataState = {
	currentStep: 'upload',
	fields,
	files,
}
