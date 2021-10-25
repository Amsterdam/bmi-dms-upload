import removeTrailingSlash from './removeTrailingSlash';

describe('utils/removeTrailingSlash', () => {
	test('With trailing slash', () => {
		expect(removeTrailingSlash('/some/path/')).toEqual('/some/path');
	});

	test('Without trailing slash', () => {
		expect(removeTrailingSlash('/some/path')).toEqual('/some/path');
	});
});
