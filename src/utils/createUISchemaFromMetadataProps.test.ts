import createUISchemaFromMetadataProps from './createUISchemaFromMetadataProps';
import { metadataProperties } from '../components/BulkMetadataForm/__stubs__';

describe('utils/createUISchemaFromMetadataProps', () => {
	test('Create uischema from metadata properties', () => {
		expect(createUISchemaFromMetadataProps(metadataProperties)).toEqual({
			elements: [
				{
					elements: [
						{
							label: 'Jaar',
							scope: '#/properties/year/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/year/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Document omschrijving',
							scope: '#/properties/documentDescription/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/documentDescription/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Contract',
							scope: '#/properties/contract/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/contract/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Gebruik auto',
							scope: '#/properties/carUse/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/carUse/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Herhalingsmeter',
							scope: '#/properties/repetitionMeter/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/repetitionMeter/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'ILS-3',
							scope: '#/properties/ils3/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/ils3/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Monitoring',
							scope: '#/properties/monitoring/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/monitoring/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Object type',
							scope: '#/properties/objectType/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/objectType/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Uitvoeringsdatum',
							scope: '#/properties/executionDate/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/executionDate/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Bron',
							scope: '#/properties/source/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/source/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'Ingenieursbureau',
							scope: '#/properties/engineeringOffice/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/engineeringOffice/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
				{
					elements: [
						{
							label: 'ILS-2',
							scope: '#/properties/ils2/properties/value',
							type: 'Control',
						},
						{
							label: false,
							scope: '#/properties/ils2/properties/changeIndividual',
							type: 'Control',
						},
					],
					type: 'HorizontalLayout',
				},
			],
			type: 'Group',
		});
	});
});
