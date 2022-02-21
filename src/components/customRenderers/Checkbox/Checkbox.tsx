import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Label, Checkbox as ASCCheckbox, ErrorMessage } from '@amsterdam/asc-ui';
import { ControlProps } from '@jsonforms/core';
import useCustomControl from '../../../hooks/useCustomControl';

const Checkbox = (props: ControlProps) => {
	const { data: value = '', path, label, errors, handleChange } = props;
	const { isValid, isDirty, isFocused, isRequired } = useCustomControl(props);

	return (
		<>
			{label && <Label htmlFor={path} label={label + (isRequired ? ' *' : '')} />}

			<div>
				<ASCCheckbox
					id={path}
					checked={value}
					onChange={(e) => handleChange(path, e.currentTarget.checked)}
					error={!isValid && isDirty}
				/>
				{!isValid && !isFocused && isDirty && <ErrorMessage message={errors} />}
			</div>
		</>
	);
};

export default withJsonFormsControlProps(Checkbox);
