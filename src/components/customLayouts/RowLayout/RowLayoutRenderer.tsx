import React from 'react';
import { ResolvedJsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import { LayoutProps, Layout } from '@jsonforms/core';
import RowStyles from './RowStyles';

const RowLayoutRenderer = ({ schema, uischema, path, renderers, cells, enabled, visible }: LayoutProps) => (
	<div>
		{visible &&
			(uischema as Layout).elements.map((child, idx) => {
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
