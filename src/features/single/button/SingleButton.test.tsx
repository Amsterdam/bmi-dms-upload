import React from 'react';
import { screen, act } from '@testing-library/react';

import { render } from '../../../tests/utils/testUtils';
import SingleButton from './SingleButton'

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<SingleButton  />', () => {
	test('is rendered', () => {
		act(() => {
			render(<SingleButton />, {});
		});
		expect(screen.getByText('Upload bestand')).toBeDefined();
	});
});
