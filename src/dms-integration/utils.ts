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

		if (field.type === 'DateType') {
			delete item.format;
			item.oneOf = [{ format: 'date' }, { maxLength: 0 }];
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

		return item;
	});
}

export function convertDmsDynamicFormFieldsToBulkMetadataFields(fields: IDmsDynamicFormField[]): IBulkField[] {
	return fields.map((field) => ({
		id: `${field.id}`,
		label: field.placeholder,
		value: field.userValue ?? field.defaultValue ?? '',
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
