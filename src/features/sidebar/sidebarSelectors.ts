import type { RootState } from '../../app/store';

export const selectOpenSidebar = (state: RootState): boolean => state.sidebar.openSidebar;