import React, { useCallback, useEffect, useState } from 'react';
import { DocumentViewer } from '@amsterdam/bmi-component-library';
import debounce from 'debounce';

import { MetadataGenericType } from '../../../types';
import { createSchemaFromMetadataProps, createUISchemaIndividualFieldsFromMetadataProps } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getChangeIndividualFields, getDefaultFields, getFieldsForFile } from '../bulk/store/selectors';
import { IBulkFile, IBulkFileMetadata } from '../bulk/store/model';
import { TGetDocumentViewUrl } from '../bulk/types';

import DefaultFieldsTable from './DefaultFieldsTable/DefaultFieldsTable';
import IndividualFieldsForm from './IndividualFieldsForm/IndividualFieldsForm';
import {
	FileViewerDocumentInnerStyle,
	FileViewerDocumentStyle,
	FileViewerFieldsStyle,
	FileViewerStyle,
} from './styles';
import { DEFAULT_DEBOUNCE } from '../bulk/constants';
import {
	convertBulkFieldsToBulkFileMetadata,
	convertBulkFieldsToMetadataProperties,
	convertBulkFileMetadataToMetadataGenericTypes,
	identicalObjects,
	reduceMetadata,
} from '../bulk/utils';
import { setFileMetadata } from '../bulk/store/slice';

export type Props = {
	file: IBulkFile;
	getDocumentViewUrl: TGetDocumentViewUrl;
	onChange: (data: MetadataGenericType, valid: boolean) => void;
};

export default function FileViewer({ file, getDocumentViewUrl, onChange }: Props) {
	const dispatch = useAppDispatch();
	const defaultFields = useAppSelector(getDefaultFields);
	const changeIndividualFields = useAppSelector(getChangeIndividualFields);
	const fileFields = useAppSelector((state) => getFieldsForFile(state, file.id));

	const individualFieldsMetadataProperties = convertBulkFieldsToMetadataProperties(changeIndividualFields);
	const individualFieldsSchema = createSchemaFromMetadataProps(individualFieldsMetadataProperties, false);
	const individualFieldsUISchema = createUISchemaIndividualFieldsFromMetadataProps(individualFieldsMetadataProperties);
	const individualFieldsData = convertBulkFileMetadataToMetadataGenericTypes(
		reduceMetadata(convertBulkFieldsToBulkFileMetadata(changeIndividualFields), fileFields),
	);

	const [formData, setFormData] = useState<MetadataGenericType>(individualFieldsData);
	const [documentUrl, setDocumentUrl] = useState<string>('');

	useEffect(() => {
		const asyncGetDocumentViewUrl = async () => {
			setDocumentUrl(await getDocumentViewUrl(file.id));
		};
		asyncGetDocumentViewUrl();
	}, [file.id]);

	useEffect(() => {
		if (changeIndividualFields.length === 0) {
			onChange({}, true);
		}
	}, [changeIndividualFields]);

	useEffect(() => {
		const data = convertBulkFileMetadataToMetadataGenericTypes(file.metadata);
		if (identicalObjects(formData, data)) return;
		setFormData(data);
	}, [file.metadata]);

	const handleOnChange = useCallback(
		debounce((newData: MetadataGenericType, valid: boolean) => {
			if (identicalObjects(formData, newData)) return;

			const newMetadata = Object.keys(newData).map(
				(key) =>
					({
						id: key,
						value: (newData[key] as MetadataGenericType).value,
					} as IBulkFileMetadata),
			);

			dispatch(
				setFileMetadata({
					fileId: file.id,
					metadata: newMetadata,
				}),
			);

			onChange(newData, valid);
		}, DEFAULT_DEBOUNCE),
		[formData, file.id],
	);

	return (
		<FileViewerStyle>
			<FileViewerFieldsStyle>
				{changeIndividualFields && (
					<IndividualFieldsForm
						data={individualFieldsData}
						schema={individualFieldsSchema}
						uischema={individualFieldsUISchema}
						onChange={handleOnChange}
					/>
				)}
				{defaultFields && <DefaultFieldsTable fields={defaultFields} />}
			</FileViewerFieldsStyle>

			<FileViewerDocumentStyle>
				<FileViewerDocumentInnerStyle>
					{documentUrl && <DocumentViewer currentFilename={file.uploadedFile.name} uri={documentUrl} />}
				</FileViewerDocumentInnerStyle>
			</FileViewerDocumentStyle>
		</FileViewerStyle>
	);
}
