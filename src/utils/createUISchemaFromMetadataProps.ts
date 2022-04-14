import { MetadataProperty } from '../types';

export default function createUISchemaFromMetadataProps(metadataProperties: MetadataProperty[]) {
	return {
		type: 'Group',
		elements: metadataProperties.map(({ key, scope, label }): any => ({
			type: 'HorizontalLayout',
			elements: [
				{
					type: 'Control',
					label,
					scope: `#/properties/${key}/properties/value`,
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

export function createUISchemaLightFromMetadataProps(metadataProperties: MetadataProperty[]) {
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
