import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BulkUploadButton, { Props } from './BulkUploadButton';
import renderWithProviders from '../../../../tests/utils/withProviders';
import Step1, { SupportedHTTPMethods } from '../../../single-file/components/Wizard/Step1';
import { MetadataExample } from 'src/types';
import { asset } from '../BulkUploadWizard/__stubs__';

jest.mock('../../../single-file/components/Wizard/Step1');

describe('<AddDocumentButton />', () => {
	const renderComponent = (props: Partial<Props<MetadataExample>> = {}) => {
		return renderWithProviders(
			<BulkUploadButton<MetadataExample>
				asset={asset}
				buttonText="Upload"
				getPostUrl={jest.fn()}
				getHeaders={jest.fn()}
				onFileSuccess={jest.fn()}
				onFileRemove={jest.fn}
				metadataForm={{} as Props<MetadataExample>['metadataForm']}
				onCancel={jest.fn()}
				getDocumentViewUrl={jest.fn()}
				{...props}
			/>,
			{},
		);
	};

	test('Renders a button using the given buttonText', () => {
		renderComponent();
		expect(screen.getByText('Upload', { selector: 'button' })).toBeInTheDocument();
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	describe.each([['POST'], ['PUT']])(
		'Clicking the button opens a Modal (http method configured as %s)',
		(httpMethod) => {
			test('Clicking button opens up wizard', () => {
				renderComponent({
					uploadHTTPMethod: httpMethod as SupportedHTTPMethods,
				});
				const button = screen.getByText('Upload', { selector: 'button' });
				userEvent.click(button);
				expect(screen.getByText('Upload', { selector: 'button' })).toBeInTheDocument();
				expect(screen.queryByRole('dialog')).toBeInTheDocument();
				expect(screen.getByTestId('step-1')).toBeInTheDocument();
				expect(Step1).toHaveBeenCalledWith(expect.objectContaining({ httpMethod }), {});
			});
		},
	);
});
