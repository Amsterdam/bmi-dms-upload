
import React from 'react';
import { Button } from '@amsterdam/asc-ui';
import { useNavigate } from 'react-router-dom';
import { STEP1 } from '../single/constants';

const SingleButton: React.FC = () => {
	const navigate = useNavigate();
	return <Button onClick={() => navigate(STEP1)}>Upload bestand</Button>;
};

export default SingleButton;
