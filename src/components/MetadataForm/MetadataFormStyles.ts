import styled from 'styled-components';
import { ComponentProps, FC } from 'react';
import { Heading, themeSpacing } from '@amsterdam/asc-ui';

export const MetadataFormStyle = styled.form`
	display: flex;
	flex-direction: column;
`;

export const StyledHeading: FC<ComponentProps<typeof Heading>> = styled(Heading)`
	margin-bottom: ${themeSpacing(6)};
`;
