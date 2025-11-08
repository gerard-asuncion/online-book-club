import type { RootState } from '../../app/store';

export const selectIsChat = (state: RootState): boolean => state.mainContentRoute.isChat;
export const selectIsChatHistorial = (state: RootState): boolean => state.mainContentRoute.isChatHistorial;
export const selectIsSettings = (state: RootState): boolean => state.mainContentRoute.isSettings;
export const selectIsSearch = (state: RootState): boolean => state.mainContentRoute.isSearch;
export const selectIsAbout = (state: RootState): boolean => state.mainContentRoute.isAbout;