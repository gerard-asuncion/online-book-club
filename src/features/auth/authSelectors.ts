import type { RootState } from '../../app/store';
import type { AuthSliceInitialState } from '../../types/redux';

export const selectAuthState = (state: RootState): AuthSliceInitialState => state.auth;

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuth;