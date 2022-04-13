import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { MetadataGenericType } from '../../../types';
import BulkMetadataForm from '../../../components/BulkMetadataForm/BulkMetadataForm';
import { BulkStepsToRoutes } from '../bulk/constants';
import { getFields, getFiles } from '../bulk/store/selectors';
import { setFieldData } from '../bulk/store/slice';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { convertBulkMetadataFieldToMetadataGenericType } from '../bulk/utils';

export interface Step2Props<T> extends Props<T> {}

export default function Step2<T>(props: Step2Props<T>) {
	const { metadataForm } = props;

	const dispatch = useAppDispatch();
	const files = useAppSelector(getFiles);
	const fields = useAppSelector(getFields);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);

	const handleOnChange = useCallback(
		(data: MetadataGenericType, valid: boolean) => {
			if (JSON.stringify(data) !== JSON.stringify(convertBulkMetadataFieldToMetadataGenericType(fields)))
				dispatch(setFieldData(data));
			setIsValidForm(valid);
		},
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
					data={convertBulkMetadataFieldToMetadataGenericType(fields)}
					onChange={handleOnChange}
				/>
			</BulkWizard>
		);
	}
}
