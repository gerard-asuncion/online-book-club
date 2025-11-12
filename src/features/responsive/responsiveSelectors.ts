import type { RootState } from '../../app/store';

export const selectIsMobile = (state: RootState): boolean => state.responsive.isMobile;
export const selectOpenSidebar = (state: RootState): boolean => state.responsive.openSidebar;