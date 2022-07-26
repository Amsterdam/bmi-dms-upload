import stripTrailingSlash from './stripTrailingSlash';

describe('utils/stripTrailingSlash', () => {
	test('With trailing slash', () => {
		expect(stripTrailingSlash('/some/path/')).toEqual('/some/path');
	});

	test('Without trailing slash', () => {
		expect(stripTrailingSlash('/some/path')).toEqual('/some/path');
	});
});
