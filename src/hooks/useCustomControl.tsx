import { useState, useCallback } from 'react';
import { ControlProps } from '@jsonforms/core';

function useCustomControl({ data: value, errors, handleChange, path }: ControlProps) {
	const [isFocused, setFocused] = useState<boolean>(false);
	const [isDirty, setIsDirty] = useState<boolean>(!!value);
	const isValid = errors.length === 0 && isDirty;

	const onFocus = useCallback(() => {
		setFocused(true);
		setIsDirty(true);
	}, [path]);

	const onBlur = useCallback(
		(e) => {
			setFocused(false);
			handleChange(path, e.currentTarget.value || '');
		},
		[path],
	);

	const onChange = useCallback(
		(e) => {
			handleChange(path, e.currentTarget.value || '');
		},
		[path],
	);

	return { isFocused, isDirty, isValid, onFocus, onBlur, onChange };
}

export default useCustomControl;
