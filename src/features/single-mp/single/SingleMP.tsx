import React, { useEffect } from 'react';
import { FileUploadProps } from '@amsterdam/bmi-component-library';
import { useDispatch } from 'react-redux';
import { useRouteDetect } from '../../single/single/hooks/useRouteDetect';
import { setBasePath } from '../../single/single/store/slice';
import { Route, Routes } from 'react-router-dom-v5-compat';
import { Step1MP } from '../../single-mp/steps/Step1MP';
import withCustomProvider from '../../withCustomProvider';
import { SingleButtonMP } from '../button/SingleButtonMP';

type SingleMPProps<T> = Partial<FileUploadProps> & {
	label: string;
	limit: number;
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
			<SingleButtonMP basePath={basePath} />
			<Routes>
				<Route path={`single-mp/step1`} element={<Step1MP label={props.label + ' blah'} limit={props.limit}/>} />
				<Route path="*" element={<NoRoute />} />
			</Routes>
		</React.Fragment>
	);
};

export { SingleMP, SingleMPProps };
export default withCustomProvider(SingleMP);
