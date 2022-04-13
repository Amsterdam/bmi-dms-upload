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
	},
	{
		id: 'documentDescription',
		value: '',
		label: 'Document omschrijving',
		changeIndividual: false,
	},
	{
		id: 'contract',
		value: '',
		label: 'Contract',
		changeIndividual: false,
	},
	{
		id: 'carUse',
		value: '',
		label: 'Gebruik auto',
		changeIndividual: false,
	},
	{
		id: 'repetitionMeter',
		value: '',
		label: 'Herhalingsmeter',
		changeIndividual: false,
	},
	{
		id: 'ils3',
		value: '',
		label: 'ILS-3',
		changeIndividual: false,
	},
	{
		id: 'monitoring',
		value: '',
		label: 'Monitoring',
		changeIndividual: false,
	},
	{
		id: 'objectType',
		value: '',
		label: 'Object type',
		changeIndividual: false,
	},
	{
		id: 'executionDate',
		value: '',
		label: 'Uitvoeringsdatum',
		changeIndividual: false,
	},
	{
		id: 'source',
		value: '',
		label: 'Bron',
		changeIndividual: false,
	},
	{
		id: 'engineeringOffice',
		value: '',
		label: 'Ingenieursbureau',
		changeIndividual: false,
	},
	{
		id: 'ils2',
		value: '',
		label: 'ILS-2',
		changeIndividual: false,
	},
]
