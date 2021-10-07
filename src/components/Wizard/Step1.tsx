import React from 'react';
import { CustomFile, FileUpload, FileUploadProps } from '@amsterdam/bmi-component-library';

export type CancelCallbackArg<T> = { metadata?: T; file?: CustomFile };

type Props = FileUploadProps;

export default function Step1({ ...props }: Props) {
	return (
		<React.Fragment>
			<FileUpload
				getPostUrl={props.getPostUrl}
				placeholder="Sleep de png bestanden in dit vlak of"
				droppingLabel="bestanden geselecteerd"
				selectFilesLabel="selecteer bestanden"
				removeLabel="Wissen"
				cancelLabel="Annuleren"
				fileUploadErrorLabel="dit bestand kan niet worden geüpload"
				fileUploadInProgressLabel="wordt geupload"
				options={{ noClick: true, noKeyboard: true }}
				onFileRemove={props.onFileRemove}
				onFileSuccess={props.onFileSuccess}
				getHeaders={props.getHeaders}
			/>
		</React.Fragment>
	);
}
