import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentStep } from './selectors';
import { BulkRoutesToSteps } from './constants';
import { setCurrentStep } from './slice';

function RouteDetect() {
	const currentStep = useAppSelector(getCurrentStep);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const step = BulkRoutesToSteps[location.pathname];

	useEffect(() => {
		if (step !== currentStep) dispatch(setCurrentStep(step));
	}, [currentStep, step]);

	return <></>;
}

export default RouteDetect;
