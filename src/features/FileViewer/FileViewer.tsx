import React from 'react';
import { DocumentViewer } from '@amsterdam/bmi-component-library';

import { getChangeIndividualFields, getDefaultFields } from '../bulk/bulk/store/selectors';
import { useAppSelector } from '../hooks';
import DefaultFieldsTable from './DefaultFieldsTable';
import IndividualFieldsForm from './IndividualFieldsForm';
import { FileViewerDocumentInnerStyle, FileViewerDocumentStyle, FileViewerFieldsStyle, FileViewerStyle } from './styles';

export default function FileViewer() {
	// const dispatch = useAppDispatch();
	const changeIndividualFields = useAppSelector(getChangeIndividualFields);
	const defaultFields = useAppSelector(getDefaultFields);

	return (
		<FileViewerStyle>
			<FileViewerFieldsStyle>
				{ changeIndividualFields && <IndividualFieldsForm fields={changeIndividualFields} /> }
				<DefaultFieldsTable fields={defaultFields} />
			</FileViewerFieldsStyle>

			<FileViewerDocumentStyle>
				<FileViewerDocumentInnerStyle>
					<DocumentViewer uri="assets/example.png" />
				</FileViewerDocumentInnerStyle>
			</FileViewerDocumentStyle>
		</FileViewerStyle>
	);
}
