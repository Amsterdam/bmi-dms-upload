import styled from 'styled-components';
import { themeColor, themeSpacing } from '@amsterdam/asc-ui';

const RowStyles = styled.div`
	display: flex;
	flex-flow: row nowrap;
	place-content: start;
	border-bottom: 1px solid ${themeColor('tint', 'level3')};
	padding: ${themeSpacing(1)} ${themeSpacing(2)};

	> label,
	> div {
		flex: 1 0 auto;
		width: 50%;
	}

	> label {
		font-weight: 400;
		align-items: normal;
		margin: ${themeSpacing(1)} 0;
	}

	[role='alert'] {
		margin: ${themeSpacing(2)} 0;
	}
`;

export default RowStyles;
