import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom-v5-compat';
import { useDispatch } from 'react-redux';

import withCustomProvider from '../../../features/withCustomProvider';
import SingleButton from '../button/SingleButton';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';

import { Props } from './types';
import { useRouteDetect } from './hooks/useRouteDetect';
import { setBasePath } from './store/slice';

const NoRoute = () => <></>;

export function Single<T>(props: Props<T>) {
	const dispatch = useDispatch();
	useRouteDetect(props?.basePath ?? '/');

	useEffect(() => {
		dispatch(setBasePath(props?.basePath ?? '/'));
	}, []);

	return (
		<React.Fragment>
			<SingleButton basePath={props?.basePath ?? '/'} />
			<Routes>
				<Route path={`single/step1`} element={<Step1 {...props} />} />
				<Route path={`single/step2`} element={<Step2 {...props} />} />
				<Route path="*" element={<NoRoute />} />
			</Routes>
		</React.Fragment>
	);
}

export default withCustomProvider(Single);
