import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { render, renderComponent } from '../../../tests/utils/testUtils';

import SingleButton from './SingleButton'

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<Single />', () => {
	renderComponent(<SingleButton />)
});
