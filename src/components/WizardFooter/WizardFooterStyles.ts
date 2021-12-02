import styled from 'styled-components';
import { Button } from '@amsterdam/asc-ui';

export const PreviousButtonStyle = styled(Button)`
	text-align: right;
	padding: 0 20px;
	vertical-align: text-top;
`;

export const CancelButtonStyle = styled(Button)`
	text-align: left;
	padding: 10px 0;
	vertical-align: text-top;
`;

export const ButtonPanelStyle = styled('div')`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	padding: 10px 0;
`;

export const WizardButton = styled(Button)`
	margin-left: 5px;
`;

export const LeftActionStyle = styled('div')`
	padding-left: 15px;
`;

export const RightActionStyle = styled('div')`
	padding-right: 15px;
`;
