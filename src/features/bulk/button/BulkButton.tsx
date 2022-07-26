import React from 'react';
import { Button } from '@amsterdam/asc-ui';
import { useNavigate } from 'react-router-dom-v5-compat';
import { BulkStepsToRoutes } from '../bulk/constants';
import { stripTrailingSlash } from '../../../utils';

type Props = {
	basePath: string;
};

const BulkButton: React.FC<Props> = ({ basePath }) => {
	const navigate = useNavigate();
	return (
		<Button onClick={() => navigate(stripTrailingSlash(basePath) + BulkStepsToRoutes[1])}>Upload bestanden</Button>
	);
};

export default BulkButton;
