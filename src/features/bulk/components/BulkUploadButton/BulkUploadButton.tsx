import React, { ReactElement } from 'react';
import { Button } from '@amsterdam/asc-ui';
import CustomProvider from '../../../CustomProvider';

import BulkUploadWizard from '../BulkUploadWizard/BulkUploadWizard';

export type Props = {
	buttonText?: string;
}; // & ImplementationProps<T>;

export default function BulkUploadButton({ buttonText }: Props): ReactElement {
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
				<BulkUploadWizard />
			)}
		</CustomProvider>
	);
}
