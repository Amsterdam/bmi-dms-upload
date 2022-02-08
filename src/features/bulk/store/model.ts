import { CustomFile } from '@amsterdam/bmi-component-library';

type IBulkMetadataFieldId = string;

enum CurrentStep {
	'upload',
	'selectFields',
	'editFile',
}

export interface IBulkMetadataFile {
	id: string;
	url: string;
	uploadedFile: Pick<CustomFile, 'name' | 'size' | 'tmpId' | 'type'>;
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
	currentStep: CurrentStep;
	files: IBulkMetadataFile[];
	fields: IBulkMetadataField[];
	selectedFileId?: IBulkMetadataFieldId;
}
