import styled from 'styled-components';

export const StyledVisibleHidden = styled.i`
	clip: rect(1px, 1px, 1px, 1px);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;

	&:focus {
		clip: auto;
		height: auto;
		overflow: auto;
		position: absolute;
		width: auto;
	}
`
