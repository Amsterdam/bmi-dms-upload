import styled from 'styled-components';
import { themeColor, themeSpacing } from '@amsterdam/asc-ui';

export const MetadataColumnHeadersStyle = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: start;
	align-content: start;
	border-bottom: 1px solid ${themeColor('tint', 'level3')};
	border-top: 1px solid ${themeColor('tint', 'level3')};
	padding: ${themeSpacing(3)} ${themeSpacing(2)};
`;

export const ColumnHeaderStyle = styled.span<{ width: number }>`
	flex: 1 0 auto;
	font-weight: 700;
	width: ${(props) => props.width}%;
`;
