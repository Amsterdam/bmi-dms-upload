import { CustomJsonSchema } from '../../../../../types';

export const schema: CustomJsonSchema = {
	type: 'object',
	properties: {
		documentDescription: {
			type: 'object',
			properties: {
				name: {
					type: 'string'
				},
				value: {
					type: 'string',
					format: 'string',
					errorMessage: {
						format: 'invalid',
						'bmi-isNotEmpty': 'Dit is een verplicht veld',
					}
				},
				changeIndividual: {
					type: 'boolean'
				}
			}
		},
		dummyDate: {
			type: 'object',
			properties: {
				name: {
					type: 'string'
				},
				value: {
					type: 'string',
					format: 'date',
					errorMessage: {
						format: 'invalid',
						'bmi-isNotEmpty': 'Dit is een verplicht veld',
					}
				},
				changeIndividual: {
					type: 'boolean'
				}
			}
		}
	},
	additionalProperties: false,
	required: ['documentDescription', 'dummyDate'],
};
