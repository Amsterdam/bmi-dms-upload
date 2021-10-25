import React from 'react';
import { ImplementationProps } from './Wizard';
import { WizardForm } from './Step2Styles';

export type FormProps<T> = {
	handleChange: (e: any) => void;
	data: T;
};

export type Props<T> = {
	metadataForm: ImplementationProps<T>['metadataForm'];
} & FormProps<T>;

const Step2 = <T,>({ metadataForm, handleChange, data }: Props<T>) => {
	return (
		<WizardForm>
			{React.createElement<FormProps<T>>(metadataForm, {
				handleChange,
				data,
			})}
		</WizardForm>
	);
};

export default Step2;
