export default function appendTrailingSlash(path: string): string {
	return path.replace(/\/$/, '') + '/';
}
