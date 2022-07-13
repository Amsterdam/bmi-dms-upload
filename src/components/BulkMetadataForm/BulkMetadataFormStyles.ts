import styled from 'styled-components';
import { themeSpacing } from '@amsterdam/asc-ui';

const BulkMetadataFormStyles = styled.div`
	input[type='text'] {
		margin: ${themeSpacing(3, 0, 6)};
	}

	input[type='checkbox'],
	.MuiFormControlLabel-root,
	span.MuiTypography-root {
		margin: 0;
	}

	div[role='alert'] {
		text-align: left;
		margin: ${themeSpacing(1, 0, 1, 1)};
	}

	.MuiPaper-elevation1 {
		box-shadow: none;
	}

	.MuiCardContent-root {
		padding: 0;
	}

	.MuiPaper-root {
		padding: ${themeSpacing(1, 0)};
	}

	div[id*='-listbox'],
	div[class*='-control'] {
		margin-left: ${themeSpacing(1)};
		width: 100%;
	}

	div[class*='-option-'] {
		margin-left: ${themeSpacing(-1)};
	}

	.MuiGrid-spacing-xs-2 {
		.MuiGrid-item {
			border-bottom: 1px solid #e6e6e6;
			margin-top: ${themeSpacing(-2)};
		}

		> div:last-child > div {
			width: 100%;
			text-align: center;
		}
	}

	.MuiGrid-container {
		flex-wrap: nowrap;
		margin: ${themeSpacing(0, 1)};

		.MuiGrid-item {
			display: flex;
			flex-flow: row nowrap;
			justify-content: normal;
			align-items: normal;
			align-content: normal;
			padding: ${themeSpacing(1, 0)};

			label,
			label + div:first-of-type {
				width: 100%;
				display: block;
				flex: 1 1 auto;
				align-self: auto;
				order: 0;
				margin: ${themeSpacing(0, 1)};
			}

			label + div:nth-of-type(2) {
				margin: ${themeSpacing(-1, 0)};
				text-align: left;
			}

			&:first-of-type {
				flex-grow: 2;

				label {
					&:first-of-type {
						display: flex;
						align-items: flex-start;
						overflow: hidden;
					}
				}
			}
		}
	}
`;

export default BulkMetadataFormStyles;
