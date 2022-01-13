import React from 'react';
import { MetadataColumnHeadersStyle, ColumnHeaderStyle } from './MetadataColumnHeadersStyles';

export type Column = {
	header: string;
	width: number; // % value
	align?: string;
};

type Props = {
	columns: Column[];
};

const MetadataColumnHeaders: React.FC<Props> = ({ columns }) => (
	<MetadataColumnHeadersStyle aria-hidden>
		{columns.map(({ header, width, align }, idx) => (
			<ColumnHeaderStyle key={`column-${idx}`} width={width} align={align ?? 'left'}>
				{header}
			</ColumnHeaderStyle>
		))}
	</MetadataColumnHeadersStyle>
);

export default MetadataColumnHeaders;
