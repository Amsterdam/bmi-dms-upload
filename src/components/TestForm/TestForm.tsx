import React, { ComponentProps } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import customRenderers from '../customRenderers';
import createAjv from '../../utils/createAjv';

const ajv = createAjv();
const DEFAULT_RENDERERS = [...materialRenderers, ...customRenderers /*, ...customLayoutRenderers*/];

type Props = ComponentProps<typeof JsonForms> & {};

const TestForm: React.FC<Props> = ({ schema, uischema, data, onChange }) => {
	return (
		<JsonForms
			schema={schema}
			uischema={uischema}
			data={data}
			renderers={DEFAULT_RENDERERS}
			ajv={ajv}
			onChange={onChange}
		/>
	);
};

export default TestForm;
