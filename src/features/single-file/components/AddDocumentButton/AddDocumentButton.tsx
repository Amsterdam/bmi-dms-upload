import React, { ReactElement } from 'react';
import { Button } from '@amsterdam/asc-ui';
import Wizard from '../Wizard/Wizard';
import { WizardImplementationProps } from '../../../../types'
import CustomProvider from '../../../../features/CustomProvider';
import { appendTrailingSlash } from '../../../../utils';
import { MetadataGenericType } from '../../../../types';

export type Props<T> = {
	buttonText?: string;
} & WizardImplementationProps<T>;

export default function AddDocumentButton<T extends MetadataGenericType>({
	asset,
	buttonText = 'Bestand toevoegen',
	getPostUrl,
	getHeaders,
	onFileSuccess,
	onFileRemove,
	metadataForm,
	onMetadataSubmit,
	onCancel,
	basePath = '/',
	uploadHTTPMethod = 'POST',
}: Props<T>): ReactElement {
	const [isWizardVisible, setWizardVisibility] = React.useState<boolean>(false);

	const onHandleClick = () => {
		setWizardVisibility(true);
	};

	return (
		<CustomProvider>
			<Button variant="primaryInverted" onClick={onHandleClick}>
				{buttonText}
			</Button>
			{isWizardVisible && (
				<Wizard<T>
					asset={asset}
					onClose={() => setWizardVisibility(false)}
					getPostUrl={getPostUrl}
					getHeaders={getHeaders}
					onFileSuccess={onFileSuccess}
					onFileRemove={onFileRemove}
					metadataForm={metadataForm}
					onMetadataSubmit={onMetadataSubmit}
					onCancel={onCancel}
					basePath={appendTrailingSlash(basePath)}
					uploadHTTPMethod={uploadHTTPMethod}
				/>
			)}
		</CustomProvider>
	);
}
