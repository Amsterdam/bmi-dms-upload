import React, { ComponentProps } from 'react';
import { WizardForm } from './Step2Styles';
import { JsonForms } from '@jsonforms/react';
import MetadataForm from '../MetadataForm/MetadataForm';
import { ErrorObject } from 'ajv';

export type Props = {
	metadataForm: ComponentProps<typeof JsonForms>;
	// TODO Centralize the type for this callback
	onChange: (valid: boolean, errors: ErrorObject[]) => void;
};

const Step2: React.FC<Props> = ({ metadataForm, onChange }) => {
	return (
		<WizardForm>
			<MetadataForm {...metadataForm} onChange={onChange} />
		</WizardForm>
	);
};

export default Step2;
