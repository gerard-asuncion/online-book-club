import { createSlice } from "@reduxjs/toolkit";
import type { MainContentRouteInitialState } from "../../types/redux";

const initialState: MainContentRouteInitialState = {
    isWelcome: true,
    isChat: false,
    isSettings: false,
    isSearch: false
}

const mainContentRouteSlice = createSlice({
  name: 'mainContentRoute',
  initialState,
  
  reducers: {
    setIsWelcome: (state) => {
      state.isWelcome = true;
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = false;
    },
    setIsChat: (state) => {
      state.isWelcome = false;
      state.isChat = true;
      state.isSettings = false;
      state.isSearch = false;
    },
    setIsSettings: (state) => {
      state.isWelcome = false;
      state.isChat = false;
      state.isSettings = true;
      state.isSearch = false;
    },
    setIsSearch: (state) => {
      state.isWelcome = false;
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = true;
    },
    clearMainContentRoute: (state) => {
      state.isWelcome = false;
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = false;
    }
  },
});

export const { 
  setIsWelcome,
  setIsChat,
  setIsSettings, 
  setIsSearch,
  clearMainContentRoute
  } = mainContentRouteSlice.actions;
export default mainContentRouteSlice.reducer;
