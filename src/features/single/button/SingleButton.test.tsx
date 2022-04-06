import React from 'react';
import { screen, act } from '@testing-library/react';

import { createTestEnv, render } from '../../../tests/utils/testUtils';
import SingleButton from './SingleButton'

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<SingleButton  />', () => {
	test('is rendered', () => {
		act(() => {
			const { store, reduxHistory } = createTestEnv();
			render(<SingleButton />, { store, reduxHistory });
		});
		expect(screen.getByText('Upload bestand')).toBeDefined();
	});
});