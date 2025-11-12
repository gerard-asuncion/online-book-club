import type { RootState } from '../../app/store';

export const selectDisplayInfoState = (state: RootState): boolean => state.displayInfo.displayInfo;