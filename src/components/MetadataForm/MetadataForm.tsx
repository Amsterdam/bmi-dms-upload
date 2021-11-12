import React, { ComponentProps } from 'react';
import { MetadataFormStyle } from './MetadataFormStyles';
import { JsonForms } from '@jsonforms/react';
import MetadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';
import Form from '../Form/Form';
import { OnChangeCallback } from '../../types';

type Props = Omit<ComponentProps<typeof JsonForms>, 'onChange'> & {
	onChange: OnChangeCallback;
};

const MetadataForm: React.FC<Props> = ({
	ajv,
	i18n,
	schema,
	uischema,
	renderers,
	data = {},
	validationMode = 'ValidateAndShow',
	onChange,
}) => {
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
			<Form
				ajv={ajv}
				i18n={i18n}
				schema={schema}
				uischema={uischema}
				data={data}
				renderers={renderers}
				validationMode={validationMode}
				onChange={onChange}
			/>
		</MetadataFormStyle>
	);
};

export default MetadataForm;
