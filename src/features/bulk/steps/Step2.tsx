import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import debounce from 'debounce';

import { MetadataGenericType } from '../../../types';
import BulkMetadataForm from '../../../components/BulkMetadataForm/BulkMetadataForm';
import { BulkStepsToRoutes, DEFAULT_DEBOUNCE } from '../bulk/constants';
import { getFields, getFiles } from '../bulk/store/selectors';
import { setFieldData, setFields, setFilesMetadata } from '../bulk/store/slice';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { convertBulkFieldsToMetadataGenericTypes, reduceFieldData } from '../bulk/utils';

export interface Step2Props<T> extends Props<T> {}

export default function Step2<T>(props: Step2Props<T>) {
	const { metadataForm } = props;

	const dispatch = useAppDispatch();
	const files = useAppSelector(getFiles);
	const fields = useAppSelector(getFields);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);

	const handleOnChange = useCallback(
		debounce((data: MetadataGenericType, valid: boolean) => {
			if (fields && JSON.stringify(data) !== JSON.stringify(convertBulkFieldsToMetadataGenericTypes(fields))) {
				const newFields = reduceFieldData(data, fields);
				dispatch(setFields(newFields));
				dispatch(setFilesMetadata(newFields));
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
