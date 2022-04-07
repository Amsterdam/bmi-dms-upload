import { createSelector } from '@reduxjs/toolkit';
import { CustomFileLight } from '../../../types';
import { RootState } from '../../store';
import { ISingleState } from './model';

export const getState = (state: RootState) => state.single;

export const getCurrentStep = createSelector(
	[getState],
	(state: ISingleState) => state.currentStep
);

export const getFile = createSelector([getState], (state): CustomFileLight | undefined => state?.file);

export const getMetadata = createSelector(
	[getState],
	(state): RootState['single']['metadata'] => state.metadata,
);
