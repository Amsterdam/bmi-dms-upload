import React from 'react';
import { ImplementationProps } from './Wizard';

type Props<T> = {
	handleChange: (value: string, name: string) => void;
} & ImplementationProps<T>;

export default function Step2<T>({ metadataForm, onMetadataValidate, onMetadataSubmit, handleChange }: Props<T>) {
	return React.createElement(metadataForm, {
		handleChange,
		onMetadataValidate,
		onMetadataSubmit,
	});
}
