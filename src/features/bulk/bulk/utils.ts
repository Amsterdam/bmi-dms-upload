import { MetadataGenericType, MetadataProperty } from '../../../types';
import { IBulkField, IBulkFileMetadata, IFieldData } from './store/model';

export function convertBulkFieldsToMetadataProperties(fields: IBulkField[]): MetadataProperty[] {
	return fields.map((field) => {
		const item: MetadataProperty = {
			key: field.id,
			scope: 'string',
			type: 'string',
			label: field.label,
			'bmi-errorMessage': undefined,
		};

		if (field.type === 'checkbox') {
			item.type = 'boolean';
		}

		if (field.type === 'date') {
			item.oneOf = [{ format: 'date' }, { maxLength: 0 }];
		}

		if (field.required) {
			item['bmi-isNotEmpty'] = field.required;
		}

		if (field.type === 'select' && field.values) {
			item.type = 'array';
			item.uniqueItems = true;
			item.items = {
				type: 'string',
				enum: field.values!,
			};
			item.customFormat = 'creatable-array';
		}

		if (field.type === 'multi-select') {
			item.type = 'array';
			item.uniqueItems = true;
			item.items = {
				type: 'string',
				enum: field.values!,
			};
			item.customFormat = 'multi-creatable';
		}

		if (field.type === 'year') {
			item['is-date-year'] = true;
		}

		return item;
	});
}

export function convertBulkFieldsToMetadataGenericTypes(fields: IBulkField[] | undefined): MetadataGenericType {
	if (!fields) return {};

	const newFields: MetadataGenericType = {};

	fields.forEach((field) => {
		newFields[field.id] = {
			value: field.value,
		};

		const newField = newFields[field.id] as MetadataGenericType;

		if (field.changeIndividual) {
			newField.changeIndividual = field.changeIndividual;
		}
	});

	return newFields;
}

export function convertBulkFieldsToBulkFileMetadata(fields: IBulkField[] | undefined): IBulkFileMetadata[] {
	if (!fields) return [];

	return fields.map((field) => ({
		id: field.id,
		value: field.value,
		type: field.type,
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
	if (!currentFields) return [];
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
					type: newField.type ?? currentField.type,
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
