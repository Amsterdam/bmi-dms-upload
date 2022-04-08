import { CurrentStep } from "./model"

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

export const BulkRoutesToSteps = new Map([
	['/', CurrentStep.Button],
	['/bulk/step1', CurrentStep.Upload],
	['/bulk/step2', CurrentStep.SelectFields],
	['/bulk/step3', CurrentStep.EditFields],
])
