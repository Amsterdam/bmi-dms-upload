import createSchemaFromMetadataProps from './createSchemaFromMetadataProps';
import { metadataProperties } from '../components/BulkMetadataForm/__stubs__';

describe('utils/createSchemaFromMetadataProps', () => {
	test('Create schema from metadata properties', () => {
		expect(createSchemaFromMetadataProps(metadataProperties)).toEqual({
			properties: {
				carUse: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							'bmi-isNotEmpty': true,
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Gebruik auto' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Gebruik auto' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				contract: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							'bmi-isNotEmpty': true,
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Contract' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Contract' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				documentDescription: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							'bmi-isNotEmpty': true,
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Document omschrijving' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Document omschrijving' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				engineeringOffice: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Ingenieursbureau' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Ingenieursbureau' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				executionDate: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Uitvoeringsdatum' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Uitvoeringsdatum' is ongeldig ",
							},
							format: 'date',
							type: 'string',
						},
					},
					type: 'object',
				},
				ils2: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'ILS-2' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'ILS-2' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				ils3: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'ILS-3' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'ILS-3' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				monitoring: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Monitoring' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Monitoring' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				objectType: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							customFormat: 'creatable',
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Object type' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Object type' is ongeldig ",
							},
							oneOf: [
								{
									const: '1',
									title: 'Brug',
								},
								{
									const: '2',
									title: 'Kademuur',
								},
								{
									const: '3',
									title: 'Sondering',
								},
							],
							type: 'string',
						},
					},
					type: 'object',
				},
				repetitionMeter: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Herhalingsmeter' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Herhalingsmeter' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				source: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Bron' op ",
								'is-date-year': 'Jaar moet een getal van 0 t/m 2023 zijn.',
								format: "Het format voor 'Bron' is ongeldig ",
							},
							type: 'string',
						},
					},
					type: 'object',
				},
				year: {
					properties: {
						changeIndividual: {
							type: 'boolean',
						},
						name: {
							type: 'string',
						},
						value: {
							'bmi-isNotEmpty': true,
							errorMessage: {
								'bmi-isNotEmpty': 'Jaartal mag niet leeg zijn (custom error message)',
								'is-date-year': 'Jaartal mag niet leeg zijn (custom error message)',
								format: 'Jaartal mag niet leeg zijn (custom error message)',
							},
							type: 'string',
						},
					},
					type: 'object',
				},
			},
			required: ['year', 'documentDescription', 'contract', 'carUse'],
			type: 'object',
		});
	});
});
