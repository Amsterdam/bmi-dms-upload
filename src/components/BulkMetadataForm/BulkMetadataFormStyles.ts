import styled from 'styled-components';
import { themeSpacing } from '@amsterdam/asc-ui';

const BulkMetadataFormStyles = styled.div`
	input[type='text'] {
		margin: ${themeSpacing(3, 0, 6)};
	}

	.MuiGrid-item {
		text-align: center;
	}

	.MuiGrid-spacing-xs-2 div:nth-of-type(2) {
		div:first-of-type {
			width: 100%;
		}
	}

	.MuiCardContent-root .MuiGrid-container .MuiGrid-item .MuiGrid-container > div:first-of-type {
		flex-grow: 2;
	}

	.MuiCardContent-root .MuiGrid-container .MuiGrid-item .MuiGrid-container > div:nth-of-type(2) > label > span {
		width: 100%;
	}

	.MuiGrid-spacing-xs-2 {
		margin: ${themeSpacing(0, 2)} !important;

		.MuiGrid-item {
			padding: ${themeSpacing(1, 0, 0)};
		}
	}

	.MuiGrid-container .MuiGrid-item .MuiGrid-container .MuiGrid-item {
		display: flex;
		flex-flow: row nowrap;
		justify-content: normal;
		align-items: normal;
		align-content: normal;
		border-bottom: 1px solid #e6e6e6;

		> label {
			display: flex !important;
			align-items: center !important;
		}

		> label,
		> label + div:first-of-type {
			width: 50%;
			display: block;
			flex: 1 1 auto;
			align-self: auto;
			order: 0;
			margin-bottom: ${themeSpacing(1)};
		}

		> label + div:nth-of-type(2) {
			margin-top: ${themeSpacing(-1)} !important;
			text-align: left;
		}
	}

	input[type='checkbox'],
	.MuiFormControlLabel-root,
	span.MuiTypography-root {
		margin: 0;
	}

	.MuiPaper-elevation1 {
		box-shadow: none !important;
	}

	.MuiCardContent-root {
		padding: 0 !important;
	}

	.MuiGrid-container {
		flex-wrap: nowrap;
	}

	div[role='alert'] {
		text-align: left;
		margin: ${themeSpacing(1, 0)};
	}
`;

export default BulkMetadataFormStyles;
