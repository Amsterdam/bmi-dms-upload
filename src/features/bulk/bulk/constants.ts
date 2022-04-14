import { CurrentStep } from "./store/model"

export enum BulkStepsToRoutes {
	'/',
	'/bulk/step1',
	'/bulk/step2',
	'/bulk/step3',
}

export const BulkRoutesToSteps = new Map([
	[BulkStepsToRoutes[0], CurrentStep.Button],
	[BulkStepsToRoutes[1], CurrentStep.Upload],
	[BulkStepsToRoutes[2], CurrentStep.SelectFields],
	[BulkStepsToRoutes[3], CurrentStep.EditFields],
])

export const DEFAULT_DEBOUNCE = 500;
