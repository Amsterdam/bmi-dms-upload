import React, { useEffect, useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { ErrorMessage } from '@amsterdam/asc-ui';
import { CreatableSelect as Creatable } from '@amsterdam/bmi-component-library';
import { ControlProps, JsonSchema7 } from '@jsonforms/core';
import useCustomControl from '../../../hooks/useCustomControl';
import AccessibleLabel from '../AccessibleLabel/AccessibleLabel';

type SelectOptionType = {
	value: string;
	label: string;
};

function isInsideModal(id: string): boolean {
	return !!document.getElementById(id)?.closest('[role=dialog]');
}

function convertValueToOptions(arr: string[]): SelectOptionType[] {
	return arr.map((option) => ({
		value: option,
		label: option,
	}));
}
const MultiSelect = (props: ControlProps) => {
	const {
		data: value = [],
		path,
		label,
		errors,
		schema: { items: options = [] },
	} = props;
	// @TODO: cannot find enum on options type. Technical depth that has to be fixed in the future
	// @ts-ignore
	const filteredOptions = options.enum as JsonSchema7[];

	const { isValid, isDirty, isFocused, onFocus, onBlur, onChange, isRequired } = useCustomControl(props);
	const [selected, setSelected] = useState<SelectOptionType[] | null>(null);

	useEffect(() => {
		setSelected(convertValueToOptions(value));
	}, [value]);

	return (
		<>
			{label && <AccessibleLabel htmlFor={path} label={label} isRequired={isRequired} />}
			<div>
				<Creatable
					isMulti={true}
					inputId={path}
					value={selected}
					placeholder="Maak een keuze"
					// @TODO: type of options (unknown) is not compatible with SelectOptionType. Technical depth that has to be fixed in the future
					// @ts-ignore
					onChange={(options: SelectOptionType[]) => {
						onChange({ currentTarget: { value: options.map((option) => option.value) } });
						setSelected(options);
					}}
					isClearable
					options={filteredOptions.map((option) => ({
						value: option,
						label: option,
					}))}
					error={!isValid && isDirty}
					onFocus={onFocus}
					// Emulate onBlur event object
					onBlur={() => onBlur({ currentTarget: { value: selected ? selected.map((option) => option.value) : [] } })}
					zIndexMenu={99999}
					// To avoid overflow issues in modal windows
					menuPortalTarget={isInsideModal(path) ? document.body : null}
				/>
				{!isValid && !isFocused && isDirty && <ErrorMessage message={errors} />}
			</div>
		</>
	);
};

export default withJsonFormsControlProps(MultiSelect);
