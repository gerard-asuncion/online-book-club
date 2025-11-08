import { createSlice } from "@reduxjs/toolkit";
import type { MainContentRouteInitialState } from "../../types/redux";

const initialState: MainContentRouteInitialState = {
    isChat: false,
    isChatHistorial: false,
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
      state.isChatHistorial = false;
      state.isSettings = false;
      state.isSearch = false;
      state.isAbout = false;
    },
    setIsChatHistorial: (state) => {
      state.isChat = false;
      state.isChatHistorial = true;
      state.isSettings = false;
      state.isSearch = false;
      state.isAbout = false;
    },
    setIsSettings: (state) => {
      state.isChat = false;
      state.isChatHistorial = false;
      state.isSettings = true;
      state.isSearch = false;
      state.isAbout = false;
    },
    setIsSearch: (state) => {
      state.isChat = false;
      state.isChatHistorial = false;
      state.isSettings = false;
      state.isSearch = true;
      state.isAbout = false;
    },
     setIsAbout: (state) => {
      state.isChat = false;
      state.isChatHistorial = false;
      state.isSettings = false;
      state.isSearch = false;
      state.isAbout = true;
    },
    clearMainContentRoute: (state) => {
      state.isChat = false;
      state.isChatHistorial = false;
      state.isSettings = false;
      state.isSearch = false;
      state.isAbout = false;
    }
  },
});

export const {
  setIsChat,
  setIsChatHistorial,
  setIsSettings, 
  setIsSearch,
  setIsAbout,
  clearMainContentRoute
  } = mainContentRouteSlice.actions;
export default mainContentRouteSlice.reducer;
