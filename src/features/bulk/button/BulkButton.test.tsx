import React from 'react';
import { screen, act } from '@testing-library/react';

import { render } from '../../../tests/utils/testUtils';
import BulkButton from './BulkButton'

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<BulkButton  />', () => {
	test('is rendered', () => {
		act(() => {
			render(<BulkButton />, {});
		});
		expect(screen.getByText('Upload bestanden')).toBeDefined();
	});
});
