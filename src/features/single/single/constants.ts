import { CurrentStep } from "./store/model";

export enum SingleStepsToRoutes {
	START = '/',
	STEP1 = '/single/step1',
	STEP2 = '/single/step2',
	MP_STEP1 = '/single-mp/step1',
}

export const SingleRoutesToSteps = new Map<string, number>([
	[SingleStepsToRoutes.START, CurrentStep.Button],
	[SingleStepsToRoutes.STEP1, CurrentStep.Upload],
	[SingleStepsToRoutes.STEP2, CurrentStep.SelectFields],
	[SingleStepsToRoutes.MP_STEP1, CurrentStep.UploadMP],
])
