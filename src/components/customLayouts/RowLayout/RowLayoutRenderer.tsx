import React from 'react';
import { ResolvedJsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import { LayoutProps, Layout } from '@jsonforms/core';
import RowStyles from './RowStyles';

const RowLayoutRenderer = ({ schema, uischema, path, renderers, cells, enabled, visible }: LayoutProps) => (
	<div data-testid='row-layout'>
		{visible &&
			(uischema as Layout).elements.map((child, idx) => {
				/* eslint-disable react/no-array-index-key */
				return (
					<RowStyles key={`row-${idx}`}>
						<ResolvedJsonFormsDispatch
							schema={schema}
							uischema={child}
							path={path}
							enabled={enabled}
							renderers={renderers}
							cells={cells}
						/>
					</RowStyles>
				);
			})}
	</div>
);

export default withJsonFormsLayoutProps(RowLayoutRenderer);
