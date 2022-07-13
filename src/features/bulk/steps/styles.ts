import styled from 'styled-components';
import { ComponentProps } from 'react';
import { Pagination, themeSpacing } from '@amsterdam/asc-ui';

export const Step1Styles = styled.div`
	&& li {
		border-bottom: none;
	}
`;

export const StyledPaginationTop = styled(Pagination)<ComponentProps<typeof Pagination>>`
	display: flex;
	justify-content: center;
	padding-top: 0;
	margin: -${themeSpacing(8)} -${themeSpacing(8)} ${themeSpacing(6)};
`;

export const StyledPaginationBottom = styled(Pagination)<ComponentProps<typeof Pagination>>`
	display: flex;
	justify-content: center;
	margin: ${themeSpacing(6)} -${themeSpacing(8)} -${themeSpacing(8)};
`;
