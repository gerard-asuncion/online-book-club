import type { RootState } from '../../app/store';

export const selectWindowWidth = (state: RootState): number => state.responsive.windowWidth;
export const selectIsMobile = (state: RootState): boolean => state.responsive.isMobile;
export const selectOpenSidebar = (state: RootState): boolean => state.responsive.openSidebar;