import type { RootState } from '../../app/store';
import type { MainContentRouteInitialState } from '../../types/redux';

export const selectMainContentRouteState = (state: RootState): MainContentRouteInitialState => state.mainContentRoute;

export const selectIsChat = (state: RootState): boolean => state.mainContentRoute.isChat;
export const selectIsSettings = (state: RootState): boolean => state.mainContentRoute.isSettings;
export const selectIsSearch = (state: RootState): boolean => state.mainContentRoute.isSearch;