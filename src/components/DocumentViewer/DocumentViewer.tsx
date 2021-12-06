import React from 'react';
import { DocViewerStyle } from './DocumentViewerStyles';
import { DocViewerRenderers } from 'react-doc-viewer';

type Props = {
	url: string;
};

const DocumentViewer: React.FC<Props> = ({ url }) => {
	return <DocViewerStyle documents={[{ uri: url }]} pluginRenderers={DocViewerRenderers} />;
};

export default DocumentViewer;
