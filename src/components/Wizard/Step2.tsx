import React, { ComponentProps } from 'react';
import { WizardForm } from './Step2Styles';
import { JsonForms } from '@jsonforms/react';
import MetadataForm from '../MetadataForm/MetadataForm';
import { OnChangeCallback } from '../../types';

export type Props = {
	metadataForm: ComponentProps<typeof JsonForms>;
	onChange: OnChangeCallback;
};

const Step2: React.FC<Props> = ({ metadataForm, onChange }) => {
	return (
		<WizardForm>
			<MetadataForm {...metadataForm} onChange={onChange} />
		</WizardForm>
	);
};

export default Step2;
