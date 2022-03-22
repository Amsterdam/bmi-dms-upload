
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from '@amsterdam/asc-ui';
import { push } from 'redux-first-history';

import { CurrentStep } from '../single/model';
import { STEP1, STEP2 } from '../single/constants';
import { getCurrentStepFromStore } from '../single/selectors';
import { setCurrentStep } from '../single/slice';

const SingleButton: React.FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const currentStepFromStore = useSelector(getCurrentStepFromStore);

	useEffect(() => {
		let currentStep = CurrentStep.Button;
		switch (location.pathname) {
			case STEP1:
				currentStep = CurrentStep.Upload;
				break;
			case STEP2:
				currentStep = CurrentStep.SelectFields;
				break;
			default:
				break;
		}

		if (currentStepFromStore !== currentStep) {
			dispatch(setCurrentStep(currentStep));
		}
	}, [location]);

	return <Button onClick={() => dispatch(push(STEP1))}>Upload bestand</Button>;
};

export default SingleButton;
