import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createSchemaFromMetadataProps, createUISchemaIndividualFieldsFromMetadataProps } from '../../../../utils';
import { MetadataGenericType } from '../../../../types';
import Form from '../../../../components/Form/Form';

import { IBulkField, IBulkFile, IBulkFileMetadata } from '../../bulk/store/model';
import {
	convertBulkFieldsToBulkFileMetadata,
	convertBulkFieldsToMetadataProperties,
	convertBulkFileMetadataToMetadataGenericTypes,
	identicalObjects,
	reduceMetadata,
} from '../../bulk/utils';
import { IndividualFieldsFormStyle } from './styles';
import { setFileMetadata } from '../../bulk/store/slice';
import { getFieldsForFile } from '../../bulk/store/selectors';

export type Props = {
	fieldData: any;
	fields: IBulkField[];
	file: IBulkFile;
	onChange: (data: MetadataGenericType, valid: boolean) => void;
};

const getMergedData = (fields: IBulkField[], fileFields: IBulkFileMetadata[] | undefined) =>
	convertBulkFileMetadataToMetadataGenericTypes(
		reduceMetadata(convertBulkFieldsToBulkFileMetadata(fields), fileFields),
	);

export default function IndividualFieldsForm({ fields, onChange, file }: Props) {
	const dispatch = useAppDispatch();

	const fileFields = useAppSelector((state) => getFieldsForFile(state, file.id));
	const metadataProperties = convertBulkFieldsToMetadataProperties(fields);
	const schema = createSchemaFromMetadataProps(metadataProperties, false);
	const uischema = createUISchemaIndividualFieldsFromMetadataProps(metadataProperties);

	const [data, setData] = useState<MetadataGenericType>({});

	const handleOnChange = (newData: MetadataGenericType, valid: boolean) => {
		if (!identicalObjects(data, newData)) {
			setData(newData);

			dispatch(
				setFileMetadata({
					fileId: file.id,
					metadata: Object.keys(newData).map(
						(key) =>
							({
								id: key,
								value: (newData[key] as MetadataGenericType).value,
							} as IBulkFileMetadata),
					),
				}),
			);

			onChange(newData, valid);
		}
	};

	return (
		<IndividualFieldsFormStyle>
			<Form
				schema={schema}
				uischema={uischema}
				data={getMergedData(fields, fileFields)}
				onChange={handleOnChange}
				renderers={[]}
			/>
		</IndividualFieldsFormStyle>
	);
}
