import styled from 'styled-components';
import { transparentize } from 'polished';
import { themeColor } from '@amsterdam/asc-ui';

export interface Props {
	backdropOpacity?: number;
	zIndexOffset?: number;
}

export const BackDropStyle = styled.div<Props>`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: absolute;
	z-index: ${({ zIndexOffset }) =>
		zIndexOffset
			? 21 + zIndexOffset
			: 21}; /* The default z-index for the ASC Modal is 20. 21 puts it on top of another modal by default. */
	background-color: ${({ backdropOpacity, theme }) =>
		transparentize(backdropOpacity || 0.3, themeColor('tint', 'level7')({ theme }))};
`;
