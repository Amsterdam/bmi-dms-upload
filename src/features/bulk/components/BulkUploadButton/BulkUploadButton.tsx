import React, { ReactElement } from 'react';
import { Button } from '@amsterdam/asc-ui';
import BulkUploadWizard from '../BulkUploadWizard/BulkUploadWizard';
import { BulkWizardImplementationProps } from '../../../../types';
import CustomProvider from '../../../CustomProvider';
import { appendTrailingSlash } from '../../../../utils';

export type Props<T> = {
	buttonText?: string;
} & BulkWizardImplementationProps<T>;

export default function BulkUploadButton<T>({
	asset,
	buttonText = 'Bestand toevoegen',
	metadataForm,
	getPostUrl,
	getHeaders,
	getDocumentViewUrl,
	onFileSuccess,
	onFileRemove,
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
				<BulkUploadWizard<T>
					asset={asset}
					metadataForm={metadataForm}
					onClose={() => setWizardVisibility(false)}
					getPostUrl={getPostUrl}
					getHeaders={getHeaders}
					onFileSuccess={onFileSuccess}
					onFileRemove={onFileRemove}
					onCancel={onCancel}
					basePath={appendTrailingSlash(basePath)}
					uploadHTTPMethod={uploadHTTPMethod}
					getDocumentViewUrl={getDocumentViewUrl}
				/>
			)}
		</CustomProvider>
	);
}
