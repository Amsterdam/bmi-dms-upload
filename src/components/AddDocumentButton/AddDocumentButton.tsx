import React from 'react';
import { Button } from '@amsterdam/asc-ui';
import Wizard, { ImplementationProps } from '../Wizard/Wizard';
import CustomProvider from '~/store/CustomProvider';

type Props = {
	buttonText?: string;
} & ImplementationProps;

const AddDocumentButton: React.FC<Props> = ({
	buttonText = 'Bestand toevoegen',
	getPostUrl,
	getHeaders,
	onFileSuccess,
	onFileRemove,
	metadataForm,
	onMetadataValidate,
	onMetadataSubmit,
	onCancel,
	surveyId,
	objectId,
}: Props) => {
	const [isWizardVisible, setWizardVisibility] = React.useState<boolean>(false);

	const onHandleClick = () => {
		setWizardVisibility(true);
	};

	return (
		<CustomProvider>
			<Button variant="primary" onClick={onHandleClick}>
				{buttonText}
			</Button>
			{isWizardVisible && (
				<Wizard
					onClose={() => setWizardVisibility(false)}
					getPostUrl={getPostUrl}
					getHeaders={getHeaders}
					onFileSuccess={onFileSuccess}
					onFileRemove={onFileRemove}
					metadataForm={metadataForm}
					onMetadataValidate={onMetadataValidate}
					onMetadataSubmit={onMetadataSubmit}
					onCancel={onCancel}
					objectId={objectId}
					surveyId={surveyId}
				/>
			)}
		</CustomProvider>
	);
};

AddDocumentButton.displayName = 'AddDocumentButton';

export default AddDocumentButton;
