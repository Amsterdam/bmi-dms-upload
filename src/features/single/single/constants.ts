import { CurrentStep } from "./store/model";

export enum SingleStepsToRoutes {
	'/',
	'/single/step1',
	'/single/step2',
}

export const SingleRoutesToSteps = new Map([
	[SingleStepsToRoutes[0], CurrentStep.Button],
	[SingleStepsToRoutes[1], CurrentStep.Upload],
	[SingleStepsToRoutes[2], CurrentStep.SelectFields],
])
