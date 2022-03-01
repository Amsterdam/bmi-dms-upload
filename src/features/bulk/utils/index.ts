import { CustomJsonSchema, MetadataProperty } from "../../../types";
import { IBulkMetadataField } from "../store/model";

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

function convertStringToKey(string: string): string {
	return string.toLowerCase().replace(' ', '_')
}

export function convertDmsDynamicFormFieldsToMetadataProperty(dynamicFormFields: IDmsDynamicFormField[]): MetadataProperty[] {
	const list: MetadataProperty[] = [];

	dynamicFormFields.forEach(field => {
		list.push({
			key: convertStringToKey(field.placeholder),
			scope: 'string',
			type: 'string',
			label: field.placeholder,
			'bmi-isNotEmpty': field.required,
			'bmi-errorMessage': '',
		})
	});

	return list;
}

export function convertDmsDynamicFormFieldsToBulkMetadataFields(dynamicFormFields: IDmsDynamicFormField[]): IBulkMetadataField[] {
	const list: IBulkMetadataField[] = [];

	dynamicFormFields.forEach(field => {
		list.push({
			id: convertStringToKey(field.placeholder),
			label: field.placeholder,
			value: '',
			changeIndividual: false
		})
	});

	return list;
}

export function convertBulkMetadataFieldToMetadataProperties(dynamicFormFields: IBulkMetadataField[]): MetadataProperty[] {
	const list: MetadataProperty[] = [];

	dynamicFormFields.forEach(field => {
		list.push({
			key: convertStringToKey(field.id),
			scope: 'string',
			type: 'string',
			label: field.label,
			'bmi-isNotEmpty': false,
			'bmi-errorMessage': '',
		})
	});

	return list;
}
