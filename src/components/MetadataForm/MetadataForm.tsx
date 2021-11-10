import React from 'react';
import { MetadataFormStyle } from './MetadataFormStyles';
import { JsonForms } from '@jsonforms/react';
import schema from './schema.json';
import uiSchema from './uiSchema.json';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';
import { vanillaRenderers } from '@jsonforms/vanilla-renderers';
import MetadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';

export enum documentTypeEnum {
	typeOne = 'Type 1',
	typeTwo = 'Type 2',
}

export type MetadataExample = {
	documentType: documentTypeEnum;
	documentDescription: string;
	executionDate: string;
};

type Props = {
	handleChange: (e: any) => void;
	data: MetadataExample;
};

const MetadataForm: React.FC<Props> = ({ handleChange, data }) => {
	console.log(':: vanillaRenderers', vanillaRenderers);
	return (
		<MetadataFormStyle>
			<h2>Metadata toevoegen</h2>
			<MetadataColumnHeaders
				columns={[
					{
						header: 'Metadataveld',
						width: 50,
					},
					{
						header: 'Waarde',
						width: 50,
					},
				]}
			/>
			<JsonForms
				schema={schema}
				uischema={uiSchema}
				data={{}}
				renderers={[...vanillaRenderers, ...customRenderers, ...customLayoutRenderers]}
			/>
		</MetadataFormStyle>
	);
};

export default MetadataForm;
