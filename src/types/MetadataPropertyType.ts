type MetadataProperty = {
	key: string;
	scope: string;
	type: 'string' | 'date';
	format?: string;
	label: string;
	'bmi-isNotEmpty'?: boolean;
	'bmi-errorMessage'?: string;
};

export const MetadataProperties: MetadataProperty[] = [
	{
		key: 'year',
		scope: 'string',
		type: 'string',
		label: 'Jaar',
		'bmi-isNotEmpty': true,
		'bmi-errorMessage': 'Jaartal mag niet leeg zijn',
	},
	{
		key: 'documentDescription',
		scope: 'string',
		type: 'string',
		label: 'Document omschrijving',
		'bmi-isNotEmpty': true,
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
