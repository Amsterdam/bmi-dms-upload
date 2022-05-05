import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { ErrorMessage, Label, TextField as ASCTextField } from '@amsterdam/asc-ui';
import { ControlProps } from '@jsonforms/core';
import useCustomControl from '../../../hooks/useCustomControl';

const DateField = (props: ControlProps) => {
	const { data: value = '', path, label, errors } = props;
	const { isValid, isDirty, isFocused, onFocus, onBlur, onChange, isRequired } = useCustomControl(props);

	return (
		<>
			{label && <Label htmlFor={path} label={label + (isRequired ? ' *' : '')} />}
			<div>
				<ASCTextField
					id={path}
					value={value}
					type="date"
					name={path}
					onChange={onChange}
					error={!isValid && isDirty}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				{!isValid && !isFocused && isDirty && <ErrorMessage message={errors} />}
			</div>
		</>
	);
};

export default withJsonFormsControlProps(DateField);
