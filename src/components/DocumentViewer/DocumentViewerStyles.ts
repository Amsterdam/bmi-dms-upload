import styled from 'styled-components';
import DocViewer from 'react-doc-viewer';

export const DocumentViewerStyle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const DocViewerStyle = styled(DocViewer)`
	border: 1px solid black;
`;
