import React from 'react';
import { Button } from '@amsterdam/asc-ui';
import { useNavigate } from 'react-router-dom-v5-compat';
import { BulkStepsToRoutes } from '../bulk/constants';

const BulkButton: React.FC = () => {
	const navigate = useNavigate();
	return <Button onClick={() => navigate(BulkStepsToRoutes[1])}>Upload bestanden</Button>;
};

export default BulkButton;
