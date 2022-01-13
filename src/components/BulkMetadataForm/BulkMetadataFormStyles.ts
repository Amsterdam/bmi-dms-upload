import styled from 'styled-components';

const BulkMetadataFormStyles = styled.div`
	input[type='text'] {
		margin: 3px 0 6px;
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
		margin: 0 8px !important;

		.MuiGrid-item {
			padding: 4px 0 0;
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
		}

		> label + div:nth-of-type(2) {
			margin-top: -3px !important;
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
		margin-top: 0;
		text-align: left;
		margin-bottom: 5px;
	}
`;

export default BulkMetadataFormStyles;
