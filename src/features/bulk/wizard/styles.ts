import styled from 'styled-components';
import { ComponentProps, FC } from 'react';
import { Alert, Heading, themeSpacing } from '@amsterdam/asc-ui';
import { Modal } from '@amsterdam/bmi-component-library';

export const ModalContentStyle = styled.div`
	padding: ${themeSpacing(8)};
`;

export const ModalStyle = styled(Modal)`
	max-width: 1200px !important;
	margin: 1rem;
`;

export const ModalTopBarStyle: FC<ComponentProps<typeof Heading>> = styled(Heading)`
	font-size: 18px;
	line-height: 25px;
	font-weight: 700;
`;

export const AlertStyle: FC<ComponentProps<typeof Alert>> = styled(Alert)`
	margin-bottom: ${themeSpacing(8)};
`;
