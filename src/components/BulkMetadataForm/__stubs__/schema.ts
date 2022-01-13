import { CustomJsonSchema } from '../../../types';

type MetadataProperty = {
	key: string;
	scope: string;
	type: 'string' | 'date';
	label: string;
	'bmi-isNotEmpty'?: boolean;
	'bmi-errorMessage'?: string;
};

export const fields: MetadataProperty[] = [
	{
		key: 'year',
		scope: 'string',
		type: 'string',
		label: 'Jaar',
		'bmi-isNotEmpty': true,
		'bmi-errorMessage': 'Dit is een verplicht veld',
	},
	{
		key: 'documentDescription',
		scope: 'string',
		type: 'string',
		label: 'Documentomschrijving',
	},
];

export const schema: CustomJsonSchema = {
	type: 'object',
	properties: fields.reduce(
		(acc, { key, scope, type, 'bmi-isNotEmpty': isNotEmpty, 'bmi-errorMessage': customErrorMessage }) => {
			acc[key] = {
				type: 'object',
				properties: {
					name: {
						type: 'string',
					},
					value: {
						type,
						'bmi-isNotEmpty': isNotEmpty,
						errorMessage: {
							'bmi-isNotEmpty': customErrorMessage ?? 'Default Error',
						},
					},
					changeIndividual: {
						type: 'boolean',
					},
				},
			};
			return acc;
		},
		{} as { [key: string]: CustomJsonSchema },
	),
};
