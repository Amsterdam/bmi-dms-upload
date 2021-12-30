import { RowLayoutSchema } from '../../../../types';

export const uischema: RowLayoutSchema = {
	type: 'RowLayout',
	elements: [
		{
			type: 'Control',
			label: 'Documentomschrijving',
			scope: '#/properties/documentDescription',
		},
	],
};
