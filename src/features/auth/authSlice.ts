import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import type { AuthSliceInitialState } from '../../types/types';

const cookies = new Cookies();

const initialState: AuthSliceInitialState = {
  isAuth: !!cookies.get("auth-token"),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  
  reducers: {
    setIsAuth: (state) => {
      state.isAuth = true;
    },
    clearAuth: (state) => {
      state.isAuth = false;
    },
  },
});

export const { setIsAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;