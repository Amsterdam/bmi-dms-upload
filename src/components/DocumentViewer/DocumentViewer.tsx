import React from 'react';
import { DocumentViewerStyle, DocViewerStyle } from './DocumentViewerStyles';
import { Heading } from '@amsterdam/asc-ui';
import { DocViewerRenderers } from 'react-doc-viewer';

type Props = {
	url: string;
};

const DocumentViewer: React.FC<Props> = ({ url }) => {
	return (
		<DocumentViewerStyle>
			<Heading forwardedAs="h3">Bestandsnaam</Heading>
			<DocViewerStyle documents={[{ uri: url }]} pluginRenderers={DocViewerRenderers} />
		</DocumentViewerStyle>
	);
};

export default DocumentViewer;
