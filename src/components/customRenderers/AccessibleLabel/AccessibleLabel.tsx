import React, { ComponentProps } from 'react';
import { Label } from '@amsterdam/asc-ui';
import { StyledVisibleHidden } from './styles'

interface Props extends ComponentProps<typeof Label>{
	isRequired: boolean;
	isRequiredLabel?: string;
};

const AccessibleLabel = (props: Props) => {
	const { label, htmlFor, isRequired, isRequiredLabel = '*' } = props;
	return (
		<Label
			htmlFor={htmlFor}
			test-id={`schaap`}
			label={
				<>
					{label}{' '}
					{isRequired && (
						<>
							<i aria-hidden="true">{isRequiredLabel}</i>
							<StyledVisibleHidden>required</StyledVisibleHidden>
						</>
					)}
				</>
			}
		/>
	);
};

export default AccessibleLabel;
