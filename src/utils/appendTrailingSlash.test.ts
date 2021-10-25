import appendTrailingSlash from './appendTrailingSlash';

describe('utils/appendTrailingSlash', () => {
	test('With trailing slash', () => {
		expect(appendTrailingSlash('/some/path/')).toEqual('/some/path/');
	});

	test('Without trailing slash', () => {
		expect(appendTrailingSlash('/some/path')).toEqual('/some/path/');
	});
});
