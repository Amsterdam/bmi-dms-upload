import React, { ReactElement } from 'react';
import { Button } from '@amsterdam/asc-ui';
import Wizard, { ImplementationProps } from '../Wizard/Wizard';
import CustomProvider from '../../store/CustomProvider';
import { appendTrailingSlash } from '../../utils';
import { MetadataGenericType } from '../../types';

export type Props<T> = {
	buttonText?: string;
} & ImplementationProps<T>;

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
			<Button variant="primary" onClick={onHandleClick}>
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
