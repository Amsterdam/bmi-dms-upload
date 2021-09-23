export namespace Store {
	/* eslint-disable-next-line */
	interface DMSUpload {
		documents: any[];
		pending: boolean;
		error?: Error;
	}
}

export interface IState {
	dmsUpload: Store.DMSUpload;
}
