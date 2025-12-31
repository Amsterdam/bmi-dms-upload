import { stripTrailingSlash } from '../../../utils';
import { SingleStepsToRoutes } from '../../single/single/constants';
import { useNavigate } from 'react-router-dom-v5-compat';
import React from 'react';
import { Button } from '@amsterdam/asc-ui';

type SingleButtonMPProps = {
	basePath: string;
}

const SingleButtonMP: React.FC<SingleButtonMPProps> = ({ basePath }) => {
	const navigate = useNavigate();
	const onClick = () => navigate(stripTrailingSlash(basePath) + SingleStepsToRoutes.MP_STEP1);
	return (
		<Button onClick={onClick}>
			Upload file
		</Button>
	);
};

export { SingleButtonMP, SingleButtonMPProps };
