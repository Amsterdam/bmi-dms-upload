import appendPathSegment from './appendPathSegment';

describe('utils/appendPathSegment', () => {
	test('With trailing slash', () => {
		expect(appendPathSegment('/some/path/', 'subroute')).toEqual('/some/path/subroute');
	});

	test('Without trailing slash', () => {
		expect(appendPathSegment('/some/path', 'subroute')).toEqual('/some/path/subroute');
	});
});
