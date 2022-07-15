import { Heading, themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';
import { ComponentProps, FC } from 'react';

export const ModalContentStyle = styled.div`
	padding: ${themeSpacing(8)};
`;

export const ModalTopBarStyle: FC<ComponentProps<typeof Heading>> = styled(Heading)`
	font-size: 18px;
	line-height: 25px;
	font-weight: 700;
`;
