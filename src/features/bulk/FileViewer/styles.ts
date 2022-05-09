import styled from 'styled-components';
import { themeSpacing } from '@amsterdam/asc-ui';
import { DescriptionList, DescriptionListItem } from '@amsterdam/asc-ui';
import { ComponentProps } from 'react';

export const FileViewerStyle = styled.div`
	display: flex;
	flex-direction: row;
`;

export const FileViewerFieldsStyle = styled.div`
	flex: 0 0 40%;
	padding-right: 1rem;
`;

export const FileViewerDocumentStyle = styled.div`
	overflow: auto;
	width: 100%;
`;
export const FileViewerDocumentInnerStyle = styled.div``;

export const IndividualFieldsFormStyle = styled.div`
	padding-bottom: ${themeSpacing(8)};
`;

export const StyledDescriptionList = styled(DescriptionList)<ComponentProps<typeof DescriptionList>>``;

export const StyledDescriptionListItem = styled(DescriptionListItem)<ComponentProps<typeof DescriptionListItem>>`
	dt,
	dd {
		width: 50%;
	}
`;
