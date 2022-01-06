import React, { ComponentProps } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';
import { Schema } from 'ajv';
import ajv from '../../utils/createAjv';
import { CustomJsonSchema, OnChangeCallback } from '../../types';

export type Props = Omit<ComponentProps<typeof JsonForms>, 'onChange'> & {
	onChange: OnChangeCallback;
};

export const DEFAULT_RENDERERS = [...materialRenderers, ...customRenderers, ...customLayoutRenderers];

// The oneOf property in the JsonSchema we use to populate the select options does is used for validation purposes
// If an option for a creatable field does not exist in the oneOf array, it is deemed an invalid option
// What we do here is adding a new option in case a non-existent option is presenting itself
// The altered schema is then used for validation purposes but NOT rendering purposes
function addCreatableSupportToSchema(schema: CustomJsonSchema, data: Record<string, any>): CustomJsonSchema {
	const { properties = {} } = schema;
	return {
		...schema,
		properties: Object.keys(properties).reduce((acc = {}, key) => {
			const property = { ...properties?.[key] };
			const value = data[key];

			if (property?.customFormat === 'creatable' && value) {
				const isOption = property.oneOf?.findIndex((option) => option.const === value) !== -1;
				if (!isOption) {
					property.oneOf = [...(property?.oneOf ?? []), { const: value, title: value }];
				}
			}

			acc[key] = property;
			return acc;
		}, {} as CustomJsonSchema['properties']),
	};
}

const Form: React.FC<Props> = ({ schema, uischema, data, validationMode, renderers, onChange }) => {
	return (
		<JsonForms
			schema={schema}
			uischema={uischema}
			data={data}
			renderers={[...DEFAULT_RENDERERS, ...renderers]}
			validationMode={validationMode}
			onChange={({ errors = [], data }) => {
				const creatableSchema = addCreatableSupportToSchema(schema as CustomJsonSchema, data);
				const validate = ajv.compile(creatableSchema as Schema);
				const valid = validate(data);
				onChange(data, valid, errors);
			}}
			ajv={ajv}
		/>
	);
};

export default Form;
