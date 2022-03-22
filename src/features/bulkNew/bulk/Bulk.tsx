import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CustomJsonSchema, MetadataGenericType } from '../../../types';
import BulkButton from '../button/BulkButton';
import { Props } from '../bulk/types';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import Step3 from '../steps/Step3';
import { useDispatch } from 'react-redux';
import { setFieldData } from './slice';

const NoRoute = () => <></>;

export default function Bulk<T>(props: Props<T>) {
	const { metadataForm, metadataFields } = props;

	const dispatch = useDispatch();
	const [localData, setLocalData] = useState<CustomJsonSchema>(metadataForm.data)

	const handleOnChange = useCallback((data: MetadataGenericType, valid: boolean) => {
		dispatch(setFieldData(data))
		setLocalData(data);
		// setIsValidForm(valid);
	}, [metadataFields, metadataForm])

	return (
		<React.Fragment>
			<BulkButton />
			<Routes>
				<Route path="/" element={<NoRoute />} />
				<Route path="/bulk/step1" element={<Step1 {...props} />} />
				<Route path="/bulk/step2" element={<Step2 {...props} onChange={handleOnChange} localData={localData} />} />
				<Route path="/bulk/step3" element={<Step3 {...props} />} />
				<Route path="*" element={<NoRoute />} />
			</Routes>
		</React.Fragment>
	);
}
