import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom-v5-compat';
import { Heading } from '@amsterdam/asc-ui';

import { getFiles, getIsBulkMode } from '../bulk/store/selectors';

import BulkWizard from '../wizard/BulkWizard';
import FileViewer from '../FileViewer/FileViewer';
import { buildPath } from '../../../utils';
import { useAppSelector } from '../../hooks';

import { MetadataGenericType } from '../../../types';
import { BulkUploadProps } from '../bulk/types';
import { BulkStepsToRoutes } from '../bulk/constants';
import { StyledPaginationBottom, StyledPaginationTop } from './styles';

const LABEL_NEXT = 'Volgende document';
const LABEL_PREVIOUS = 'Vorige document';

export default function Step3<T>(props: BulkUploadProps<T>) {
	const { getDocumentViewUrl, basePath } = props;

	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const files = useAppSelector(getFiles);
	const isBulkMode = useAppSelector(getIsBulkMode);

	const showPaginationNav = files && isBulkMode;

	const handleOnFormChange = useCallback((data: MetadataGenericType, valid: boolean) => {
		setIsValidForm(valid);
	}, []);

	const handleOnPageChange = useCallback(
		(page: number) => {
			setCurrentPage(page);
			setCurrentFileIndex(page - 1);
		},
		[files],
	);

	// Redirect to step1 when state is not correct
	if (files?.length === 0) return <Navigate to={buildPath(basePath, BulkStepsToRoutes[1])} />;

	return (
		<BulkWizard {...props} isValidForm={isValidForm} canShowErrorMessage={true}>
			{showPaginationNav && (
				<StyledPaginationTop
					labelNext={LABEL_NEXT}
					labelPrevious={LABEL_PREVIOUS}
					collectionSize={files.length}
					pageSize={1}
					page={currentPage}
					onPageChange={handleOnPageChange}
				/>
			)}
			<Heading forwardedAs="h2">Individueel metadateren</Heading>
			{files && (
				<FileViewer
					file={files[currentFileIndex]}
					getDocumentViewUrl={getDocumentViewUrl}
					onChange={handleOnFormChange}
				/>
			)}
			{showPaginationNav && (
				<StyledPaginationBottom
					labelNext={LABEL_NEXT}
					labelPrevious={LABEL_PREVIOUS}
					collectionSize={files.length}
					pageSize={1}
					page={currentPage}
					onPageChange={handleOnPageChange}
				/>
			)}
		</BulkWizard>
	);
}
