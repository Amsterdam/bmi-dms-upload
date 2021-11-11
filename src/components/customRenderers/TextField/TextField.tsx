import React, { useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Label, TextField as ASCTextField, ErrorMessage } from '@amsterdam/asc-ui';
import { ControlProps } from '@jsonforms/core';

const TextField = ({ data: value = '', path, label, handleChange, errors }: ControlProps) => {
	const [focused, setFocused] = useState<boolean>(false);
	const [isDirty, setIsDirty] = useState<boolean>(!!value);
	const isValid = errors.length === 0 && isDirty;

	return (
		<>
			{label && <Label htmlFor={path} label={label} />}
			<div>
				<ASCTextField
					id={path}
					value={value ?? ''}
					name={path}
					onChange={(e) => {
						if (e.currentTarget.value) setIsDirty(true);
						handleChange(path, e.currentTarget.value || undefined);
					}}
					error={!isValid && isDirty}
					onFocus={(e) => setFocused(true)}
					onBlur={(e) => setFocused(false)}
				/>
				{!isValid && !focused && isDirty && <ErrorMessage message={errors} />}
			</div>
		</>
	);
};

export default withJsonFormsControlProps(TextField);
