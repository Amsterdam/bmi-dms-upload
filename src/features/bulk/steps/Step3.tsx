import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Heading } from '@amsterdam/asc-ui';

import { MetadataGenericType } from '../../../types';
import { useAppSelector } from '../../hooks';
import FileViewer from '../FileViewer/FileViewer';

import { BulkStepsToRoutes } from '../bulk/constants';
import { getFiles } from '../bulk/store/selectors';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';
import { StyledPaginationBottom, StyledPaginationTop } from './styles';

const LABEL_NEXT = 'Volgende document';
const LABEL_PREVIOUS = 'Vorige document';

export default function Step3<T>(props: Props<T>) {
	const { getDocumentViewUrl } = props;

	const files = useAppSelector(getFiles);

	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const handleOnFormChange = useCallback((data: MetadataGenericType, valid: boolean) => {
		setIsValidForm(valid);
	}, []);
	const handleOnPageChange = useCallback(
		(page: number) => {
			setCurrentPage(page)
			setCurrentFileIndex(page - 1);
		},
		[files],
	);
	// Redirect to step1 when state is not correct
	if (files?.length === 0) {
		return <Navigate to={BulkStepsToRoutes[1]} />;
	} else {
		return (
			<BulkWizard {...props} isValidForm={isValidForm}>
				{files && (
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
				{files && (
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
}
