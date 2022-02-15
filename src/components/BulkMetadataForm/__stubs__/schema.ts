import { CustomJsonSchema, MetadataProperties as fields } from '../../../types';

export const schema: CustomJsonSchema = {
	type: 'object',
	properties: fields.reduce(
		(acc, { key, scope, type, format, 'bmi-isNotEmpty': isNotEmpty, 'bmi-errorMessage': customErrorMessage }) => {
			acc[key] = {
				type: 'object',
				properties: {
					name: {
						type: 'string',
					},
					value: {
						type,
						format,
						'bmi-isNotEmpty': isNotEmpty,
						errorMessage: {
							'bmi-isNotEmpty': customErrorMessage ?? 'Dit is een verplicht veld',
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

console.log(schema);
