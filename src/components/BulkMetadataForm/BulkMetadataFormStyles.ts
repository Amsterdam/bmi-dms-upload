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
		margin: ${themeSpacing(1, 0)};
	}

	.MuiPaper-elevation1 {
		box-shadow: none;

		.MuiCardContent-root {
			padding: 0;

			.MuiGrid-container {
				flex-wrap: nowrap;

				.MuiGrid-item {
					.MuiGrid-container {
						text-align: center;
						margin: ${themeSpacing(0, 2)};

						div {
							&:nth-of-type(2) {
								label span {
									width: 100%;
								}
							}
						}

						.MuiGrid-item {
							display: flex;
							flex-flow: row nowrap;
							justify-content: normal;
							align-items: normal;
							align-content: normal;
							border-bottom: 1px solid #e6e6e6;
							padding: ${themeSpacing(0)};

							label,
							label + div {
								&:first-of-type {
									width: 50%;
									display: block;
									flex: 1 1 auto;
									align-self: auto;
									order: 0;
									margin: ${themeSpacing(1)};
								}

								&:nth-of-type(2) {
									margin-top: ${themeSpacing(-1)};
									text-align: left;
								}
							}

							&:nth-of-type(2) div:first-of-type {
								width: 100%;
								padding-top: ${themeSpacing(2)};
							}

							&:first-of-type label {
								&:first-of-type {
									display: flex;
									align-items: flex-start;
									overflow: hidden;
								}
								flex-grow: 2;
							}
						}
					}
				}
			}
		}
	}
`;

export default BulkMetadataFormStyles;
