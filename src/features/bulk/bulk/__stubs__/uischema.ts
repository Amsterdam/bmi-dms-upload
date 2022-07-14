import { RowLayoutSchema } from '../../../../types';

export const uischema: RowLayoutSchema = {
	type: 'RowLayout',
	elements: [
		{
			type: 'Control',
			label: 'Documentomschrijving',
			scope: '#/properties/documentDescription',
		},
		{
			type: 'Control',
			label: 'Dummy date',
			scope: '#/properties/dummyDate',
		},
	],
};
