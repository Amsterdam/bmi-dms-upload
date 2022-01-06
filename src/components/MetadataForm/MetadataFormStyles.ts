import styled from 'styled-components';
import { ComponentProps } from 'react';
import { Heading, themeSpacing } from '@amsterdam/asc-ui';

export const MetadataFormStyle = styled.form`
	display: flex;
	flex-direction: column;
`;

export const StyledHeading = styled(Heading)<ComponentProps<typeof Heading>>`
	margin-bottom: ${themeSpacing(6)};
`;
