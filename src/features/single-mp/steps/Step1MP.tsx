import React from 'react';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { SingleWizard } from '../../single/wizard/SingleWizard';
import { Step1Styles } from '../../single/steps/styles';
import { FileUploadMP } from '@amsterdam/bmi-component-library';

type Step1MPProps = {
	label: string;
	limit: number;
	someThing?: any;
};

const emptySchema: JsonSchema = { type: 'object', properties: {} };
const emptyUiSchema: UISchemaElement = { type: 'VerticalLayout' };

const emptyMetadataForm = {
	schema: emptySchema,
	uischema: emptyUiSchema,
	renderers: [],
	data: {},
};

const emptyHeaders: Record<string, string> = {};

const Step1MP = (props: Step1MPProps) => {
	const asset = {
		name: 'single-mp',
		code: 'mp'
	}
	return (
		<React.Fragment>
			<SingleWizard asset={asset}
				  isValidForm
				  onCancel={() => Promise.resolve()}
				  onMetadataSubmit={() => Promise.resolve()}
				  getPostUrl={() => Promise.resolve('/')}
				  getHeaders={() => Promise.resolve(emptyHeaders)}
				  metadataForm={emptyMetadataForm}>
				<Step1Styles>
					<FileUploadMP name={'single-mp'} limit={props.limit}/>
				</Step1Styles>
			</SingleWizard>
		</React.Fragment>
	)
};

export { Step1MP, Step1MPProps };
