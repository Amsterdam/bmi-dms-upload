import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { vanillaRenderers } from '@jsonforms/vanilla-renderers';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';

type Props = {};

export const schema = {
	type: 'object',
	properties: {
		fields: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						readOnly: true,
					},
					defaultValue: {
						type: 'string',
					},
					changeIndividual: {
						type: 'boolean',
					},
				},
			},
		},
	},
};

export const uischema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Control',
			scope: '#/properties/fields',
		},
	],
};

export const data = {
	fields: [
		{
			name: 'Jaar',
			defaultValue: '1980',
			changeIndividual: false,
		},
		{
			name: 'Document omschrijving',
			defaultValue: '',
			changeIndividual: true,
		},
		{
			name: 'Herhalingsmeter',
			defaultValue: '',
			changeIndividual: false,
		},
	],
};

const StepBulkMetadataConfig: React.FC<Props> = () => {
	return (
		<JsonForms
			schema={schema}
			uischema={uischema}
			data={data}
			renderers={[...vanillaRenderers, ...customRenderers, ...customLayoutRenderers]}
		/>
	);
};

export default StepBulkMetadataConfig;
