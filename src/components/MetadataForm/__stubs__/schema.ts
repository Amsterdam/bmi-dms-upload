import { CustomJsonSchema } from '../../../types';

export const schema: CustomJsonSchema = {
	type: 'object',
	properties: {
		textField: {
			type: 'string',
			'bmi-isNotEmpty': true,
			errorMessage: {
				'bmi-isNotEmpty': 'Dit is een verplicht veld',
			},
		},
		documentDescription: {
			type: 'string',
			oneOf: [
				'Archeologisch (voor)onderzoek',
				'Archiefonderzoek',
				'Bomeninventarisatie en –onderzoek',
				'Bouwkundig onderzoek',
				'Flora- en faunaonderzoek',
				'(Geo)hydrologisch onderzoek',
				'Geotechnisch onderzoek',
				'Materiaalonderzoek',
				'Milieukundig onderzoek',
				'Onderzoek gevaarlijke stoffen',
				'Toets Constructieve Veiligheid',
				'Milieutechnisch onderzoek',
			].map((option) => ({
				const: option,
				title: option,
			})),
			customFormat: 'creatable',
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
	required: ['textField', 'documentDescription', 'dummyDate'],
};
