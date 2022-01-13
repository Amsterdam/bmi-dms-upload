import React from 'react';
import Form from '../Form/Form';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';
import MetadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';
import { JsonSchema, JsonSchema7 } from '@jsonforms/core';
import BulkMetadataFormStyles from './BulkMetadataFormStyles';

type Props = {};

type MetadataProperty = {
	key: string;
	type: 'string' | 'date';
	label: string;
};

const fields: MetadataProperty[] = [
	{
		key: 'year',
		type: 'string',
		label: 'Jaar',
	},
	{
		key: 'documentDescription',
		type: 'string',
		label: 'Documentomschrijving',
	},
];

export const schema: JsonSchema = {
	type: 'object',
	properties: fields.reduce((acc, { key, type }) => {
		acc[key] = {
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
				value: {
					type,
				},
				changeIndividual: {
					type: 'boolean',
				},
			},
		};
		return acc;
	}, {} as { [key: string]: JsonSchema7 }),
};

export const uischema = {
	type: 'Group',
	elements: fields.map(({ key, label }) => ({
		type: 'HorizontalLayout',
		elements: [
			{
				type: 'Control',
				label,
				scope: `#/properties/${key}/properties/value`,
			},
			{
				type: 'Control',
				label: false,
				scope: `#/properties/${key}/properties/changeIndividual`,
			},
		],
	})),
};

export const data = {
	year: {
		value: '2021',
	},
};

const BulkMetadataForm: React.FC<Props> = () => {
	return (
		<BulkMetadataFormStyles data-testid={'bulk-metadata-form'}>
			<MetadataColumnHeaders
				columns={[
					{
						header: 'Metadataveld',
						width: 40,
					},
					{
						header: 'Default waarde',
						width: 35,
					},
					{
						header: 'Individueel wijzigen',
						width: 25,
					},
				]}
			/>
			<Form
				schema={schema}
				uischema={uischema}
				data={data}
				renderers={[...vanillaRenderers, ...customRenderers, ...customLayoutRenderers]}
				cells={vanillaCells}
				onChange={() => console.log('changed')}
			/>
		</BulkMetadataFormStyles>
	);
};

export default BulkMetadataForm;
