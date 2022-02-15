import React from 'react';
import { Story, Meta } from '@storybook/react';
import BulkMetadataForm, { Props } from './BulkMetadataForm';
import { schema as stubSchema, uischema as stubUISchema } from './__stubs__';
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
	data: {
		year: {
			value: '2021',
		},
		documentDescription: {
			value: 'Lorem Ipsum',
			changeIndividual: true,
		},
		repetitionMeter: {
			value: 'Lorem Ipsum',
		},
		ils3: {
			value: 'Lorem Ipsum',
			changeIndividual: true,
		},
		monitoring: {},
		objectType: {
			value: 'Lorem Ipsum',
		},
		contract: {
			value: 'Lorem Ipsum',
			changeIndividual: true,
		},
		carUse: {
			value: 'Lorem Ipsum',
		},
		executionDate: {},
		source: {},
		engineeringOffice: {
			value: 'Lorem Ipsum',
		},
		ils2: {
			value: '123456789',
		},
	},
};
