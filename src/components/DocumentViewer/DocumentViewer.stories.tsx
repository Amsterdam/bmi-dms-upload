import React from 'react';
import { Meta } from '@storybook/react';
import DocumentViewer from './DocumentViewer';

export default {
	component: DocumentViewer,
	title: 'DocumentViewer',
} as Meta;

export const PNGDocument = () => <DocumentViewer url="/assets/example.png" />;
export const PDFDocument = () => <DocumentViewer url="/assets/example.pdf" />;
