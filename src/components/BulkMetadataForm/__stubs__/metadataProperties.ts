import { MetadataProperty } from '../../../types';

export const metadataProperties: MetadataProperty[] = [
	{
		key: 'year',
		scope: 'string',
		type: 'string',
		label: 'Jaar',
		'bmi-isNotEmpty': true,
		'bmi-errorMessage': 'Jaartal mag niet leeg zijn (custom error message)',
	},
	{
		key: 'documentDescription',
		scope: 'string',
		type: 'string',
		label: 'Document omschrijving',
		'bmi-isNotEmpty': true,
	},
	{
		key: 'contract',
		scope: 'string',
		type: 'string',
		'bmi-isNotEmpty': true,
		label: 'Contract',
	},
	{
		key: 'carUse',
		scope: 'string',
		type: 'string',
		'bmi-isNotEmpty': true,
		label: 'Gebruik auto',
	},
	{
		key: 'repetitionMeter',
		scope: 'string',
		type: 'string',
		label: 'Herhalingsmeter',
	},
	{
		key: 'ils3',
		scope: 'string',
		type: 'string',
		label: 'ILS-3',
	},
	{
		key: 'monitoring',
		scope: 'string',
		type: 'string',
		label: 'Monitoring',
	},
	{
		key: 'objectType',
		scope: 'string',
		type: 'string',
		label: 'Object type',
	},
	{
		key: 'executionDate',
		scope: 'string',
		type: 'string',
		format: 'date',
		label: 'Uitvoeringsdatum',
	},
	{
		key: 'source',
		scope: 'string',
		type: 'string',
		label: 'Bron',
	},
	{
		key: 'engineeringOffice',
		scope: 'string',
		type: 'string',
		label: 'Ingenieursbureau',
	},
	{
		key: 'ils2',
		scope: 'string',
		type: 'string',
		label: 'ILS-2',
	},
];
