import React from 'react';
import { Button } from '@amsterdam/asc-ui';
import { useNavigate } from 'react-router-dom';
import { STEP1 } from '../bulk/constants';

const BulkButton: React.FC = () => {
	const navigate = useNavigate();
	return <Button onClick={() => navigate(STEP1)}>Upload bestanden</Button>;
};

export default BulkButton;
