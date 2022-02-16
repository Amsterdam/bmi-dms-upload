import {
	BulkCustomFile,
	IBulkMetadataField,
	IBulkMetadataFile,
	IBulkMetadataFileMetadata,
	IBulkMetadataState,
} from '../model';

export function makeFile(
	id: string,
	uploadedFile: BulkCustomFile,
	metadata?: IBulkMetadataFileMetadata[],
): IBulkMetadataFile {
	const obj = {
		id,
		url: 'some-url',
		uploadedFile,
	};

	return metadata
		? {
				...obj,
				metadata,
		  }
		: obj;
}

export function makeCustomFile(id: number, title: string, filetype?: string): BulkCustomFile {
	return {
		tmpId: id,
		type: filetype ?? 'application/pdf',
		name: `${title}`,
		size: 20000,
	};
}

export function makeField(id: string, changeIndividual: boolean): IBulkMetadataField {
	return {
		id: id,
		label: `some-label ${id}`,
		value: `some-value ${id}`,
		changeIndividual: changeIndividual,
	};
}

export function makeFields(fields: [string, boolean][]): IBulkMetadataField[] {
	return fields.map((f) => makeField(f[0], f[1]));
}

export const customFileA = makeCustomFile(1, 'A');
export const customFileB = makeCustomFile(2, 'B');

export const customFiles: BulkCustomFile[] = [customFileA, customFileB];

export const fieldsDefault: IBulkMetadataField[] = makeFields([
	['1', false],
	['3', false],
]);
export const fieldsChangeIndividual: IBulkMetadataField[] = makeFields([['2', true]]);
export const fields: IBulkMetadataField[] = [...fieldsDefault, ...fieldsChangeIndividual];

export const files: IBulkMetadataFile[] = [
	makeFile('1', customFileA, [{ id: '1', value: 'some-value-1' }]),
	makeFile('2', customFileB, [{ id: '2', value: 'some-value-2' }]),
];

export const stateWithFiles: IBulkMetadataState = {
	currentStep: 0,
	fields: [],
	files,
};

export const stateWithFields: IBulkMetadataState = {
	currentStep: 0,
	fields,
	files: [],
};

export const state: IBulkMetadataState = {
	currentStep: 0,
	fields,
	files,
};
