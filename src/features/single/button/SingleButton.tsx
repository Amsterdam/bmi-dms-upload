import React from 'react';
import { Button } from '@amsterdam/asc-ui';
import { useNavigate } from 'react-router-dom-v5-compat';
import { SingleStepsToRoutes } from '../single/constants';
import { stripTrailingSlash } from '../../../utils';

type Props = {
	basePath: string;
};

const SingleButton: React.FC<Props> = ({ basePath }) => {
	const navigate = useNavigate();
	return (
		<Button onClick={() => navigate(stripTrailingSlash(basePath) + SingleStepsToRoutes.STEP1)}>Upload bestand</Button>
	);
};

export default SingleButton;
