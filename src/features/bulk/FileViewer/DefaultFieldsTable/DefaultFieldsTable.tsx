import React from 'react';
import { StyledDescriptionListItem } from './styles';

import { IBulkField } from '../../bulk/store/model';
import { DescriptionList } from '@amsterdam/asc-ui';

export type Props = {
	fields?: IBulkField[];
};

export default function DefaultFieldsTable({ fields }: Props) {
	return (
		<DescriptionList>
			{fields &&
				fields.map((field) => (
					<StyledDescriptionListItem term={field.label} key={field.id}>
						{field.value === true ? '✔' : field.type === 'multi-select' ? field.value + '' : field.value}
					</StyledDescriptionListItem>
				))}
		</DescriptionList>
	);
}
