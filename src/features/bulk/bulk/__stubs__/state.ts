import { CustomFileLight } from '../../../../types';
import {
	IBulkField,
	IBulkFile,
	IBulkFileMetadata,
	IBulkState,
} from '../model';

export function makeFile(
	id: string,
	uploadedFile: CustomFileLight,
	metadata?: IBulkFileMetadata[],
): IBulkFile {
	const obj = {
		id,
		url: 'some-url',
		uploadedFile,
	};

	if (!metadata) return obj;

	return {
		...obj,
		metadata,
	};
}

export function makeCustomFile(id: number, title: string, filetype?: string): CustomFileLight {
	return {
		tmpId: id,
		type: filetype ?? 'application/pdf',
		name: `${title}`,
		size: 20000,
	};
}

export function makeField(id: string, changeIndividual: boolean): IBulkField {
	return {
		id: `some-id-${id}`,
		label: `some-label ${id}`,
		value: `some-value ${id}`,
		changeIndividual: changeIndividual,
	};
}

export function makeFields(fields: [string, boolean][]): IBulkField[] {
	return fields.map((f) => makeField(f[0], f[1]));
}

export const customFileA = makeCustomFile(1, 'A');
export const customFileB = makeCustomFile(2, 'B');

export const customFiles: CustomFileLight[] = [customFileA, customFileB];

export const fieldsDefault: IBulkField[] = makeFields([
	['1', false],
	['3', false],
]);
export const fieldsChangeIndividual: IBulkField[] = makeFields([['2', true]]);
export const fields: IBulkField[] = [...fieldsDefault, ...fieldsChangeIndividual];
export const field: IBulkField = makeField("1", true);

export const files: IBulkFile[] = [
	makeFile('1', customFileA, [{ id: '1', value: 'some-value-1' }]),
	makeFile('2', customFileB, [{ id: '2', value: 'some-value-2' }]),
];

export const stateWithFiles: IBulkState = {
	currentStep: 0,
	fields: [],
	files,
};

export const stateWithFilesRemoved: IBulkState = {
	currentStep: 0,
	fields: [],
	files: [
		files[1]
	]
};

export const stateWithFields: IBulkState = {
	currentStep: 0,
	fields,
	files: [],
};

export const stateWithFieldsUpdated: IBulkState = {
	currentStep: 0,
	fields: [
		field,
		fields[1],
		fields[2]
	],
	files: [],
};

export const state: IBulkState = {
	currentStep: 0,
	fields,
	files,
};
