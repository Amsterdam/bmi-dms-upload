import React from 'react';
import { Route, Routes } from 'react-router-dom';

import withCustomProvider from '../../../features/withCustomProvider';
import SingleButton from '../button/SingleButton';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';

import { Props } from './types';
import { useRouteDetect } from './hooks/useRouteDetect';

const NoRoute = () => <></>;

export function Single<T>(props: Props<T>) {
	useRouteDetect();

	return (
		<React.Fragment>
			<SingleButton />
			<Routes>
				<Route path="/single/step1" element={<Step1 {...props} />} />
				<Route path="/single/step2" element={<Step2 {...props} />} />
				<Route path="*" element={<NoRoute />} />
			</Routes>
		</React.Fragment>
	);
}

export default withCustomProvider(Single);
