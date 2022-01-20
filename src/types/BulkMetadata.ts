import { CustomFile } from '@amsterdam/bmi-component-library';

export interface IBulkMetadataFile {
	uploadedFile: CustomFile
	metadata?: IBulkMetadataField;
}

export interface IBulkMetadataField {
	id: string;
	label: string;
	value: string | number | boolean;
	changeIndividual: boolean;
}

export interface IBulkMetadataState {
	currentStep: 'upload' | 'selectFields' | 'editFile'
	files: IBulkMetadataFile[];
	fields: IBulkMetadataField[];
	selectedFileId: string | null;
}
