import { themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';


export const FileViewerStyle = styled.div`
	display: flex;
	flex-direction: row;
`

export const FileViewerFieldsStyle = styled.div`
	flex: 0 0 40%;
	padding-right: 1rem;
`

export const FileViewerDocumentStyle = styled.div`
	overflow: auto;
`
export const FileViewerDocumentInnerStyle = styled.div`
	min-width: 800px;
`

export const IndividualFieldsFormStyle = styled.div`
	padding-bottom: ${themeSpacing(8)};
`;
