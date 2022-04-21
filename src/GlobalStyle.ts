import { createGlobalStyle } from 'styled-components';
import { getValueFromTheme, themeColor } from '@amsterdam/asc-ui/lib/utils';

const GlobalStyle = createGlobalStyle`
	#content_wrapper {
		font-family: ${getValueFromTheme('typography.fontFamily')};
		color: ${themeColor('tint', 'level7')};
	}

	.modal--bulk {
		max-width: 1200px !important;
	}
`;

export default GlobalStyle;
