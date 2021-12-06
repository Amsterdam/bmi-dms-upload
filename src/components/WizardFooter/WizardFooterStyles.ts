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
	padding: ${themeSpacing(2.5, 0)};
	vertical-align: text-top;
`;
export const ButtonPanelStyle = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	padding: ${themeSpacing(2.5, 0)};
`;
export const WizardButton = styled(Button)<ButtonProps>`
	margin-left: ${themeSpacing(1.25)};
`;
export const LeftActionStyle = styled.div`
	padding-left: ${themeSpacing(3.75)};
`;
export const RightActionStyle = styled.div`
	padding-right: ${themeSpacing(3.75)};
`;
