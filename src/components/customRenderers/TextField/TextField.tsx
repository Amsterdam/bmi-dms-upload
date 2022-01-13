import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Label, TextField as ASCTextField, ErrorMessage } from '@amsterdam/asc-ui';
import { ControlProps } from '@jsonforms/core';
import useCustomControl from '../../../hooks/useCustomControl';

const TextField = (props: ControlProps) => {
	const { data: value = '', path, label, errors } = props;
	const { isValid, isDirty, isFocused, onFocus, onBlur, onChange, isRequired } = useCustomControl(props);

	return (
		<>
			{label && <Label htmlFor={path} label={label + (isRequired ? ' *' : '')} />}

			<div>
				<ASCTextField
					id={path}
					value={value ?? ''}
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

export default withJsonFormsControlProps(TextField);
