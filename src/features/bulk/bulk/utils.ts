import { MetadataProperty } from "../../../types";
import { IBulkField, IDmsDynamicFormField } from "./store/model";

function convertStringToKey(string: string): string {
	return string.toLowerCase().replace(' ', '_')
}

export function convertDmsDynamicFormFieldsToMetadataProperty(fields: IDmsDynamicFormField[]): MetadataProperty[] {
	return fields.map(field => {
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

		return item
	});
}

export function convertDmsDynamicFormFieldsToBulkMetadataFields(fields: IDmsDynamicFormField[]): IBulkField[] {
	return fields.map(field => {
		const item: IBulkField = {
			id: convertStringToKey(field.placeholder),
			label: field.placeholder,
			value: field.userValue,
			changeIndividual: false
		}
		return item
	});
}

export function convertBulkMetadataFieldToMetadataProperties(fields: IBulkField[]): MetadataProperty[] {
	return fields.map(field => {
		const item: MetadataProperty = {
			key: convertStringToKey(field.id),
			scope: 'string',
			type: 'string',
			label: field.label,
			'bmi-isNotEmpty': false,
			'bmi-errorMessage': '',
		}
		return item;
	});
}
