import { CurrentStep } from "./model";

export const STEP0 = '/';
export const STEP1 = '/single/step1';
export const STEP2 = '/single/step2';

export enum SingleStepsToRoutes {
	'/',
	'/single/step1',
	'/single/step2',
}

export const SingleRoutesToSteps = new Map([
	['/', CurrentStep.Button],
	['/single/step1', CurrentStep.Upload],
	['/single/step2', CurrentStep.SelectFields],
])
