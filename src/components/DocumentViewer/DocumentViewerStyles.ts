import styled from 'styled-components';
import DocViewer from 'react-doc-viewer';
import { ComponentProps } from 'react';
import { svgFill, themeColor } from '@amsterdam/asc-ui/lib/utils';
import { themeSpacing } from '@amsterdam/asc-ui';

export const DocViewerStyle = styled(DocViewer)<ComponentProps<typeof DocViewer>>`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: ${themeColor('tint', 'level1')} !important;

	& div#file-name {
		margin-left: 0;
	}

	& div#no-renderer {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;

		& a#no-renderer-download {
			margin: ${themeSpacing(2)};
			color: ${themeColor('primary')};
			font-size: 18px;
			border-radius: 0;
			box-shadow: unset;
			${svgFill(themeColor('primary'))};

			&:hover {
				color: ${themeColor('secondary')};
				${svgFill(themeColor('secondary'))};
			}
		}
	}
`;
