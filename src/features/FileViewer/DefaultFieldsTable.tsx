import React from 'react';
import { DescriptionList, DescriptionListItem } from '@amsterdam/asc-ui';

import { IBulkField } from '../bulk/bulk/store/model';

export type Props = {
	fields: IBulkField[] | undefined;
};

export default function DefaultFieldsTable({ ...props }: Props) {
	const { fields } = props;
	return (
		<DescriptionList>
			{fields &&
				fields.map((field) => (
					<DescriptionListItem term={field.label} key={field.id}>
						{field.value}
					</DescriptionListItem>
				))}
		</DescriptionList>
	);
}
