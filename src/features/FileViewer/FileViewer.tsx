import React, { useCallback, useEffect, useState } from 'react';
import { DocumentViewer } from '@amsterdam/bmi-component-library';
import debounce from 'debounce';

import { MetadataGenericType } from '../../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getChangeIndividualFields, getDefaultFields, getFields, getFieldsForFile } from '../bulk/bulk/store/selectors';
import { IBulkFile } from '../bulk/bulk/store/model';
import { TGetDocumentViewUrl } from '../bulk/bulk/types'

import DefaultFieldsTable from './DefaultFieldsTable';
import IndividualFieldsForm from './IndividualFieldsForm';
import { FileViewerDocumentInnerStyle, FileViewerDocumentStyle, FileViewerFieldsStyle, FileViewerStyle } from './styles';
import { convertBulkFieldsToMetadataGenericTypes, reduceFieldData } from '../bulk/bulk/utils';
import { DEFAULT_DEBOUNCE } from '../bulk/bulk/constants';
import { setFields } from '../bulk/bulk/store/slice';

export type Props = {
	file: IBulkFile
	getDocumentViewUrl: TGetDocumentViewUrl
	onChange: (data: MetadataGenericType, valid: boolean) => void;
}

export default function FileViewer(props: Props) {
	const { file, getDocumentViewUrl, onChange } = props;
	const dispatch = useAppDispatch();

	const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

	const fields = useAppSelector(getFields);
	// const fileFields = useAppSelector(getFieldsForFile);
	const changeIndividualFields = useAppSelector(getChangeIndividualFields);
	const defaultFields = useAppSelector(getDefaultFields);

	useEffect(() => {
		const asyncGetDocumentViewUrl = async () => {
			setFileUrl(await getDocumentViewUrl(file.id));
		}
		asyncGetDocumentViewUrl();
	}, [file])

	// @todo save

	const handleOnChange = useCallback(
		debounce((data: MetadataGenericType, valid: boolean) => {
			onChange(data, valid);
			if (JSON.stringify(data) !== JSON.stringify(convertBulkFieldsToMetadataGenericTypes(changeIndividualFields))) {
				dispatch(setFields(reduceFieldData(data, fields)));
			}
		}, DEFAULT_DEBOUNCE),
		[fields],
	);

	return (
		<FileViewerStyle>
			<FileViewerFieldsStyle>
				{ changeIndividualFields && <IndividualFieldsForm fields={changeIndividualFields} onChange={handleOnChange} /> }
				<DefaultFieldsTable fields={defaultFields} />
			</FileViewerFieldsStyle>

			<FileViewerDocumentStyle>
				<FileViewerDocumentInnerStyle>
					{fileUrl && <DocumentViewer uri={fileUrl} /> }
				</FileViewerDocumentInnerStyle>
			</FileViewerDocumentStyle>
		</FileViewerStyle>
	);
}
