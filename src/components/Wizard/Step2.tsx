import React from 'react';
import { ImplementationProps } from './Wizard';

export type FormProps<T> = {
	handleChange: (e: any) => void;
	data: T;
};

export type Props<T> = {
	metadataForm: ImplementationProps<T>['metadataForm'];
} & FormProps<T>;

const Step2 = <T,>({ metadataForm, handleChange, data }: Props<T>) => {
	return React.createElement<FormProps<T>>(metadataForm, {
		handleChange,
		data,
	});
};

export default Step2;
