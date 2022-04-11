import React, { useEffect } from 'react';
import { FileUpload, FileUploadProps } from '@amsterdam/bmi-component-library';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { CustomFileLight, CustomFileLightOrRejection } from '../../../types';
import BulkWizard from '../wizard/BulkWizard';
import { Props } from '../bulk/types';
import { IBulkField } from '../bulk/store/model';
import { getCustomFiles } from '../bulk/store/selectors';
import { removeFile, setFields, setFile } from '../bulk/store/slice';
import { Step1Styles } from './styles';

export interface Step1Props<T> extends Props<T> {
	metadataFields?: IBulkField[]
}

export default function Step1<T>(props: Step1Props<T>) {
	const { getHeaders, getPostUrl, onFileRemove, onFileSuccess, metadataFields } = props;

	const dispatch = useAppDispatch();

	const files = useAppSelector(getCustomFiles);

	useEffect(() => {
		if (!metadataFields) return;

		dispatch(
			setFields(metadataFields),
		)
	}, [metadataFields])

	const handleFileRemove = React.useCallback(
		(file: CustomFileLightOrRejection) => {
			onFileRemove && onFileRemove(file);
			dispatch(removeFile(file));
		},
		[onFileRemove],
	);

	const handleFileSuccess = React.useCallback(
		(uploadedFile: CustomFileLight) => {
			onFileSuccess && onFileSuccess(uploadedFile);
			const { tmpId } = uploadedFile;
			dispatch(
				setFile({
					id: `${tmpId}`,
					url: 'some-url', // @TODO: replace with actual value, from what?
					uploadedFile,
				}),
			);
		},
		[onFileSuccess],
	);

	return (
		<BulkWizard {...props}>
			<Step1Styles>
				<FileUpload
					cancelLabel="Annuleren"
					droppingLabel="bestanden geselecteerd"
					fileUploadErrorLabel="dit bestand kan niet worden geüpload"
					fileUploadInProgressLabel="wordt geupload"
					getHeaders={getHeaders}
					getPostUrl={getPostUrl}
					httpMethod='POST'
					onFileRemove={handleFileRemove}
					onFileSuccess={handleFileSuccess}
					options={{ noClick: true, noKeyboard: true, maxFiles: 0 }}
					placeholder="Sleep een bestand in dit vlak of"
					removeLabel="Wissen"
					selectFilesLabel="selecteer bestand"
					storedFiles={!files ? [] : (files as FileUploadProps['storedFiles'])}
				/>
			</Step1Styles>
		</BulkWizard>
	);
}
