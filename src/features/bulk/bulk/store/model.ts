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
	url: string;
	uploadedFile: CustomFileLight;
	metadata?: IBulkFileMetadata[];
}

export interface IBulkFileMetadata {
	id: IBulkFieldId;
	value: string | number | boolean;
}

// export interface IBulkFileMetadata extends Omit<IBulkField, 'changeIndividual'> {
// }

export interface IBulkField {
	id: IBulkFieldId;
	label: string;
	value: string | number | boolean;
	changeIndividual: boolean;
	type: 'text' | 'date' | 'select' | 'checkbox';
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