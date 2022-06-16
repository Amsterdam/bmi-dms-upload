import { CustomJsonSchema } from '../../../../types';

export const options = [
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
];

export const schema: CustomJsonSchema = {
	type: 'object',
	properties: {
		documentDescription: {
			type: 'array',
			items: {
				type: 'string',
				enum: options,
			},
			customFormat: 'creatable-array',
			'bmi-isNotEmpty': true,
			errorMessage: {
				'bmi-isNotEmpty': 'Dit is een verplicht veld',
			},
		},
	},
	additionalProperties: false,
	required: ['documentDescription'],
};
