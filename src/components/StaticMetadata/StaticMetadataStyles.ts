
import styled from 'styled-components';
import { DescriptionList } from '@amsterdam/bmi-component-library';
import { themeColor, themeSpacing } from '@amsterdam/asc-ui';

export const DescriptionListStyle = styled(DescriptionList)`
	background-color: ${themeColor('tint', 'level1')};

	/* stylelint-disable nesting-selector-no-missing-scoping-root */
	&& {
		div {
			display: flex;
			width: 100%;
		}

		span {
			margin-right: ${themeSpacing(1)};
		}

		dl {
			display: flex;
			box-sizing: border-box;
			flex-flow: row wrap;
			width: 100%;
		}

		dt {
			width: 25%;
			box-sizing: border-box;
		}

		dd {
			width: 75%;
			box-sizing: border-box;
		}
	}
`;
