import React, { useEffect } from 'react';
import { FileUploadProps } from '@amsterdam/bmi-component-library';
import SingleButton from '../../single/button/SingleButton';
import { useDispatch } from 'react-redux';
import { useRouteDetect } from '../../single/single/hooks/useRouteDetect';
import { setBasePath } from '../../single/single/store/slice';
import { Route, Routes } from 'react-router-dom-v5-compat';
import { Step1MP } from '../../single-mp/steps/Step1MP';
import withCustomProvider from '../../withCustomProvider';

type SingleMPProps<T> = FileUploadProps & {
	label: string;
	basePath?: string;
	someValue: T;
}

const NoRoute = () => <></>;

const SingleMP = <T, >(props: SingleMPProps<T>) => {
	const dispatch = useDispatch();
	const basePath = props?.basePath ?? '/';

	useRouteDetect(basePath);

	useEffect(() => {
		dispatch(setBasePath(basePath));
	}, []);

	return (
		<React.Fragment>
			<SingleButton basePath={basePath} />
			<Routes>
				<Route path={`single/step1`} element={<Step1MP label={props.label} />} />
				<Route path="*" element={<NoRoute />} />
			</Routes>
		</React.Fragment>
	);
};

export { SingleMP, SingleMPProps };
export default withCustomProvider(SingleMP);
