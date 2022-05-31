import { MetadataProperty } from '../types';
import { IDmsDynamicFormField } from './types';
import { IBulkField } from '../features/bulk/bulk/store/model';

export function convertDmsDynamicFormFieldsToMetadataProperty(fields: IDmsDynamicFormField[]): MetadataProperty[] {
	return fields.map((field) => {
		const item: MetadataProperty = {
			key: `${field.id}`,
			scope: 'string',
			type: 'string',
			label: field.placeholder,
		};

		if (field.required) {
			item['bmi-isNotEmpty'] = field.required;
		}

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
			});
			item.customFormat = 'creatable';
		}

		if (field.type === 'MultipleChoiceType') {
			item.type = 'array';
			item.uniqueItems = true;
			item.minItems = field.required ? 1 : 0;
			item.items = {
				type: 'string',
				enum: field.options,
			};
			item.customFormat = 'multi-creatable';

			if (field.defaultValue) {
				item.default = convertArrayString(field.defaultValue);
			}
		}

		return item;
	});
}

function convertArrayString(arrayString: string): string[] {
	return arrayString.replace('[', '').replace(']', '').split(',');
}

export function convertDmsDynamicFormFieldsToBulkMetadataFields(fields: IDmsDynamicFormField[]): IBulkField[] {
	return fields.map((field) => {
		const defaultValue = field.userValue ?? field.defaultValue ?? '';
		let newValue;

		if (convertDmsTypeToBulkFieldType(field.type) === 'multi-select') {
			newValue = convertArrayString(defaultValue);
		} else {
			newValue = defaultValue;
		}

		return {
			id: `${field.id}`,
			label: field.placeholder,
			value: newValue,
			changeIndividual: false,
			type: convertDmsTypeToBulkFieldType(field.type),
			values: field.options,
			required: field.required,
		};
	});
}

const convertDmsTypeToBulkFieldType = (type: string): IBulkField['type'] => {
	switch (type) {
		case 'ChoiceType':
			return 'select';
		case 'MultipleChoiceType':
			return 'multi-select';
		case 'CheckboxType':
			return 'checkbox';
		case 'DateType':
			return 'date';
		case 'TextType':
		default:
			return 'text';
	}
};
