import { transparentize } from 'polished';
import styled from 'styled-components';
import { Button, themeSpacing, themeColor, breakpoint, Heading } from '@amsterdam/asc-ui';
import { ComponentProps } from 'react';

export interface Props {
	backdropOpacity?: number;
	zIndexOffset?: number;
}

export const ButtonStyles = styled(Button)`
	justify-content: center;
	margin-right: ${themeSpacing(2)};
`;

export const BackDropStyle = styled.div<Props>`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: absolute;
	z-index: ${({ zIndexOffset }) => (zIndexOffset ? 999 + zIndexOffset : 999)};
	background-color: ${({ backdropOpacity, theme }) =>
		transparentize(backdropOpacity || 0.3, themeColor('tint', 'level7')({ theme }))};
`;

export const DialogStyle = styled.div<Props>`
	max-width: 90%;
	max-height: 90vh;
	overflow: visible;
	position: absolute;
	z-index: ${({ zIndexOffset }) => (zIndexOffset ? 1000 + zIndexOffset : 1000)};
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	background: white;

	&.modal-xs {
		max-width: 320px; /* breakpoint phone */
	}

	&.modal-sm {
		max-width: 540px; /* breakpoint tabletS */
	}

	&.modal-md {
		max-width: 768px; /* breakpoint tabletM */
	}

	&.modal-lg {
		max-width: 1024px; /* breakpoint laptop */
	}

	&.modal-xl {
		max-width: 1920px; /* breakpoint desktop */
	}
`;

export const DialogTopBarStyle = styled(Heading)<ComponentProps<typeof Heading>>`
	font-size: 18px;
	line-height: 25px;
	font-weight: 700;
`;

export const DialogBlockStyle = styled.div`
	display: block;
	padding: 0 ${themeSpacing(3)};
	margin: ${themeSpacing(3)} 0;

	@media screen and ${breakpoint('min-width', 'tabletM')} {
		padding: ${themeSpacing(0)} ${themeSpacing(7)};
		margin: ${themeSpacing(7)} 0;
	}
`;
