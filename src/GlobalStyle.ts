import { createGlobalStyle } from 'styled-components';
import { getValueFromTheme, themeColor } from '@amsterdam/asc-ui/lib/utils';

const GlobalStyle = createGlobalStyle`
	#content_wrapper {
		font-family: ${getValueFromTheme('typography.fontFamily')};
		color: ${themeColor('tint', 'level7')};
	}
`;

export default GlobalStyle;
