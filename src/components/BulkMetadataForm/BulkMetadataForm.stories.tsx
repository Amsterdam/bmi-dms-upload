import React from 'react';
import { Story, Meta } from '@storybook/react';
import BulkMetadataForm, { Props } from './BulkMetadataForm';
import { defaultData, schema as stubSchema, uischema as stubUISchema } from './__stubs__';
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';

export default {
	component: BulkMetadataForm,
	title: 'BulkMetadataForm',
} as Meta;

const Template: Story<Props> = ({
	schema = stubSchema,
	uischema = stubUISchema,
	renderers = [...vanillaRenderers, ...customRenderers, ...customLayoutRenderers],
	data = {},
	cells = vanillaCells,
	onChange = () => {
		console.log('Data has changed');
	},
	...props
}) => {
	return (
		<BulkMetadataForm
			schema={schema}
			uischema={uischema}
			renderers={renderers}
			data={data}
			cells={cells}
			onChange={onChange}
			{...props}
		/>
	);
};

export const Default = Template.bind({});

Default.args = {
	data: defaultData,
};
