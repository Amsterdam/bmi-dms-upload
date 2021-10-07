export namespace Store {
	/* eslint-disable-next-line */
	interface DMSUpload {
		file: CustomFile;
		metadata: MetadataExample;
	}
}

export interface IState {
	file: CustomFile;
	metadata: MetadataExample;
}
