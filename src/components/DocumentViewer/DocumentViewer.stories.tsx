import React from 'react';
import { Meta, Story } from '@storybook/react';
import DocumentViewer from './DocumentViewer';

export default {
	component: DocumentViewer,
	title: 'DocumentViewer',
} as Meta;

export const Image: Story = () => <DocumentViewer url="/assets/example.png" />;
export const PDF: Story = () => <DocumentViewer url="/assets/example.pdf" />;
export const NotFound: Story = () => <DocumentViewer url="/assets/bogus404" />;
