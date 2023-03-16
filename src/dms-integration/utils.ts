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
			options: { format: undefined },
		};

		if (field.required) {
			item['bmi-isNotEmpty'] = field.required;
		}

		if (field.type === 'CheckboxType') {
			item.type = 'boolean';
		}

		if (field.type === 'DateType') {
			item.oneOf = [{ format: 'date' }, { maxLength: 0 }];
		}

		if (field.type === 'ChoiceType') {
			item.type = 'array';
			item.uniqueItems = true;
			item.items = {
				type: 'string',
				enum: field.options,
			};
			item.customFormat = 'creatable-array';

			if (field.defaultValue) {
				item.default = JSON.parse(`["${field.defaultValue}"]`);
			} else {
				item.default = [];
			}
		}

		if (field.type === 'MultipleChoiceType') {
			item.type = 'array';
			item.uniqueItems = true;
			item.items = {
				type: 'string',
				enum: field.options,
			};
			item.customFormat = 'multi-creatable';

			if (field.defaultValue) {
				item.default = JSON.parse(field.defaultValue);
			} else {
				item.default = [];
			}
		}

		if (field.type === 'DateYearType') {
			item['is-date-year'] = true;
		}

		return item;
	});
}

export function convertDmsDynamicFormFieldsToBulkMetadataFields(fields: IDmsDynamicFormField[]): IBulkField[] {
	return fields.map((field) => {
		const defaultValue = field.userValue ?? field.defaultValue ?? '';
		let newValue: IBulkField['value'] = defaultValue;

		if (convertDmsTypeToBulkFieldType(field.type) === 'select') {
			newValue = defaultValue ? JSON.parse(`["${defaultValue}"]`) : [];
		}
		if (convertDmsTypeToBulkFieldType(field.type) === 'multi-select') {
			newValue = defaultValue ? JSON.parse(defaultValue) : [];
		}

		if (convertDmsTypeToBulkFieldType(field.type) === 'checkbox') {
			newValue = defaultValue ? JSON.parse(defaultValue) : false;
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
		case 'DateYearType':
			return 'year';
		case 'TextType':
		default:
			return 'text';
	}
};
