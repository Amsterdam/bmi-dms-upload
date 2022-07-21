import buildPath from './buildPath';

describe('utils/buildPath', () => {
	test('undefined basePath', () => {
		expect(buildPath(undefined, '/some/path/')).toEqual('/some/path/');
	});

	test('With trailing slash', () => {
		expect(buildPath('/foo/', '/bar')).toEqual('/foo/bar');
	});

	test('Without trailing slash', () => {
		expect(buildPath('/foo', '/bar')).toEqual('/foo/bar');
	});
});
