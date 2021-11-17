import React from 'react';
import { MetadataColumnHeadersStyle, ColumnHeaderStyle } from './MetadataColumnHeadersStyles';

export type Column = {
	header: string;
	width: number; // % value
};

type Props = {
	columns: Column[];
};

const MetadataColumnHeaders: React.FC<Props> = ({ columns }) => (
	<MetadataColumnHeadersStyle aria-hidden>
		{columns.map(({ header, width }, idx) => (
			<ColumnHeaderStyle key={`column-${idx}`} width={width}>
				{header}
			</ColumnHeaderStyle>
		))}
	</MetadataColumnHeadersStyle>
);

export default MetadataColumnHeaders;
