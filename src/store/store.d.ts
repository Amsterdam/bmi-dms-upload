export namespace Store {
	/* eslint-disable-next-line */
	interface DMSUpload {
		file: File | null;
		metadata: MetadataExample;
	}
}

export interface IState {
	dmsUpload: Store.DMSUpload;
}
