import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@amsterdam/asc-ui';
import { push } from 'redux-first-history';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CurrentStep } from '../bulk/model';
import { setCurrentStep } from '../bulk/slice';
import { STEP1, STEP2, STEP3 } from '../bulk/constants';
import { getCurrentStepFromStore } from '../bulk/selectors';

const BulkButton: React.FC = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const currentStepFromStore = useAppSelector(getCurrentStepFromStore);

	useEffect(() => {
		let currentStep = CurrentStep.Button;
		switch (location.pathname) {
			case STEP1:
				currentStep = CurrentStep.Upload;
				break;
			case STEP2:
				currentStep = CurrentStep.SelectFields;
				break;
			case STEP3:
				currentStep = CurrentStep.EditFields;
				break;

			default:
				break;
		}

		if (currentStepFromStore !== currentStep) {
			dispatch(setCurrentStep(currentStep));
		}
	}, [location]);

	return <Button onClick={() => dispatch(push(STEP1))}>Upload bestanden</Button>;
};

export default BulkButton;
