import type { RootState } from '../../app/store';
import type { AuthSliceInitialState } from '../../types/types';

/**
 * Selector que retorna tota la branca 'auth' de l'estat.
 */
export const selectAuthState = (state: RootState): AuthSliceInitialState => state.auth;

/**
 * Selector que retorna només el booleà 'isAuth' per saber si
 * l'usuari està autenticat.
 */
export const selectIsAuthenticated = (state: RootState): boolean => 
  state.auth.isAuth;

// Nota: Com que el nostre 'authSlice' actual no gestiona errors,
// no incloem un 'selectAuthErrorStatusCode' com al teu exemple.
// Si afegim la gestió d'errors a l'slice, podem afegir-lo aquí.