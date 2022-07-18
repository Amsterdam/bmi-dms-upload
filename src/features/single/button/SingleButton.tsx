import React from 'react';
import { Button } from '@amsterdam/asc-ui';
import { useNavigate } from 'react-router-dom-v5-compat';
import { SingleStepsToRoutes } from '../single/constants';

const SingleButton: React.FC = () => {
	const navigate = useNavigate();
	return <Button onClick={() => navigate(SingleStepsToRoutes[1])}>Upload bestand</Button>;
};

export default SingleButton;
