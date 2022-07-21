import { CustomFileLight } from '../../../../types';

type IBulkFieldId = string;

export enum CurrentStep {
	Button,
	Upload,
	SelectFields,
	EditFields,
}

export type TBulkFieldType = 'text' | 'date' | 'select' | 'multi-select' | 'checkbox';

export interface IBulkFile {
	id: string;
	metadata?: IBulkFileMetadata[];
	isMetadataValid?: boolean;
	uploadedFile: CustomFileLight;
}

export interface IBulkFileMetadata {
	id: IBulkFieldId;
	type: TBulkFieldType;
	value: string | number | boolean | any[];
}

export interface IBulkField {
	id: IBulkFieldId;
	label: string;
	value: string | number | boolean | any[];
	changeIndividual: boolean;
	type: TBulkFieldType;
	required?: boolean;
	values?: any[];
}

export interface IBulkState {
	basePath: string;
	currentStep: CurrentStep;
	files: IBulkFile[];
	fields: IBulkField[];
	selectedFileId?: IBulkFieldId;
}

export interface IFieldData {
	[key: string]: any;
}
