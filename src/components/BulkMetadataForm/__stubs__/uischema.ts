import { fields } from './schema';

export const uischema = {
	type: 'Group',
	elements: fields.map(({ key, scope, label }): any => ({
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
