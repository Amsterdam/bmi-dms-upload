import { MetadataProperty } from '../types';
import { IDmsDynamicFormField } from './types';
import { IBulkField } from '../features/bulk/bulk/store/model';

function convertStringToKey(string: string): string {
	return string.toLowerCase().replace(' ', '_');
}

export function convertDmsDynamicFormFieldsToMetadataProperty(fields: IDmsDynamicFormField[]): MetadataProperty[] {
	return fields.map((field) => {
		const item: MetadataProperty = {
			key: convertStringToKey(field.placeholder),
			scope: 'string',
			type: 'string',
			label: field.placeholder,
		};

		if (field.required) {
			item['bmi-isNotEmpty'] = field.required;
		}

		// @todo: is there an error string from DMS?
		// if (field.error.message) {
		// 	item['bmi-errorMessage'] = field.error.message;
		// }

		if (field.type === 'DateType') {
			item.format = 'date';
		}

		if (field.type === 'ChoiceType') {
			item.oneOf = field.options.map((fieldOption) => ({
				const: fieldOption,
				title: fieldOption,
			}));

			item.oneOf.unshift({
				const: '',
				title: 'No Value',
			})
			item.customFormat = 'creatable';
		}

		return item;
	});
}

export function convertDmsDynamicFormFieldsToBulkMetadataFields(fields: IDmsDynamicFormField[]): IBulkField[] {
	return fields.map((field) => ({
		id: convertStringToKey(field.placeholder),
		label: field.placeholder,
		value: field.userValue ?? '',
		changeIndividual: false,
		type: convertDmsTypeToBulkFieldType(field.type),
		values: field.options,
		required: field.required,
	}));
}

const convertDmsTypeToBulkFieldType = (type: string): IBulkField['type'] => {
	switch (type) {
		case 'ChoiceType':
			return 'select';
		case 'CheckboxType':
			return 'checkbox';
		case 'DateType':
			return 'date';
		case 'TextType':
		default:
			return 'text';
	}
};
