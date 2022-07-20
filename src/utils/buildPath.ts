import { stripTrailingSlash } from './index';

export default function buildPath(basePath: string = '/', path: string) {
	return stripTrailingSlash(basePath) + path;
}
