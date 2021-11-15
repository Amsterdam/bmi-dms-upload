import { ErrorObject } from 'ajv';

export const error: ErrorObject = {
	instancePath: '',
	schemaPath: '#/required',
	keyword: 'required',
	params: {
		missingProperty: 'dummyDate',
	},
	message: "must have required property 'dummyDate'",
	schema: ['documentDescription', 'dummyDate'],
	parentSchema: {
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
	},
	data: {
		documentDescription: '',
	},
};
