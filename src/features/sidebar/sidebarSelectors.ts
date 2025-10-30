import type { RootState } from '../../app/store';

export const selectWindowWidth = (state: RootState): number => state.sidebar.windowWidth;
export const selectOpenSidebar = (state: RootState): boolean => state.sidebar.openSidebar;