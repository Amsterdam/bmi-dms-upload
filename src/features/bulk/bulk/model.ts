import { CustomFileLight } from '../../../types';

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

export interface IBulkField {
	id: IBulkFieldId;
	label: string;
	value: string | number | boolean;
	changeIndividual: boolean;
}

export interface IBulkState {
	currentStep: CurrentStep;
	files: IBulkFile[];
	fields: IBulkField[];
	selectedFileId?: IBulkFieldId;
}


// DMS Upload Session
export interface IDmsAsset {
	id: number
	name: string
	code: string
}

export interface IDmsDynamicFormField {
	id: number,
	placeholder: string,
	required: boolean,
	defaultValue: string,
	userValue: string,
	changeIndividual: boolean,
	type: string,
	options: any[]
}

export interface IDmsUploadSession {
	id: string
	finished: boolean
    dmsAsset: IDmsAsset
	dynamicFormFields: IDmsDynamicFormField[]
}
