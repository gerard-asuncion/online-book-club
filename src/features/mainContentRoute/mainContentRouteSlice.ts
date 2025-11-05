import { createSlice } from "@reduxjs/toolkit";
import type { MainContentRouteInitialState } from "../../types/redux";

const initialState: MainContentRouteInitialState = {
    isChat: false,
    isSettings: false,
    isSearch: false,
    isAbout: false
}

const mainContentRouteSlice = createSlice({
  name: 'mainContentRoute',
  initialState,
  
  reducers: {
    setIsChat: (state) => {
      state.isChat = true;
      state.isSettings = false;
      state.isSearch = false;
      state.isAbout = false;
    },
    setIsSettings: (state) => {
      state.isChat = false;
      state.isSettings = true;
      state.isSearch = false;
      state.isAbout = false;
    },
    setIsSearch: (state) => {
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = true;
      state.isAbout = false;
    },
     setIsAbout: (state) => {
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = false;
      state.isAbout = true;
    },
    clearMainContentRoute: (state) => {
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = false;
      state.isAbout = false;
    }
  },
});

export const {
  setIsChat,
  setIsSettings, 
  setIsSearch,
  setIsAbout,
  clearMainContentRoute
  } = mainContentRouteSlice.actions;
export default mainContentRouteSlice.reducer;
