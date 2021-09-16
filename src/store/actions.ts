export const INIT = '@@dms-upload/INIT';

export interface IInitAction {
	type: typeof INIT;
}

export type DMSUploadActions = IInitAction;

export function init(): IInitAction {
	return {
		type: INIT,
	};
}
