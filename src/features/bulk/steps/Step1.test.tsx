import React from 'react';

import Step1 from './Step1';
import * as SliceModule from '../bulk/store/slice';

import { render } from '../../../tests/utils/testUtils';
import { files, state } from '../bulk/__stubs__/state';
import { metadataFields, defaultProps } from '../bulk/__stubs__';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe('<Step1 />', () => {
	test('should render component', () => {
		const store = {
			bulk: state,
		};
		const component = render(<Step1 {...defaultProps} />, { store });

		expect(component.getByTestId('modal')).toBeInTheDocument();
	});

	test('should set isBulkMode to false when single file has been uploaded', () => {
		const setBulkModeSpy = jest.spyOn(SliceModule, 'setBulkMode');
		const store = {
			bulk: {
				...state,
				files: [files[0]],
			},
			single: {},
		};

		render(<Step1 {...defaultProps} />, { store });

		expect(setBulkModeSpy).toHaveBeenCalledWith(false);
	});

	test('should set isBulkMode to true when multiple have been uploaded', () => {
		const setBulkModeSpy = jest.spyOn(SliceModule, 'setBulkMode');
		const store = {
			bulk: {
				...state, // State stub has 2 files
			},
			single: {},
		};

		render(<Step1 {...defaultProps} />, { store });

		expect(setBulkModeSpy).toHaveBeenCalledWith(true);
	});

	test('should set all fields to editable when isBulkMode is FALSE and metadataFields are provided', () => {
		const setAllFieldsEditableSpy = jest.spyOn(SliceModule, 'setAllFieldsEditable');
		const props = { ...defaultProps, metadataFields };
		const store = {
			bulk: {
				...state,
				isBulkMode: false,
			},
			single: {},
		};

		render(<Step1 {...props} />, { store });

		expect(setAllFieldsEditableSpy).toHaveBeenCalled();
	});

	test('should reset all fields and files to default/initial when isBulkMode is TRUE and metadataFields are provided', () => {
		const resetFieldsAndFilesSpy = jest.spyOn(SliceModule, 'resetFieldsAndFiles');
		const props = { ...defaultProps, metadataFields };
		const store = {
			bulk: {
				...state,
				isBulkMode: true,
			},
			single: {},
		};

		render(<Step1 {...props} />, { store });

		expect(resetFieldsAndFilesSpy).toHaveBeenCalled();
	});
});
