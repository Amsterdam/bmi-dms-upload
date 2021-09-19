export namespace Store {
	/* eslint-disable-next-line */
	interface DMSUpload {
		documents: any[]; //export file Type from component library
		pending: boolean;
		error: string;
	}
}

export interface IState {
	dmsUpload: Store.DMSUpload;
}
