import React from 'react';
import { Route, Routes } from 'react-router-dom-v5-compat';

import withCustomProvider from '../../../features/withCustomProvider';
import BulkButton from '../button/BulkButton';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import Step3 from '../steps/Step3';

import { Props } from './types';
import { useRouteDetect } from './hooks/useRouteDetect';

const NoRoute = () => <></>;

export function Bulk<T>(props: Props<T>) {
	useRouteDetect();

	return (
		<React.Fragment>
			<BulkButton />
			<Routes>
				<Route path="/bulk/step1" element={<Step1 {...props} />} />
				<Route path="/bulk/step2" element={<Step2 {...props} />} />
				<Route path="/bulk/step3" element={<Step3 {...props} />} />
				<Route path="*" element={<NoRoute />} />
			</Routes>
		</React.Fragment>
	);
}

export default withCustomProvider(Bulk);
