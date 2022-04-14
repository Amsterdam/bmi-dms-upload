import React, { useCallback } from 'react';
import { Heading } from '@amsterdam/asc-ui';
import debounce from 'debounce';

import { createSchemaLightFromMetadataProps, createUISchemaLightFromMetadataProps } from '../../utils';
import { MetadataGenericType } from '../../types';
import Form, { Props as FormProps } from '../../components/Form/Form';

import { DEFAULT_DEBOUNCE } from '../bulk/bulk/constants';
import { IBulkField } from '../bulk/bulk/store/model';
import { convertBulkMetadataFieldToMetadataGenericType, convertBulkMetadataFieldToMetadataProperties } from '../bulk/bulk/utils';
import { IndividualFieldsFormStyle } from './styles';
import { useAppDispatch } from '../hooks';
import { setFieldData } from '../bulk/bulk/store/slice';

export type Props = {
	fields: IBulkField[];
};

export default function IndividualFieldsForm({ ...props }: Props) {
	const { fields } = props;

	const dispatch = useAppDispatch();

	const handleOnChange = useCallback(
		debounce((data: MetadataGenericType, valid: boolean) => {
			if (JSON.stringify(data) !== JSON.stringify(convertBulkMetadataFieldToMetadataGenericType(fields)))
				dispatch(setFieldData(data));
		}, DEFAULT_DEBOUNCE),
		[fields],
	);

	const metadataProperties = convertBulkMetadataFieldToMetadataProperties(fields);
	const schema: FormProps['schema'] = createSchemaLightFromMetadataProps(metadataProperties);
	const uischema: FormProps['uischema'] = createUISchemaLightFromMetadataProps(metadataProperties);

	return (
		<IndividualFieldsFormStyle>
			<Heading forwardedAs="h3">Archiefgegevens-brug</Heading>
			<Form schema={schema} uischema={uischema} data={convertBulkMetadataFieldToMetadataGenericType(fields)} onChange={handleOnChange} renderers={[]} />
		</IndividualFieldsFormStyle>
	);
}
