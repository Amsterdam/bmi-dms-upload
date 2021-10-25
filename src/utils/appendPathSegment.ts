import appendTrailingSlash from './appendTrailingSlash';

export default function appendPathSegment(path: string, segment: string): string {
	return appendTrailingSlash(path) + segment;
}
