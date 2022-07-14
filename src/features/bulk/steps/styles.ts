import styled from 'styled-components';
import { ComponentProps, FC } from 'react';
import { Pagination, themeSpacing } from '@amsterdam/asc-ui';

export const Step1Styles = styled.div`
	&& li {
		border-bottom: none;
	}
`;

export const StyledPaginationTop: FC<ComponentProps<typeof Pagination>> = styled(Pagination)`
	display: flex;
	justify-content: center;
	padding-top: 0;
	margin: -${themeSpacing(8)} -${themeSpacing(8)} ${themeSpacing(6)};
`;

export const StyledPaginationBottom: FC<ComponentProps<typeof Pagination>> = styled(Pagination)`
	display: flex;
	justify-content: center;
	margin: ${themeSpacing(6)} -${themeSpacing(8)} -${themeSpacing(8)};
`;
