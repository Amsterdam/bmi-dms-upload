import React from 'react';
import { DocumentViewerStyle, DocViewerStyle } from './DocumentViewerStyles';
import { DocViewerRenderers } from 'react-doc-viewer';

type Props = {
	url: string;
};

const DocumentViewer: React.FC<Props> = ({ url }) => {
	return (
		<DocumentViewerStyle>
			<DocViewerStyle documents={[{ uri: url }]} pluginRenderers={DocViewerRenderers} />
		</DocumentViewerStyle>
	);
};

export default DocumentViewer;
