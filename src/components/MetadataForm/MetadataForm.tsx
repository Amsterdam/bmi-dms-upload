import React, { ComponentProps } from 'react';
import { MetadataFormStyle } from './MetadataFormStyles';
import { JsonForms } from '@jsonforms/react';
import MetadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';
import Form from '../Form/Form';
import { ErrorObject } from 'ajv';

type Props = Omit<ComponentProps<typeof JsonForms>, 'onChange'> & {
	onChange: (valid: boolean, errors: ErrorObject[]) => void;
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
				onChange={(valid, errors) => {
					console.log('[[', valid, errors);
					onChange(valid, errors);
				}}
			/>
		</MetadataFormStyle>
	);
};

export default MetadataForm;
