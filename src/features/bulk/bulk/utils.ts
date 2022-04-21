import { MetadataGenericType, MetadataProperty } from '../../../types';
import { IBulkField, IFieldData } from './store/model';

function convertStringToKey(string: string): string {
	return string.toLowerCase().replace(' ', '_');
}

export function convertBulkFieldsToMetadataProperties(fields: IBulkField[]): MetadataProperty[] {
	return fields.map((field) => {
		const item: MetadataProperty = {
			key: convertStringToKey(field.id),
			scope: 'string',
			type: 'string',
			format: field.type,
			label: field.label,
			'bmi-isNotEmpty': field.changeIndividual,
			'bmi-errorMessage': undefined,
		};

		if (field.type === 'select' && field.values) {
			item.oneOf = field.values.map((fieldOption) => ({
				const: fieldOption,
				title: fieldOption,
			}));
			item.customFormat = 'creatable';
		}

		return item;
	});
}

export function convertBulkFieldsToMetadataGenericTypes(fields: IBulkField[] | undefined): MetadataGenericType {
	if (!fields) return {};

	const newFields: MetadataGenericType = {};

	fields.forEach((field) => {
		newFields[field.id] = {
			id: field.id,
			label: field.label,
			value: field.value,
			changeIndividual: field.changeIndividual,
		};
	});

	return newFields;
}

export const reduceFieldData = (fieldData: IFieldData, stateFields: IBulkField[]) => {
	return stateFields.reduce((fields: IBulkField[], currentField: IBulkField) => {
		const fieldDataKey = Object.keys(fieldData).find((key) => key === currentField.id);
		const fieldDataItem = fieldDataKey && fieldData[fieldDataKey];

		let updatedField = currentField;

		if (fieldDataItem) {
			updatedField = {
				...updatedField,
				...fieldDataItem,
			};
		}

		return [...fields, updatedField];
	}, []);
};
