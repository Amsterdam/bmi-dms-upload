import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom-v5-compat';
import debounce from 'debounce';
import { Heading } from '@amsterdam/asc-ui';

import { getFields, getFiles } from '../bulk/store/selectors';
import { setFields, setFileMetadata } from '../bulk/store/slice';

import BulkWizard from '../wizard/BulkWizard';
import BulkMetadataForm from '../../../components/BulkMetadataForm/BulkMetadataForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { convertBulkFieldsToMetadataGenericTypes, identicalObjects, reduceFieldData } from '../bulk/utils';
import { buildPath } from '../../../utils';
import { BulkStepsToRoutes, DEFAULT_DEBOUNCE } from '../bulk/constants';

import { MetadataGenericType } from '../../../types';
import { BulkUploadProps } from '../bulk/types';

export interface Step2Props<T> extends BulkUploadProps<T> {}

export default function Step2<T>(props: Step2Props<T>) {
	const { metadataForm, basePath } = props;

	const dispatch = useAppDispatch();
	const files = useAppSelector(getFiles);
	const fields = useAppSelector(getFields);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);

	const handleOnChange = useCallback(
		debounce((data: MetadataGenericType, valid: boolean) => {
			if (fields && !identicalObjects(data, convertBulkFieldsToMetadataGenericTypes(fields))) {
				const newFields = reduceFieldData(data, fields);
				dispatch(setFields(newFields));

				// Filter metadata
				// This filters obsolete metadata from files when changeIndividual is removed on the field.
				newFields
					.filter((field) => !field.changeIndividual)
					.forEach((field) => {
						files.find((file) => {
							if (!file.metadata) return false;
							const newMetadata = file.metadata.filter((metadata) => metadata?.id !== field.id);
							if (identicalObjects(file.metadata, newMetadata)) return false;

							dispatch(
								setFileMetadata({
									fileId: file.id,
									metadata: newMetadata,
								}),
							);
						});
					});
			}
			setIsValidForm(valid);
		}, DEFAULT_DEBOUNCE),
		[fields],
	);

	// Redirect to step1 when state is not correct
	if (files?.length === 0) {
		return <Navigate to={buildPath(basePath, BulkStepsToRoutes[1])} />;
	} else {
		return (
			<BulkWizard {...props} isValidForm={isValidForm}>
				<Heading forwardedAs="h2">Bulk metadata toevoegen</Heading>
				<BulkMetadataForm
					schema={metadataForm.schema}
					uischema={metadataForm.uischema}
					renderers={metadataForm.renderers}
					data={convertBulkFieldsToMetadataGenericTypes(fields)}
					onChange={handleOnChange}
				/>
			</BulkWizard>
		);
	}
}
