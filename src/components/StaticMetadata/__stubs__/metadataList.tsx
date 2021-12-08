import React, { ComponentProps } from 'react';
import { DescriptionList } from '@amsterdam/bmi-component-library';
import { Tag } from '@amsterdam/asc-ui';

export const metadataList: ComponentProps<typeof DescriptionList>['list'] = [
	{ label: 'Jaar', value: '2021' },
	{ label: 'Monitoring', value: 'Ja' },
	{ label: 'Actief', value: 'Nee' },
	{ label: 'Uitvoeringsdatum', value: '10-10-2021' },
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
