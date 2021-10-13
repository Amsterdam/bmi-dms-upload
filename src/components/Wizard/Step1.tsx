import React from 'react';
import { FileUpload, FileUploadProps } from '@amsterdam/bmi-component-library';

export const Step1: React.FC<FileUploadProps> = ({ getPostUrl, getHeaders, onFileRemove, onFileSuccess }) => (
	<FileUpload
		getPostUrl={getPostUrl}
		placeholder="Sleep de png bestanden in dit vlak of"
		droppingLabel="bestanden geselecteerd"
		selectFilesLabel="selecteer bestanden"
		removeLabel="Wissen"
		cancelLabel="Annuleren"
		fileUploadErrorLabel="dit bestand kan niet worden geüpload"
		fileUploadInProgressLabel="wordt geupload"
		options={{ noClick: true, noKeyboard: true }}
		onFileRemove={onFileRemove}
		onFileSuccess={onFileSuccess}
		getHeaders={getHeaders}
	/>
);
