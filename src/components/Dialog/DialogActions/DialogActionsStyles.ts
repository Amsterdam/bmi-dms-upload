import styled, { css } from 'styled-components';
import { themeColor, themeSpacing } from '@amsterdam/asc-ui';

export const DialogActionsCss = css`
	display: flex;
	padding: ${themeSpacing(4)} ${themeSpacing(4)};
	border-top: 2px solid ${themeColor('tint', 'level6')};
	background-color: ${themeColor('tint', 'level1')};
	text-align: right;
`;

export const DialogActionsStyle = styled.footer`
	${DialogActionsCss}
	justify-content: flex-end;
`;

export const DialogActionsSplitStyle = styled.footer`
	${DialogActionsCss}
	justify-content: space-between;
`;

export const DialogActionsLeftStyle = styled.div`
	display: flex;
`;

export const DialogActionsRightStyle = styled.div`
	display: flex;
`;
