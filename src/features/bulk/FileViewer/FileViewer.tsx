import React, { useCallback, useEffect, useState } from 'react';
import { DocumentViewer } from '@amsterdam/bmi-component-library';
import debounce from 'debounce';

import { MetadataGenericType } from '../../../types';
import { useAppSelector } from '../../hooks';
import { getChangeIndividualFields, getDefaultFields, getFields } from '../bulk/store/selectors';
import { IBulkFile } from '../bulk/store/model';
import { TGetDocumentViewUrl } from '../bulk/types';

import DefaultFieldsTable from './DefaultFieldsTable';
import IndividualFieldsForm from './IndividualFieldsForm';
import {
	FileViewerDocumentInnerStyle,
	FileViewerDocumentStyle,
	FileViewerFieldsStyle,
	FileViewerStyle,
} from './styles';
import { DEFAULT_DEBOUNCE } from '../bulk/constants';

export type Props = {
	file: IBulkFile;
	getDocumentViewUrl: TGetDocumentViewUrl;
	onChange: (data: MetadataGenericType, valid: boolean) => void;
};

export default function FileViewer(props: Props) {
	const { file, getDocumentViewUrl, onChange } = props;
	const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
	const fields = useAppSelector(getFields);
	const changeIndividualFields = useAppSelector(getChangeIndividualFields);
	const defaultFields = useAppSelector(getDefaultFields);

	useEffect(() => {
		const asyncGetDocumentViewUrl = async () => {
			setFileUrl(await getDocumentViewUrl(file.id));
		};
		asyncGetDocumentViewUrl();
	}, [file]);

	// @todo save

	const handleOnChange = useCallback(
		debounce((data: MetadataGenericType, valid: boolean) => {
			onChange(data, valid);
		}, DEFAULT_DEBOUNCE),
		[fields],
	);

	return (
		<FileViewerStyle>
			<FileViewerFieldsStyle>
				{changeIndividualFields && (
					<IndividualFieldsForm fields={changeIndividualFields} file={file} fieldData={{}} onChange={handleOnChange} />
				)}
				{defaultFields && <DefaultFieldsTable fields={defaultFields} />}
			</FileViewerFieldsStyle>

			<FileViewerDocumentStyle>
				<FileViewerDocumentInnerStyle>{fileUrl && <DocumentViewer uri={fileUrl} />}</FileViewerDocumentInnerStyle>
			</FileViewerDocumentStyle>
		</FileViewerStyle>
	);
}
