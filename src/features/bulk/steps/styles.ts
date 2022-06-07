import styled from 'styled-components';
import { ComponentProps } from 'react';
import { Pagination, themeColor, themeSpacing } from '@amsterdam/asc-ui';

export const Step1Styles = styled.div`
	&& li {
		border-bottom: none;
	}
`;

export const StyledPaginationTop = styled(Pagination)<ComponentProps<typeof Pagination>>`
	display: flex;
	justify-content: center;
	background-color: ${themeColor('tint', 'level3')};
	padding-top: 0;
	margin: -${themeSpacing(8)} -${themeSpacing(8)} ${themeSpacing(6)};
`;

export const StyledPaginationBottom = styled(Pagination)<ComponentProps<typeof Pagination>>`
	display: flex;
	justify-content: center;
	background-color: ${themeColor('tint', 'level3')};
	margin: ${themeSpacing(6)} -${themeSpacing(8)} -${themeSpacing(8)};
`;
