import { MetadataExample } from '../../../../types';
import { IBulkField } from '../store/model';

export const data: MetadataExample = {
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

export const metadataFields: IBulkField[] = [
	{
		id: 'year',
		value: '',
		label: 'Jaar',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'documentDescription',
		value: '',
		label: 'Document omschrijving',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'contract',
		value: '',
		label: 'Contract',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'carUse',
		value: '',
		label: 'Gebruik auto',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'repetitionMeter',
		value: '',
		label: 'Herhalingsmeter',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'ils3',
		value: '',
		label: 'ILS-3',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'monitoring',
		value: '',
		label: 'Monitoring',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'objectType',
		value: '',
		label: 'Object type',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'executionDate',
		value: '',
		label: 'Uitvoeringsdatum',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'source',
		value: '',
		label: 'Bron',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'engineeringOffice',
		value: '',
		label: 'Ingenieursbureau',
		changeIndividual: false,
		type: 'text',
	},
	{
		id: 'ils2',
		value: '',
		label: 'ILS-2',
		changeIndividual: false,
		type: 'text',
	},
];
