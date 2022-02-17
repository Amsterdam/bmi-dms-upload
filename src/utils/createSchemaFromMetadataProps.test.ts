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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Gebruik auto' op",
								format: "Het format voor 'Gebruik auto' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Contract' op",
								format: "Het format voor 'Contract' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Document omschrijving' op",
								format: "Het format voor 'Document omschrijving' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Ingenieursbureau' op",
								format: "Het format voor 'Ingenieursbureau' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Uitvoeringsdatum' op",
								format: "Het format voor 'Uitvoeringsdatum' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'ILS-2' op",
								format: "Het format voor 'ILS-2' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'ILS-3' op",
								format: "Het format voor 'ILS-3' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Monitoring' op",
								format: "Het format voor 'Monitoring' is ongeldig",
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
							errorMessage: {
								'bmi-isNotEmpty': "Geef de default waarde voor 'Object type' op",
								format: "Het format voor 'Object type' is ongeldig",
							},
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Herhalingsmeter' op",
								format: "Het format voor 'Herhalingsmeter' is ongeldig",
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
								'bmi-isNotEmpty': "Geef de default waarde voor 'Bron' op",
								format: "Het format voor 'Bron' is ongeldig",
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
								format: 'Jaartal mag niet leeg zijn (custom error message)',
							},
							type: 'string',
						},
					},
					type: 'object',
				},
			},
			type: 'object',
		});
	});
});
