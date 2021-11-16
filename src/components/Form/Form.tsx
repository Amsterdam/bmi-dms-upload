import React, { ComponentProps } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';
import { Schema } from 'ajv';
import createAjv from '../../utils/createAjv';
import { OnChangeCallback } from '../../types';

type Props = Omit<ComponentProps<typeof JsonForms>, 'onChange'> & {
	onChange: OnChangeCallback;
};

const DEFAULT_RENDERERS = [...materialRenderers, ...customRenderers, ...customLayoutRenderers];
const ajv = createAjv();

const Form: React.FC<Props> = ({ schema, uischema, data, validationMode, renderers, onChange }) => {
	return (
		<JsonForms
			schema={schema}
			uischema={uischema}
			data={data}
			renderers={[...DEFAULT_RENDERERS, ...renderers]}
			validationMode={validationMode}
			onChange={({ errors = [], data }) => {
				const validate = ajv.compile(schema as Schema);
				const valid = validate(data);
				onChange(data, valid, errors);
			}}
			ajv={ajv}
		/>
	);
};

export default Form;
