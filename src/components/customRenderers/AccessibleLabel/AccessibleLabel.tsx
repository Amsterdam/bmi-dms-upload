import React, { ComponentProps } from 'react';
import { Label } from '@amsterdam/asc-ui';

interface Props extends ComponentProps<typeof Label> {
	isRequired: boolean;
	isRequiredLabel?: string;
}

const AccessibleLabel = ({ label, htmlFor, isRequired, isRequiredLabel = '*' }: Props) => {
	return (
		<Label
			htmlFor={htmlFor}
			test-id={`schaap`}
			label={
				<>
					{label} {isRequired && <i aria-hidden="true">{isRequiredLabel}</i>}
				</>
			}
		/>
	);
};

export default AccessibleLabel;
