import React from 'react';
import { ImplementationProps } from './Wizard';

type Props = {
	handleChange: (value: string, name: string) => void;
} & ImplementationProps;

export default function Step2({ metadataForm, onMetadataValidate, onMetadataSubmit, handleChange }: Props) {
	return React.createElement(metadataForm, {
		handleChange,
		onMetadataValidate,
		onMetadataSubmit,
	});
}
