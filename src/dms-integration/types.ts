export interface IDmsAsset {
	id: number;
	name: string;
	code: string;
}

export interface IDmsDynamicFormField {
	id: number;
	placeholder: string;
	required: boolean;
	defaultValue: string;
	userValue: string;
	changeIndividual: boolean;
	type: string;
	options: any[];
}

export interface IDmsUploadSession {
	id: string;
	finished: boolean;
	dmsAsset: IDmsAsset;
	dynamicFormFields: IDmsDynamicFormField[];
}
