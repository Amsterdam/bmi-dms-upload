import React from 'react';
import { useDispatch } from 'react-redux';

import Step1 from './Step1';

import { render, matchMediaMock } from '~/tests/utils/testUtils';
import { files, defaultProps, metadataFields, state } from '../bulk/__stubs__';
import { mocked } from '~/tests/helpers';
import { resetFieldsAndFiles, setAllFieldsEditable, setBulkMode } from '../bulk/store/slice';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe('<Step1 />', () => {
	const dispatchSpy = jest.fn();

	beforeEach(() => {
		mocked(useDispatch).mockImplementation(() => dispatchSpy);
	});

	beforeAll(() => {
		matchMediaMock();
	});

	test('should render component', () => {
		const store = {
			bulk: state,
		};
		const component = render(<Step1 {...defaultProps} />, { store });

		expect(component.getByTestId('modal')).toBeInTheDocument();
	});

	test('should set isBulkMode to false when single file has been uploaded', () => {
		const store = {
			bulk: {
				...state,
				files: [files[0]],
			},
			single: {},
		};

		render(<Step1 {...defaultProps} />, { store });
		expect(dispatchSpy).toHaveBeenCalledWith(setBulkMode(false));
	});

	test('should set isBulkMode to true when multiple have been uploaded', () => {
		const store = {
			bulk: {
				...state, // State stub has 2 files
			},
			single: {},
		};

		render(<Step1 {...defaultProps} />, { store });
		expect(dispatchSpy).toHaveBeenCalledWith(setBulkMode(true));
	});

	test('should set all fields to editable when isBulkMode is FALSE and metadataFields are provided', () => {
		const props = { ...defaultProps, metadataFields };
		const store = {
			bulk: {
				...state,
				isBulkMode: false,
			},
			single: {},
		};

		render(<Step1 {...props} />, { store });
		expect(dispatchSpy).toHaveBeenCalledWith(setAllFieldsEditable(state.fields));
	});

	test('should reset all fields and files to default/initial when isBulkMode is TRUE and metadataFields are provided', () => {
		const props = { ...defaultProps, metadataFields };
		const store = {
			bulk: {
				...state,
				isBulkMode: true,
			},
			single: {},
		};

		render(<Step1 {...props} />, { store });
		expect(dispatchSpy).toHaveBeenCalledWith(resetFieldsAndFiles());
	});
});
