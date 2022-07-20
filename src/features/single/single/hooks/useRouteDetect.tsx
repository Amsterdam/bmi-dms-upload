import { useEffect } from 'react';
import { useLocation } from 'react-router-dom-v5-compat';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCurrentStep } from '../store/selectors';
import { setCurrentStep } from '../store/slice';
import { SingleRoutesToSteps } from '../constants';
import { appendTrailingSlash } from '../../../../utils';

export function useRouteDetect(basePath = '/') {
	const currentStep = useAppSelector(getCurrentStep);
	const dispatch = useAppDispatch();
	const location = useLocation();

	const step = SingleRoutesToSteps.get(location.pathname.replace(appendTrailingSlash(basePath), '/'));

	useEffect(() => {
		if (step && step !== currentStep) dispatch(setCurrentStep(step));
	}, [currentStep, step]);

	return step;
}
