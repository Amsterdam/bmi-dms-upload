import React from 'react';
import { DescriptionList } from '@amsterdam/bmi-component-library';
import { Tag } from '@amsterdam/asc-ui';

export const metadataList: DescriptionList = [
	{ label: 'Jaar', value: '2021' },
	{ label: 'Monitoring', value: 'Ja' },
	{ label: 'Actief', value: 'Nee' },
	{ label: 'Uitvoeringsdatum', value: '10-10-2021' },
	{ label: 'Herhalingsmeter', value: null },
	{
		label: 'Categorieën',
		value: (
			<>
				<Tag>Bruggen</Tag>
				<Tag>Kademuren</Tag>
			</>
		),
	},
];
