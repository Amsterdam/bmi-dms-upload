import React from 'react';
import { StyledDescriptionList, StyledDescriptionListItem } from './styles';

import { IBulkField } from '../../bulk/store/model';

export type Props = {
	fields?: IBulkField[];
};

export default function DefaultFieldsTable({ fields }: Props) {
	return (
		<StyledDescriptionList>
			{fields &&
				fields.map((field) => (
					<StyledDescriptionListItem term={field.label} key={field.id}>
						{field.value}
					</StyledDescriptionListItem>
				))}
		</StyledDescriptionList>
	);
}