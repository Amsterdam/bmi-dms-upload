import React from 'react';
import { MetadataColumnHeadersStyle, ColumnHeaderStyle } from './MetadataColumnHeadersStyles';

export type Column = {
	header: string;
	width: number; // % value
	align?: string;
	objectID: number;
};

type Props = {
	columns: Column[];
};

const MetadataColumnHeaders: React.FC<Props> = ({ columns }) => (
	<MetadataColumnHeadersStyle aria-hidden>
		{columns.map(({ header, width, align , objectID}, idx) => (
			<ColumnHeaderStyle key={`column-${objectID}`} width={width} align={align ?? 'left'}>
				{header}
			</ColumnHeaderStyle>
		))}
	</MetadataColumnHeadersStyle>
);

export default MetadataColumnHeaders;
