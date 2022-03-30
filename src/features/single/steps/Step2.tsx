import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { MetadataGenericType } from '../../../types';
import MetadataForm from '../../../components/MetadataForm/MetadataForm';
import { STEP1 } from '../single/constants';
import { getFileFromStore } from '../single/selectors';
import { Props } from '../single/types';
import SingleWizard from '../wizard/SingleWizard';
import { setMetadata } from '../single/slice';

export default function Step2<T>(props: Props<T>) {
	const { metadataForm } = props;
	const fileFromStore = useAppSelector(getFileFromStore);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleOnChange = useCallback((data: MetadataGenericType, valid: boolean) => {
		dispatch(setMetadata(data));
		setIsValidForm(valid);
	}, []);

	// Redirect to step1 when state is not correct
	if (!fileFromStore) {
		return <Navigate to={STEP1} />;
	} else {
		return (
			<SingleWizard {...props} isValidForm={isValidForm}>
				<MetadataForm {...metadataForm} onChange={handleOnChange} />
			</SingleWizard>
		);
	}
}
