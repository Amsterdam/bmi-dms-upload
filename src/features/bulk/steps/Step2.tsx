import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { CustomJsonSchema, MetadataGenericType } from '../../../types';
import BulkMetadataForm from '../../../components/BulkMetadataForm/BulkMetadataForm';
import { STEP1 } from '../bulk/constants';
import { getFilesFromStore } from '../bulk/selectors';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFieldData } from '../bulk/slice';

export interface Step2Props<T> extends Props<T> {
}

export default function Step2<T>(props: Step2Props<T>) {
	const { metadataForm, metadataFields } = props;

	const dispatch = useAppDispatch();
	const [localData, setLocalData] = useState<CustomJsonSchema>(metadataForm.data)
	const filesFromStore = useAppSelector(getFilesFromStore);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);

	const handleOnChange = useCallback((data: MetadataGenericType, valid: boolean) => {
		dispatch(setFieldData(data))
		setLocalData(data);
		setIsValidForm(valid);
	}, [metadataFields, metadataForm])

	// Redirect to step1 when state is not correct
	if (filesFromStore?.length === 0) {
		return <Navigate to={STEP1} />;
	} else {
		return (
			<BulkWizard {...props} isValidForm={isValidForm}>
				<BulkMetadataForm
					schema={metadataForm.schema}
					uischema={metadataForm.uischema}
					renderers={metadataForm.renderers}
					data={localData}
					onChange={handleOnChange}
				/>
			</BulkWizard>
		);
	}
}
