import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Label, TextField as ASCTextField } from '@amsterdam/asc-ui';
import { ControlProps } from '@jsonforms/core';

const DateField = ({ data: value = '', path, label, handleChange }: ControlProps) => {
	return (
		<>
			{label && <Label htmlFor={path} label={label} />}
			<ASCTextField
				id={path}
				value={value}
				type="date"
				name={path}
				onChange={(e) => handleChange(path, e.currentTarget.value)}
			/>
		</>
	);
};

export default withJsonFormsControlProps(DateField);
