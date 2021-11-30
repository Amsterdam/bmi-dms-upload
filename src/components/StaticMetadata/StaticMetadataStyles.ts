import styled from 'styled-components';
import { DescriptionList } from '@amsterdam/bmi-component-library';

export const DescriptionListStyle = styled(DescriptionList)`
	&& {
		div {
			display: flex;
			width: 100%;
		}

		span {
			margin-right: 2px;
		}

		dl {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
		}

		dt {
			width: 25%;
		}

		dd {
			width: 75%;
		}
	}
`;
