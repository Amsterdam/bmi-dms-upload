import styled from 'styled-components';
import { DescriptionListItem } from '@amsterdam/asc-ui';
import { ComponentProps } from 'react';

export const StyledDescriptionListItem = styled(DescriptionListItem)<ComponentProps<typeof DescriptionListItem>>`
	dt,
	dd {
		width: 50%;
	}
`;
