import { CustomFile } from '@amsterdam/bmi-component-library';

type IBulkMetadataFieldId = string;

export interface IBulkMetadataFile {
	id: string;
	url: string;
	uploadedFile: CustomFile;
	metadata?: IBulkMetadataFileMetadata[];
}

export interface IBulkMetadataFileMetadata {
	id: IBulkMetadataFieldId;
	value: string | number | boolean;
}

export interface IBulkMetadataField {
	id: IBulkMetadataFieldId;
	label: string;
	value: string | number | boolean;
	changeIndividual: boolean;
}

export interface IBulkMetadataState {
	currentStep: 'upload' | 'selectFields' | 'editFile'
	files: IBulkMetadataFile[];
	fields: IBulkMetadataField[];
	selectedFileId?: IBulkMetadataFieldId;
}
