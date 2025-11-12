import type { RootState } from '../../app/store';

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuth;