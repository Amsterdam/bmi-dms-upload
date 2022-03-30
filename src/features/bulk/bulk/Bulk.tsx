import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CustomJsonSchema, MetadataGenericType } from '../../../types';
import BulkButton from '../button/BulkButton';
import { Props } from './types';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import Step3 from '../steps/Step3';
import { setFieldData } from './slice';
import { useAppDispatch } from '../../hooks';

const NoRoute = () => <></>;

export default function Bulk<T>(props: Props<T>) {
	const { metadataForm, metadataFields } = props;

	const dispatch = useAppDispatch();
	const [localData, setLocalData] = useState<CustomJsonSchema>(metadataForm.data)

	const handleOnChange = useCallback((data: MetadataGenericType, valid: boolean) => {
		dispatch(setFieldData(data))
		setLocalData(data);
		// setIsValidForm(valid); @todo
	}, [metadataFields, metadataForm])

	return (
		<React.Fragment>
			<BulkButton />
			<Routes>
				<Route path="/bulk/step1" element={<Step1 {...props} />} />
				<Route path="/bulk/step2" element={<Step2 {...props} onChange={handleOnChange} localData={localData} />} />
				<Route path="/bulk/step3" element={<Step3 {...props} />} />
				<Route path="*" element={<NoRoute />} />
			</Routes>
		</React.Fragment>
	);
}
