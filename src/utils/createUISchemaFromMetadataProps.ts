import { MetadataProperty, OneOfDateType } from '../types';

export default function createUISchemaFromMetadataProps(metadataProperties: MetadataProperty[]) {
	console.log('metadataProperties:: ', metadataProperties);
	return {
		type: 'Group',
		elements: metadataProperties.map(({ key, scope, label, oneOf }): any => ({
			type: 'HorizontalLayout',
			elements: [
				{
					type: 'Control',
					label,
					scope: `#/properties/${key}/properties/value`,
					options: {
						// @ts-ignore: tech debt, should be revised
						format: oneOf?.find((oo: OneOfDateType) => oo?.format)?.format,
					},
				},
				{
					type: 'Control',
					label: false,
					scope: `#/properties/${key}/properties/changeIndividual`,
				},
			],
		})),
	};
}

// This creates an UISchema what outputs a form used for displaying the form in IndividualFieldsForm
export function createUISchemaIndividualFieldsFromMetadataProps(metadataProperties: MetadataProperty[]) {
	return {
		type: 'VerticalLayout',
		elements: metadataProperties.map(({ key, scope, label }): any => ({
			type: 'HorizontalLayout',
			elements: [
				{
					type: 'Control',
					label,
					scope: `#/properties/${key}/properties/value`,
				},
			],
		})),
	};
}
