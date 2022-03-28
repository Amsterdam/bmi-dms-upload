import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { STEP1 } from '../bulk/constants';

import { getFilesFromStore } from '../bulk/selectors';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';


export default function Step3<T>(props: Props<T>) {
	const filesFromStore = useAppSelector(getFilesFromStore)

	// Redirect to step1 when state is not correct
	if (filesFromStore?.length === 0) {
		return (<Navigate to={STEP1} />)
	} else {
		return <BulkWizard {...props}>Edit fields here</BulkWizard>;
	}

}
