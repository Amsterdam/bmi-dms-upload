import React, { ComponentProps } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';
import AJV, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
import { Schema } from 'ajv/lib/types/index';

type Props = Omit<ComponentProps<typeof JsonForms>, 'onChange'> & {
	onChange: (valid: boolean, errors: ErrorObject[]) => void;
};

const DEFAULT_RENDERERS = [...materialRenderers, ...customRenderers, ...customLayoutRenderers];

const ajv = new AJV({ allErrors: true, messages: true });
addFormats(ajv, ['date']);
const ajvWithCustomErrors = ajvErrors(ajv, { keepErrors: true });

const Form: React.FC<Props> = ({ schema, uischema, data, validationMode, renderers, onChange }) => {
	return (
		<JsonForms
			schema={schema}
			uischema={uischema}
			data={data}
			renderers={[...DEFAULT_RENDERERS, ...renderers]}
			validationMode={validationMode}
			onChange={({ errors, data }) => {
				const validate = ajv.compile(schema as Schema);
				const valid = validate(data);
				onChange(valid, errors as ErrorObject[]);
			}}
			ajv={ajvWithCustomErrors}
			i18n={{
				locale: 'nl',
				translate: (key: string | undefined, args: string | undefined): string => {
					if (typeof key === 'string' && !key.startsWith('error.')) return args || '';
					switch (key) {
						case 'error.required':
							return 'Dit is een verplicht veld';
						default:
							return '** missing error message **';
					}
					return '** missing translation **';
				},
			}}
		/>
	);
};

export default Form;
