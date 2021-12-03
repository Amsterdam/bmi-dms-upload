import React from 'react';
import * as cl from '@amsterdam/bmi-component-library';
import renderWithTheme from '../../../tests/utils/withTheme';
import StaticMetadata from './StaticMetadata';
import { metadataList } from './__stubs__';

jest.mock('@amsterdam/bmi-component-library', () => ({
	...jest.requireActual('@amsterdam/bmi-component-library'),
	DescriptionList: jest.fn().mockImplementation(() => <div data-testid="description-list" />),
}));

describe('<StaticMetadata />', () => {
	beforeEach(() => renderWithTheme(<StaticMetadata list={metadataList} />));

	test('Passes props through', () => {
		const spy = jest.spyOn(cl, 'DescriptionList');
		expect(spy.mock.calls[0][0]['list']).toEqual(metadataList);
	});
});
