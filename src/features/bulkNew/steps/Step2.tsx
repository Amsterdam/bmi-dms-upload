import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MetadataGenericType } from '../../../types';
import BulkMetadataForm from '../../../components/BulkMetadataForm/BulkMetadataForm';
import { STEP1 } from '../bulk/constants';
import { getFilesFromStore } from '../bulk/selectors';
import { Props } from '../bulk/types';
import BulkWizard from '../wizard/BulkWizard';

export interface Step2Props<T> extends Props<T> {
	localData: any
	onChange: (data: MetadataGenericType, valid: boolean) => void;
}

export default function Step2<T>(props: Step2Props<T>) {
	const { metadataForm, localData, onChange } = props;
	const filesFromStore = useSelector(getFilesFromStore)

	// Redirect to step1 when state is not correct
	if (filesFromStore?.length === 0) {
		return (<Navigate to={STEP1} />)
	} else {
		return (
			<BulkWizard {...props}>
				<BulkMetadataForm
					schema={metadataForm.schema}
					uischema={metadataForm.uischema}
					renderers={metadataForm.renderers}
					data={localData}
					onChange={onChange}
				/>
			</BulkWizard>
		);
	}

}
