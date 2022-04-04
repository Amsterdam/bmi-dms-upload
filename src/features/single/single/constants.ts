export const STEP0 = '/';
export const STEP1 = '/single/step1';
export const STEP2 = '/single/step2';

export enum SingleStepsToRoutes {
	'/',
	'/single/step1',
	'/single/step2',
}

export const SingleRoutesToSteps: { [key: string]: number } = {
	'/': 0,
	'/single/step1': 1,
	'/single/step2': 2,
}
