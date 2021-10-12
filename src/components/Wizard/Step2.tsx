import React from 'react';
import { ImplementationProps } from './Wizard';

type Props<T> = {
	handleChange: (value: string, name: string) => void;
	data: T;
} & ImplementationProps<T>;

export default function Step2<T>({
	metadataForm,
	onMetadataValidate,
	onMetadataSubmit,
	handleChange,
	data,
}: Props<T>) {
	return React.createElement(metadataForm, {
		handleChange,
		onMetadataValidate,
		onMetadataSubmit,
		data,
	});
}
