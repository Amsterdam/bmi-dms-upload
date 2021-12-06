import styled from 'styled-components';
import DocViewer from 'react-doc-viewer';
import { ComponentProps } from 'react';

export const DocViewerStyle = styled(DocViewer)<ComponentProps<typeof DocViewer>>`
	display: flex;
	flex-direction: column;
	width: 100%;

	& div#file-name {
		margin-left: 0;
	}
`;
