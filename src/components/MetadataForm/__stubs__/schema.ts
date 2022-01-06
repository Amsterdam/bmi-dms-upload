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
				{
					const: '621faccb-7765-436d-aae6-e4ad4da3137d',
					title: 'Archeologisch (voor)onderzoek',
				},
				{
					const: '27125b77-64f6-4b3f-a480-154e3ae3520b',
					title: 'Archiefonderzoek',
				},
				{
					const: '4fc7103b-553d-4bdd-af68-80e74ee8562d',
					title: 'Bomeninventarisatie en –onderzoek',
				},
				{
					const: 'c135b8b2-6ccb-4742-b586-543d537e7a17',
					title: 'Bouwkundig onderzoek',
				},
				{
					const: '813c2e26-95bc-4b3a-94f9-8136305d2645',
					title: 'Flora- en faunaonderzoek',
				},
				{
					const: '4ee9f033-195d-423e-957f-11cf3d706de8',
					title: '(Geo)hydrologisch onderzoek',
				},
				{
					const: 'a23d2775-d6c1-4dc9-9599-e7bb0c744cbe',
					title: 'Geotechnisch onderzoek',
				},
				{
					const: 'db57faf2-ec39-49b1-ad4d-939df8c6ac80',
					title: 'Materiaalonderzoek',
				},
				{
					const: '47812dbe-849f-488a-a391-5424fb61726b',
					title: 'Milieukundig onderzoek',
				},
				{
					const: 'c03ff964-aaa9-4c75-9757-47c2c90584fd',
					title: 'Milieutechnisch onderzoek',
				},
				{
					const: '026190f7-e04f-48ba-bb5f-2a51f4d3e900',
					title: 'Onderzoek gevaarlijke stoffen',
				},
				{
					const: '15df8f12-8742-4741-a87e-e08289bf48b3',
					title: 'Toets Constructieve Veiligheid',
				},
			],
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
