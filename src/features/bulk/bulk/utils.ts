import { MetadataGenericType, MetadataProperty } from '../../../types';
import { IBulkField, IBulkFileMetadata, IFieldData } from './store/model';

function convertStringToKey(string: string): string {
	return string.toLowerCase().replace(' ', '_');
}

export function convertBulkFieldsToMetadataProperties(fields: IBulkField[]): MetadataProperty[] {
	return fields.map((field) => {
		const item: MetadataProperty = {
			key: convertStringToKey(field.id),
			scope: 'string',
			type: 'string',
			format: field.type === 'date' ? 'date' : undefined,
			label: field.label,
			'bmi-errorMessage': undefined,
		};

		if (field.required) {
			item['bmi-isNotEmpty'] = field.required
		}

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
			value: field.value
		};

		const newField = newFields[field.id] as MetadataGenericType;

		if (field.changeIndividual) {
			newField.changeIndividual = field.changeIndividual
		}
	});

	return newFields;
}

export function convertBulkFieldsToBulkFileMetadata(fields: IBulkField[] | undefined): IBulkFileMetadata[] {
	if (!fields) return [];

	return fields.map((field) => ({
		id: field.id,
		value: field.value,
	}));
}

export function convertBulkFileMetadataToMetadataGenericTypes(
	fields: IBulkFileMetadata[] | undefined,
): MetadataGenericType {
	if (!fields) return {};

	const newFields: MetadataGenericType = {};

	fields.forEach((field) => {
		newFields[field.id] = {
			id: field.id,
			value: field.value,
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

export const reduceMetadata = (
	currentFields: IBulkFileMetadata[],
	newFields?: IBulkFileMetadata[],
): IBulkFileMetadata[] => {
	if (!newFields) return currentFields;

	return currentFields.reduce((acc: IBulkFileMetadata[], currentField: IBulkFileMetadata) => {
		if (!newFields) return [...acc, currentField];
		const newField = newFields.find((field) => field.id === currentField.id);
		let updatedField = currentField;

		if (newField) {
			updatedField = {
				...updatedField,
				...{
					id: newField.id,
					value: newField.value,
				},
			};
		}

		return [...acc, updatedField];
	}, []);
};

// Returns if objects are identical
export const identicalObjects = (objA: { [key: string]: any }, objB: { [key: string]: any }): boolean => {
	return JSON.stringify(objA) === JSON.stringify(objB);
};
