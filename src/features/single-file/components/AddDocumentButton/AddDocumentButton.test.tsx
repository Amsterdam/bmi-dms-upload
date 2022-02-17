import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddDocumentButton, { Props } from './AddDocumentButton';
import renderWithProviders from '~/tests/utils/withProviders';
import Step1, { SupportedHTTPMethods } from '../Wizard/Step1';
import { MetadataExample } from 'src/types';
import { asset } from '../Wizard/__stubs__';

jest.mock('../Wizard/Step1');

describe('<AddDocumentButton />', () => {
	const renderComponent = (props: Partial<Props<MetadataExample>> = {}) => {
		return renderWithProviders(
			<AddDocumentButton<MetadataExample>
				asset={asset}
				buttonText="Upload"
				getPostUrl={jest.fn()}
				getHeaders={jest.fn()}
				onFileSuccess={jest.fn()}
				onFileRemove={jest.fn}
				metadataForm={{} as Props<MetadataExample>['metadataForm']}
				onMetadataSubmit={jest.fn()}
				onCancel={jest.fn()}
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
