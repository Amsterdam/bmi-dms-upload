import React from 'react';
import { ResolvedJsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import { LayoutProps, Layout } from '@jsonforms/core';
import Row from './Row';

const RowLayoutRenderer = ({ schema, uischema, path, renderers, cells, enabled, visible }: LayoutProps) => {
	return (
		<div>
			{visible &&
				(uischema as Layout).elements.map((child, idx) => {
					return (
						<Row key={`row-${idx}`}>
							<ResolvedJsonFormsDispatch
								schema={schema}
								uischema={child}
								path={path}
								enabled={enabled}
								renderers={renderers}
								cells={cells}
							/>
						</Row>
					);
				})}
		</div>
	);
};

export default withJsonFormsLayoutProps(RowLayoutRenderer);
