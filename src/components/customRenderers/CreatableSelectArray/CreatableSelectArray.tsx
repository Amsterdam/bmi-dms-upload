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

function convertValueToSelectOptionType(value: string[] | undefined): SelectOptionType | null {
	if (value === undefined) return null;
	if (value.length === 0) return null;

	return {
		value: value[0],
		label: value[0],
	};
}
const CreatableSelectArray = (props: ControlProps) => {
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
	const [selected, setSelected] = useState<SelectOptionType | null>(null);

	useEffect(() => {
		setSelected(convertValueToSelectOptionType(value));
	}, [value]);

	return (
		<>
			{label && <AccessibleLabel htmlFor={path} label={label} isRequired={isRequired} />}
			<div>
				<Creatable
					isMulti={false}
					inputId={path}
					value={selected}
					placeholder="Maak een keuze"
					// @TODO: type of options (unknown) is not compatible with SelectOptionType. Technical depth that has to be fixed in the future
					// @ts-ignore
					onChange={(option: SelectOptionType) => {
						onChange({ currentTarget: { value: option ? [option.value] : [] } });
						setSelected(option);
					}}
					isClearable
					options={filteredOptions.map((option) => ({
						value: option,
						label: option,
					}))}
					error={!isValid && isDirty}
					onFocus={onFocus}
					// Emulate onBlur event object
					onBlur={() => {
						onBlur({ currentTarget: { value: selected ? [selected.value] : [] } });
					}}
					zIndexMenu={99999}
					// To avoid overflow issues in modal windows
					menuPortalTarget={isInsideModal(path) ? document.body : null}
				/>
				{!isValid && !isFocused && isDirty && <ErrorMessage message={errors} />}
			</div>
		</>
	);
};

export default withJsonFormsControlProps(CreatableSelectArray);
