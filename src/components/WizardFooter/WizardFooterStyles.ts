import styled from 'styled-components';
import { Button, themeSpacing } from '@amsterdam/asc-ui';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

export const PreviousButtonStyle = styled(Button)<ButtonProps>`
	text-align: right;
	padding: ${themeSpacing(0, 5)};
	vertical-align: text-top;
`;
export const CancelButtonStyle = styled(Button)<ButtonProps>`
	text-align: left;
	padding: ${themeSpacing(2, 0)};
	vertical-align: text-top;
`;
export const ButtonPanelStyle = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	padding: ${themeSpacing(2, 0)};
`;
export const WizardButton = styled(Button)<ButtonProps>`
	margin-left: ${themeSpacing(1)};
`;
export const LeftActionStyle = styled.div`
	padding-left: ${themeSpacing(4)};
`;
export const RightActionStyle = styled.div`
	padding-right: ${themeSpacing(4)};
`;
