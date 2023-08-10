import React, { ComponentProps } from 'react';
import renderWithTheme from '~/tests/utils/withTheme';
import StaticMetadata from './StaticMetadata';
import { metadataList } from './__stubs__';
import { mockComponentProps, mocked } from '../../../tests/helpers';
import { DescriptionList } from '@amsterdam/bmi-component-library';

jest.mock('@amsterdam/bmi-component-library', () => ({
	...jest.requireActual('@amsterdam/bmi-component-library'),
	DescriptionList: jest.fn().mockImplementation(() => <div data-testid="description-list" />),
}));

describe('<StaticMetadata />', () => {
	beforeEach(() => renderWithTheme(<StaticMetadata list={metadataList} />));

	test('Passes props through', () => {
		const DescriptionListMock = mocked(DescriptionList);

		expect(mockComponentProps<ComponentProps<typeof DescriptionList>>(DescriptionListMock).list).toEqual(metadataList);
	});
});
