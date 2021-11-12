import * as React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { ErrorMessage, Label, TextField as ASCTextField } from '@amsterdam/asc-ui';
import { ControlProps } from '@jsonforms/core';

const DateField = ({ data: value = '', path, label, handleChange, errors }: ControlProps) => {
	// TODO make custom hook like so and share it with TextField:
	// const { onFocus, onBlur, onChange, isDirty, isValid } = useCustomControl();
	const [focused, setFocused] = useState<boolean>(false);
	const [isDirty, setIsDirty] = useState<boolean>(!!value);
	const isValid = errors.length === 0 && isDirty;

	return (
		<>
			{label && <Label htmlFor={path} label={label} />}
			<div>
				<ASCTextField
					id={path}
					value={value}
					type="date"
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

export default withJsonFormsControlProps(DateField);
