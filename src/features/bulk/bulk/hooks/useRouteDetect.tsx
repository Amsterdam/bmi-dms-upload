import { useEffect } from 'react';
import { useLocation } from 'react-router-dom-v5-compat';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCurrentStep } from '../store/selectors';
import { setCurrentStep } from '../store/slice';
import { BulkRoutesToSteps } from '../constants';

export function useRouteDetect() {
	const currentStep = useAppSelector(getCurrentStep);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const step = BulkRoutesToSteps.get(location.pathname);

	useEffect(() => {
		if (step && step !== currentStep) dispatch(setCurrentStep(step));
	}, [currentStep, step]);

	return step;
}
