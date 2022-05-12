import styled from 'styled-components';
import { DescriptionList, DescriptionListItem } from '@amsterdam/asc-ui';
import { ComponentProps } from 'react';

export const StyledDescriptionList = styled(DescriptionList)<ComponentProps<typeof DescriptionList>>``;

export const StyledDescriptionListItem = styled(DescriptionListItem)<ComponentProps<typeof DescriptionListItem>>`
	dt,
	dd {
		width: 50%;
	}
`;
