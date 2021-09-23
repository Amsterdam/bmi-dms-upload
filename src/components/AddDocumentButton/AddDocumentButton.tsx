import React, { ReactElement } from 'react';
import { Button } from '@amsterdam/asc-ui';
import Wizard, { ImplementationProps } from '../Wizard/Wizard';
import CustomProvider from '~/store/CustomProvider';

type Props<T> = {
	buttonText?: string;
} & ImplementationProps<T>;

export default function AddDocumentButton<T>({
	buttonText = 'Bestand toevoegen',
	getPostUrl,
	getHeaders,
	onFileSuccess,
	onFileRemove,
	metadataForm,
	onMetadataValidate,
	onMetadataSubmit,
	onCancel,
}: Props<T>): ReactElement {
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
				<Wizard<T>
					onClose={() => setWizardVisibility(false)}
					getPostUrl={getPostUrl}
					getHeaders={getHeaders}
					onFileSuccess={onFileSuccess}
					onFileRemove={onFileRemove}
					metadataForm={metadataForm}
					onMetadataValidate={onMetadataValidate}
					onMetadataSubmit={onMetadataSubmit}
					onCancel={onCancel}
				/>
			)}
		</CustomProvider>
	);
}
