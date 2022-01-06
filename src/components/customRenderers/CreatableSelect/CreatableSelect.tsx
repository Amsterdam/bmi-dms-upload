import React, { useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Label, ErrorMessage } from '@amsterdam/asc-ui';
import { CreatableSelect as Creatable } from '@amsterdam/bmi-component-library';
import { ControlProps } from '@jsonforms/core';
import useCustomControl from '../../../hooks/useCustomControl';

const CreatableSelect = (props: ControlProps) => {
	const {
		data: value = '',
		path,
		label,
		errors,
		schema: { oneOf: options = [] },
	} = props;
	const { isValid, isDirty, isFocused, onFocus, onBlur, onChange } = useCustomControl(props);
	const [selected, setSelected] = useState<string>(value);

	return (
		<>
			{label && <Label htmlFor={path} label={label} />}
			<div>
				<Creatable
					inputId={path}
					value={
						value
							? {
									label: value,
									value: value,
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  }
							: undefined
					}
					// @ts-ignore
					onChange={(option: any) => {
						const value = option ? (option.value ? (option.value === 'null' ? null : option.value) : null) : null;
						// Emulate onChange event object
						onChange({ currentTarget: { value } });
						setSelected(value);
					}}
					isClearable
					options={options.map(({ const: value, title: label }) => ({
						value,
						label,
					}))}
					error={!isValid && isDirty}
					onFocus={onFocus}
					// Emulate onBlur event object
					onBlur={() => onBlur({ currentTarget: { value: selected } })}
				/>
				{!isValid && !isFocused && isDirty && <ErrorMessage message={errors} />}
			</div>
		</>
	);
};

export default withJsonFormsControlProps(CreatableSelect);
