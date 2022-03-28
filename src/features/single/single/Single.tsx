import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SingleButton from '../button/SingleButton';
import { Props } from './types';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';

const NoRoute = () => <></>;

export default function Bulk<T>(props: Props<T>) {
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
