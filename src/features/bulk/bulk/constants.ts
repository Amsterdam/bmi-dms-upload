export const STEP0 = '/'
export const STEP1 = '/bulk/step1'
export const STEP2 = '/bulk/step2'
export const STEP3 = '/bulk/step3'

export enum BulkStepsToRoutes {
	'/',
	'/bulk/step1',
	'/bulk/step2',
	'/bulk/step3',
}

export const BulkRoutesToSteps: { [key: string]: number } = {
	'/': 0,
	'/bulk/step1': 1,
	'/bulk/step2': 2,
	'/bulk/step3': 3,
}
