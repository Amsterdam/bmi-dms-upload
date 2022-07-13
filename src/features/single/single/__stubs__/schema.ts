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
				format: 'Vul een correcte datum in',
			},
		},
	},
	additionalProperties: false,
	required: ['documentDescription', 'dummyDate'],
};
