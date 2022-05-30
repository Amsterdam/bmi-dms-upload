import React from 'react';
import { UISchemaElement } from '@jsonforms/core';

import { CustomJsonSchema, MetadataGenericType } from '../../../../types';
import Form from '../../../../components/Form/Form';
import { IndividualFieldsFormStyle } from './styles';

export type Props = {
	data: MetadataGenericType;
	schema: CustomJsonSchema;
	uischema: UISchemaElement;
	onChange: (data: MetadataGenericType, valid: boolean) => void;
};

export default function IndividualFieldsForm({ data, schema, uischema, onChange }: Props) {
	return (
		<IndividualFieldsFormStyle>
			<Form schema={schema} uischema={uischema} data={data} onChange={onChange} renderers={[]} />
		</IndividualFieldsFormStyle>
	);
}
