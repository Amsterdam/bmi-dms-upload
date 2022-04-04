
import React, { useEffect } from 'react';
import { Button } from '@amsterdam/asc-ui';
import { push } from 'redux-first-history';

import { useAppDispatch } from '../../hooks';
import { initCurrentStep } from '../single/slice';
import { STEP1 } from '../single/constants';

const SingleButton: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initCurrentStep(location.pathname))
	}, [location]);

	return <Button onClick={() => dispatch(push(STEP1))}>Upload bestand</Button>;
};

export default SingleButton;
