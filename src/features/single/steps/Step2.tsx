import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom-v5-compat';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { MetadataGenericType } from '../../../types';
import MetadataForm from '../../../components/MetadataForm/MetadataForm';
import { SingleStepsToRoutes } from '../single/constants';
import { Props } from '../single/types';
import { getFile } from '../single/store/selectors';
import { setMetadata } from '../single/store/slice';
import { SingleWizard } from '../wizard/SingleWizard';
import { buildPath } from '../../../utils';

export default function Step2<T>(props: Props<T>) {
	const { metadataForm, basePath } = props;
	const file = useAppSelector(getFile);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleOnChange = useCallback((data: MetadataGenericType, valid: boolean) => {
		dispatch(setMetadata(data));
		setIsValidForm(valid);
	}, []);

	// Redirect to step1 when state is not correct
	if (!file) {
		return <Navigate to={buildPath(basePath ?? '/', SingleStepsToRoutes.STEP1)} />;
	} else {
		return (
			<SingleWizard {...props} isValidForm={isValidForm}>
				<MetadataForm {...metadataForm} onChange={handleOnChange} />
			</SingleWizard>
		);
	}
}
