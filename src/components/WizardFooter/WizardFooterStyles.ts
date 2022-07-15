import styled from 'styled-components';
import { Button, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import { ComponentProps, FC } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

export const ButtonPanelStyle = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	padding: ${themeSpacing(2, 4)};
	background-color: ${themeColor('tint', 'level3')};
`;

export const SaveButton: FC<ButtonProps> = styled(Button)`
	margin-left: ${themeSpacing(2)};
`;

export const NextButton: FC<ButtonProps> = styled(Button)`
	margin-left: ${themeSpacing(2)};
	margin-right: 15px !important;
`;

export const RightActionStyle = styled.div`
	display: flex;
`;
