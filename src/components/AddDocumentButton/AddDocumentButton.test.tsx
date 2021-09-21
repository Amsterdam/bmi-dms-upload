import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddDocumentButton from '~/components/AddDocumentButton/AddDocumentButton';
import renderWithProviders from '~/tests/utils/withProviders';

describe('<AddDocumentButton />', () => {
	const renderComponent = () => {
		return renderWithProviders(
			<AddDocumentButton
				buttonText="Upload"
				getPostUrl={jest.fn()}
				getHeaders={jest.fn()}
				onFileSuccess={jest.fn()}
				onFileRemove={jest.fn}
				metadataForm={<></>}
				onMetadataValidate={jest.fn()}
				onMetadataSubmit={jest.fn()}
				onCancel={jest.fn()}
				objectId="1234"
				surveyId="1"
			/>,
		);
	};

	test('Renders a button using the given buttonText', () => {
		renderComponent();
		expect(screen.getByText('Upload', { selector: 'button' })).toBeInTheDocument();
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	test('Clicking button opens up wizard', () => {
		renderComponent();
		const button = screen.getByText('Upload', { selector: 'button' });
		userEvent.click(button);
		expect(screen.getByText('Upload', { selector: 'button' })).toBeInTheDocument();
		expect(screen.queryByRole('dialog')).toBeInTheDocument();
	});
});