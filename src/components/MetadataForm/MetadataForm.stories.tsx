import React from 'react';
import { Story, Meta } from '@storybook/react';
import MetadataForm, { Props } from './MetadataForm';
import { schema as stubSchema, uischema as stubUISchema } from './__stubs__';

export default {
	component: MetadataForm,
	title: 'MetadataForm',
} as Meta;

const Template: Story<Props> = ({
	schema = stubSchema,
	uischema = stubUISchema,
	renderers = [],
	data = {},
	onChange = () => {
		console.log('onChange');
	},
	...props
}) => {
	return (
		<MetadataForm
			schema={schema}
			uischema={uischema}
			renderers={renderers}
			data={data}
			onChange={onChange}
			{...props}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	data: {
		documentDescription: 'Flora- en faunaonderzoek',
	},
};

export const NoData = Template.bind({});
NoData.args = {
	data: {
		documentDescription: '',
	},
};

export const NoTitle = Template.bind({});
NoTitle.args = {
	headerTitle: null,
};

export const NoColumnHeaders = Template.bind({});
NoColumnHeaders.args = {
	showColumnHeaders: false,
};

export const NoTitleAndColumnHeaders = Template.bind({});
NoTitleAndColumnHeaders.args = {
	headerTitle: null,
	showColumnHeaders: false,
};
