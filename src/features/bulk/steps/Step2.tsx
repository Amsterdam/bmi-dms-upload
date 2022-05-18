import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import debounce from 'debounce';

import { MetadataGenericType } from '../../../types';
import BulkMetadataForm from '../../../components/BulkMetadataForm/BulkMetadataForm';
import { BulkStepsToRoutes, DEFAULT_DEBOUNCE } from '../bulk/constants';
import { getFields, getFiles } from '../bulk/store/selectors';
import { setFields, setFileMetadata } from '../bulk/store/slice';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { convertBulkFieldsToMetadataGenericTypes, identicalObjects, reduceFieldData } from '../bulk/utils';

export interface Step2Props<T> extends Props<T> {}

export default function Step2<T>(props: Step2Props<T>) {
	const { metadataForm } = props;

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
				//
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
		return <Navigate to={BulkStepsToRoutes[1]} />;
	} else {
		return (
			<BulkWizard {...props} isValidForm={isValidForm}>
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
