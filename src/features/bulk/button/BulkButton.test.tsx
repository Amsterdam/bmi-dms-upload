import React from 'react';
import { screen, act } from '@testing-library/react';

import { createTestEnv, render } from '../../../tests/utils/testUtils';
import BulkButton from './BulkButton'

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<BulkButton  />', () => {
	test('is rendered', () => {
		act(() => {
			const { store, reduxHistory } = createTestEnv();
			render(<BulkButton />, { store, reduxHistory });
		});
		expect(screen.getByText('Upload bestanden')).toBeDefined();
	});
});
