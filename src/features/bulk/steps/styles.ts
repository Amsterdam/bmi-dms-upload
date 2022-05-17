import styled from 'styled-components';
import { ComponentProps } from 'react';
import { Pagination, themeSpacing } from '@amsterdam/asc-ui';

export const Step1Styles = styled.div`
	&& li {
		border-bottom: none;
	}
`;

export const StyledPagination = styled(Pagination)<ComponentProps<typeof Pagination>>`
	display: flex;
	justify-content: center;
	padding-top: ${themeSpacing(4)};
`;
