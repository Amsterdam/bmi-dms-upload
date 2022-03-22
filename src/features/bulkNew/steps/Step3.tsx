import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { STEP1 } from '../bulk/constants';

import { getFilesFromStore } from '../bulk/selectors';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';


export default function Step3<T>(props: Props<T>) {
	const filesFromStore = useSelector(getFilesFromStore)

	// Redirect to step1 when state is not correct
	if (filesFromStore?.length === 0) {
		return (<Navigate to={STEP1} />)
	} else {
		return <BulkWizard {...props}>Edit fields here</BulkWizard>;
	}

}
