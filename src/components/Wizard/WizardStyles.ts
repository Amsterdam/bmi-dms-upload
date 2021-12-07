import { Button, Heading, themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';

export const PreviousButtonStyle = styled(Button)`
	padding-right: 20px;
	vertical-align: text-top;
`;

export const CancelButtonStyle = styled(Button)`
	align-self: center;
	padding-left: 10px;
`;

export const ModalContentStyle = styled.div`
	padding: ${themeSpacing(8)};
`;

export const ModalTopBarStyle = styled(Heading)<ComponentProps<typeof Heading>>`
	font-size: 18px;
	line-height: 25px;
	font-weight: 700;
`;
