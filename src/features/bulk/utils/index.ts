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

export function convertDmsDynamicFormFieldsToMetadataProperty(fields: IDmsDynamicFormField[]): MetadataProperty[] {
	const list: MetadataProperty[] = [];

	fields.forEach(field => {
		const item: MetadataProperty = {
			key: convertStringToKey(field.placeholder),
			scope: 'string',
			type: 'string',
			label: field.placeholder,
			'bmi-isNotEmpty': field.required,
			'bmi-errorMessage': '',
		}

		if (field.type === 'ChoiceType') {
			item.oneOf = field.options.map(fieldOption => ({
				const: fieldOption,
				title: fieldOption
			}))
			item.customFormat = 'creatable';
		}

		list.push(item)
	});

	return list;
}

export function convertDmsDynamicFormFieldsToBulkMetadataFields(fields: IDmsDynamicFormField[]): IBulkMetadataField[] {
	const list: IBulkMetadataField[] = [];

	fields.forEach(field => {
		const item: IBulkMetadataField = {
			id: convertStringToKey(field.placeholder),
			label: field.placeholder,
			value: field.userValue,
			changeIndividual: false
		}
		list.push(item)
	});

	return list;
}

export function convertBulkMetadataFieldToMetadataProperties(fields: IBulkMetadataField[]): MetadataProperty[] {
	const list: MetadataProperty[] = [];

	fields.forEach(field => {
		const item: MetadataProperty = {
			key: convertStringToKey(field.id),
			scope: 'string',
			type: 'string',
			label: field.label,
			'bmi-isNotEmpty': false,
			'bmi-errorMessage': '',
		}
		list.push(item)
	});

	return list;
}
