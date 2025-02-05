import React, { useEffect, useState } from 'react';
import { FileUpload, FileUploadProps } from '@amsterdam/bmi-component-library';
import { useLocation } from 'react-router-dom-v5-compat';

import { getCustomFiles, getFields, getIsBulkMode } from '../bulk/store/selectors';

import BulkWizard from '../wizard/BulkWizard';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { BulkUploadProps } from '../bulk/types';
import { CustomFileLight, CustomFileLightOrRejection } from '../../../types';
import { IBulkField } from '../bulk/store/model';
import { Step1Styles } from './styles';

import {
	removeFile,
	resetFieldsAndFiles,
	setAllFieldsEditable,
	setBulkMode,
	setFields,
	setFile,
} from '../bulk/store/slice';

export interface Step1Props<T> extends BulkUploadProps<T> {
	metadataFields?: IBulkField[];
}

type HistoryRouterState = {
	previousPath: string;
};

export default function Step1<T>(props: Step1Props<T>) {
	const { getHeaders, getPostUrl, onFileRemove, onFileSuccess, metadataFields, uploadHTTPMethod, fileUploadOptions = {} } = props;
	const [isValidForm, setIsValidForm] = useState<boolean>(false);

	const { state } = useLocation();

	const dispatch = useAppDispatch();
	const files = useAppSelector(getCustomFiles);
	const fields = useAppSelector(getFields);
	const isBulkMode = useAppSelector(getIsBulkMode);

	const handleFileRemove = React.useCallback(
		(file: CustomFileLightOrRejection) => {
			onFileRemove && onFileRemove(file);
			dispatch(removeFile(file));
		},
		[onFileRemove],
	);

	const handleFileSuccess = React.useCallback(
		async (uploadedFile: CustomFileLight) => {
			const file = await onFileSuccess(uploadedFile);

			dispatch(
				setFile({
					id: file.id,
					uploadedFile: file.uploadedFile,
				}),
			);
		},
		[onFileSuccess],
	);

	useEffect(() => {
		if (!metadataFields) return;

		if (!fields?.length) dispatch(setFields(metadataFields));
	}, [metadataFields, fields]);

	useEffect(() => {
		if (files && files.length !== 0) {
			return setIsValidForm(true);
		}

		setIsValidForm(false);
	}, [files]);

	useEffect(() => {
		if (files && files.length) {
			dispatch(setBulkMode(files.length > 1));
		}
	}, [files]);

	// When changing mode from single to bulk or vice versa, we need set the default form state
	useEffect(() => {
		// Prevents resetting fields when still in progress of editing bulk meta data.
		// This will keep the previous state of step 2
		// Only counts for bulk mode not single.
		if (isBulkMode && state && (state as HistoryRouterState).previousPath === 'step-2') return;

		if (fields?.length) {
			dispatch(isBulkMode ? resetFieldsAndFiles() : setAllFieldsEditable(fields));
		}
	}, [isBulkMode, state]);

	return (
		<BulkWizard {...props} isValidForm={isValidForm}>
			<Step1Styles>
				<FileUpload
					cancelLabel="Annuleren"
					droppingLabel="bestanden geselecteerd"
					fileUploadErrorLabel="dit bestand kan niet worden geüpload"
					fileUploadInProgressLabel="wordt geupload"
					getHeaders={getHeaders}
					getPostUrl={getPostUrl}
					httpMethod={uploadHTTPMethod}
					onFileRemove={handleFileRemove}
					onFileSuccess={handleFileSuccess}
					options={{ noClick: true, noKeyboard: true, maxFiles: 0, ...fileUploadOptions }}
					placeholder="Sleep een bestand in dit vlak of"
					removeLabel="Wissen"
					selectFilesLabel="selecteer bestand"
					storedFiles={!files ? [] : (files as FileUploadProps['storedFiles'])}
				/>
			</Step1Styles>
		</BulkWizard>
	);
}
