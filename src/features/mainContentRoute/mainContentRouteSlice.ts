import { createSlice } from "@reduxjs/toolkit";
import type { MainContentRouteInitialState } from "../../types/redux";

const initialState: MainContentRouteInitialState = {
    isChat: false,
    isSettings: false,
    isSearch: false
}

const mainContentRouteSlice = createSlice({
  name: 'mainContentRoute',
  initialState,
  
  reducers: {
    setIsChat: (state) => {
      state.isChat = true;
      state.isSettings = false;
      state.isSearch = false;
    },
    setIsSettings: (state) => {
      state.isChat = false;
      state.isSettings = true;
      state.isSearch = false;
    },
    setIsSearch: (state) => {
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = true;
    },
    clearMainContentRoute: (state) => {
      state.isChat = false;
      state.isSettings = false;
      state.isSearch = false;
    }
  },
});

export const { setIsChat,
   setIsSettings, 
   setIsSearch, 
   clearMainContentRoute } = mainContentRouteSlice.actions;
export default mainContentRouteSlice.reducer;
