import { CustomJsonSchema } from '../../../../types';

export const schema: CustomJsonSchema = {
	type: 'object',
	properties: {
		documentDescription: {
			type: 'string',
			'bmi-isNotEmpty': true,
			errorMessage: {
				'bmi-isNotEmpty': 'Dit is een verplicht veld',
			},
		},
		dummyDate: {
			type: 'string',
			format: 'date',
			errorMessage: {
				format: 'Dit is een verplicht veld',
			},
		},
	},
	additionalProperties: false,
	required: ['documentDescription', 'dummyDate'],
};
