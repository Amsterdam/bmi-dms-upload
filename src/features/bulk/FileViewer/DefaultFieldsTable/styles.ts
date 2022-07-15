import styled from 'styled-components';
import { DescriptionListItem } from '@amsterdam/asc-ui';
import { ComponentProps, FC } from 'react';

export const StyledDescriptionListItem: FC<ComponentProps<typeof DescriptionListItem>> = styled(DescriptionListItem)`
	dt,
	dd {
		width: 50%;
	}
`;
