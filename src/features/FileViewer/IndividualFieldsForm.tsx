import React, { useState } from 'react';
import { Heading } from '@amsterdam/asc-ui';

import { useAppDispatch, useAppSelector } from '../hooks';
import { createSchemaFromMetadataProps, createUISchemaCompactFromMetadataProps } from '../../utils';
import { MetadataGenericType } from '../../types';
import Form, { Props as FormProps } from '../../components/Form/Form';

import { IBulkField, IBulkFile, IBulkFileMetadata } from '../bulk/bulk/store/model';
import {
	convertBulkFieldsToBulkFileMetadata,
	convertBulkFieldsToMetadataProperties,
	convertBulkFileMetadataToMetadataGenericTypes,
	identicalObjects,
	reduceMetadata,
} from '../bulk/bulk/utils';
import { IndividualFieldsFormStyle } from './styles';
import { setFileMetadata } from '../bulk/bulk/store/slice';
import { getFieldsForFile } from '../bulk/bulk/store/selectors';

export type Props = {
	fields: IBulkField[];
	onChange: (data: MetadataGenericType, valid: boolean) => void;
	fieldData: any;
	file: IBulkFile;
};

export default function IndividualFieldsForm({ ...props }: Props) {
	const { fields, onChange, file } = props;
	const dispatch = useAppDispatch();

	const fileFields = useAppSelector((state) => getFieldsForFile(state, file.id));
	const metadataProperties = convertBulkFieldsToMetadataProperties(fields);
	const schema: FormProps['schema'] = createSchemaFromMetadataProps(metadataProperties, false);
	const uischema: FormProps['uischema'] = createUISchemaCompactFromMetadataProps(metadataProperties);

	const [data, setData] = useState<MetadataGenericType>({});

	const getMergedData = () =>
		convertBulkFileMetadataToMetadataGenericTypes(
			reduceMetadata(convertBulkFieldsToBulkFileMetadata(fields), fileFields),
		);

	const handleOnChange = (newData: MetadataGenericType, valid: boolean) => {
		if (!identicalObjects(data, newData)) {
			setData(newData);

			dispatch(
				setFileMetadata({
					fileId: file.id,
					metadata: Object.keys(newData).map((key) => {
						const obj = newData[key] as MetadataGenericType;

						return {
							id: key,
							value: obj['value'],
						} as IBulkFileMetadata;
					}),
				}),
			);

			onChange(newData, valid);
		}
	};

	return (
		<IndividualFieldsFormStyle>
			<Heading forwardedAs="h3">Archiefgegevens-brug</Heading>
			<Form schema={schema} uischema={uischema} data={getMergedData()} onChange={handleOnChange} renderers={[]} />
		</IndividualFieldsFormStyle>
	);
}
