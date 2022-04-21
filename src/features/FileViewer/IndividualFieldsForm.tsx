import React from 'react';
import { Heading } from '@amsterdam/asc-ui';

import { createSchemaFromMetadataProps, createUISchemaCompactFromMetadataProps } from '../../utils';
import { MetadataGenericType } from '../../types';
import Form, { Props as FormProps } from '../../components/Form/Form';

import { IBulkField } from '../bulk/bulk/store/model';
import { convertBulkFieldsToMetadataGenericTypes, convertBulkFieldsToMetadataProperties } from '../bulk/bulk/utils';
import { IndividualFieldsFormStyle } from './styles';

export type Props = {
	fields: IBulkField[];
	onChange: (data: MetadataGenericType, valid: boolean) => void;
};

export default function IndividualFieldsForm({ ...props }: Props) {
	const { fields, onChange } = props;
	const metadataProperties = convertBulkFieldsToMetadataProperties(fields);
	const schema: FormProps['schema'] = createSchemaFromMetadataProps(metadataProperties, false);
	const uischema: FormProps['uischema'] = createUISchemaCompactFromMetadataProps(metadataProperties);

	return (
		<IndividualFieldsFormStyle>
			<Heading forwardedAs="h3">Archiefgegevens-brug</Heading>
			<Form
				schema={schema}
				uischema={uischema}
				data={convertBulkFieldsToMetadataGenericTypes(fields)}
				onChange={onChange}
				renderers={[]}
			/>
		</IndividualFieldsFormStyle>
	);
}
