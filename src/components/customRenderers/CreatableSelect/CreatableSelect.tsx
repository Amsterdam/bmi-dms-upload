import React, { useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Label, ErrorMessage } from '@amsterdam/asc-ui';
import { CreatableSelect as Creatable } from '@amsterdam/bmi-component-library';
import { ControlProps, JsonSchema7 } from '@jsonforms/core';
import useCustomControl from '../../../hooks/useCustomControl';
import AccessibleLabel from '../AccessibleLabel/AccessibleLabel';

type SchemaOptionType = {
	const: string;
	title: string;
};

type SelectOptionType = {
	value: string;
	label: string;
};

function getOptionForValue(options: SchemaOptionType[], value: string): SelectOptionType | undefined {
	const option = options.find((option) => option.const === value);
	return option
		? {
				value: option.const,
				label: option.title,
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		: value
		? { value, label: value }
		: undefined;
}

function isInsideModal(id: string): boolean {
	return !!document.getElementById(id)?.closest('[role=dialog]');
}

const CreatableSelect = (props: ControlProps) => {
	const {
		data: value = '',
		path,
		label,
		errors,
		schema: { oneOf: options = [] },
	} = props;
	const filteredOptions = (options as JsonSchema7[]).filter((option: JsonSchema7) => option.const !== '')
	const { isValid, isDirty, isFocused, onFocus, onBlur, onChange, isRequired } = useCustomControl(props);
	const [selected, setSelected] = useState<SelectOptionType | undefined>(
		getOptionForValue(filteredOptions as SchemaOptionType[], value),
	);

	return (
		<>
			{label && <AccessibleLabel htmlFor={path} label={label} isRequired={isRequired} />}
			<div>
				<Creatable
					inputId={path}
					value={selected}
					// @ts-ignore
					onChange={(option: any) => {
						const val = option ? (option.value ? (option.value === 'null' ? null : option.value) : null) : null;
						const opt = getOptionForValue(filteredOptions as SchemaOptionType[], val);
						// Emulate onChange event object
						onChange({ currentTarget: { value: opt?.value ?? '' } });
						setSelected(opt);
					}}
					isClearable
					options={filteredOptions.map(({ const: value, title: label }) => ({
						value,
						label,
					}))}
					error={!isValid && isDirty}
					onFocus={onFocus}
					// Emulate onBlur event object
					onBlur={() => onBlur({ currentTarget: { value: selected?.value ?? '' } })}
					zIndexMenu={99999}
					// To avoid overflow issues in modal windows
					menuPortalTarget={isInsideModal(path) ? document.body : null}
				/>
				{!isValid && !isFocused && isDirty && <ErrorMessage message={errors} />}
			</div>
		</>
	);
};

export default withJsonFormsControlProps(CreatableSelect);
