import { CustomFileLight } from '../../../../types';

type IBulkFieldId = string;

export enum CurrentStep {
	Button,
	Upload,
	SelectFields,
	EditFields
}

export interface IBulkFile {
	id: string;
	metadata?: IBulkFileMetadata[];
	isMetadataValid?: boolean;
	uploadedFile: CustomFileLight;
}

export interface IBulkFileMetadata {
	id: IBulkFieldId;
	value: string | number | boolean | any[];
}

export interface IBulkField {
	id: IBulkFieldId;
	label: string;
	value: string | number | boolean | any[];
	changeIndividual: boolean;
	type: 'text' | 'date' | 'select' | 'multi-select' | 'checkbox';
	required?: boolean;
	values?: any[];
}

export interface IBulkState {
	currentStep: CurrentStep;
	files: IBulkFile[];
	fields: IBulkField[];
	selectedFileId?: IBulkFieldId;
}

export interface IFieldData {
	[key: string]: any;
}
